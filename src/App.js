import React, { useState } from 'react';
import Result from "./Components/Result";

function App() {
  const [formData, setFormData] = useState({
    search: 0,
    town: ""
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    let cp = formData.search;
    /* FETCH */
    fetch('https://geo.api.gouv.fr/communes?codePostal=' + cp + '')
    .then(response => response.json())
    .then(data => {
      if(data.length > 0){
        const town = data[0].nom;
      setFormData({
        ...formData,
        town: town
      })
      }
      else {
        setFormData({
          ...formData,
          town: "Pas de ville à ce code postal"
        })
      }
      
    })
    .catch(error => console.error(error)); 
  };
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  return (
    <div className="App">
        <form onSubmit={handleFormSubmit}>
          <fieldset>
            <input
              name="search"
              type="number"
              size="33"
              value={formData.search}
              onChange={handleInputChange}
            />
            <input type="submit" value="Valider" />
          </fieldset>
        </form>
      <Result formData={formData}/>
    </div>
  );
}

export default App;
