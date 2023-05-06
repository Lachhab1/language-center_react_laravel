import { useState, useEffect } from 'react';
import "./card.css"

export default function Card({ title, icon, data }) {
    const [stat, setStat] = useState(0);
    /*
    useEffect(() => {
        // Ici, vous pouvez effectuer une requête à votre base de données pour récupérer les données correspondant à la carte.
        // Puis, vous pouvez mettre à jour la statistique en utilisant la méthode setStat.
        
    // Exemple de requête pour récupérer la statistique à partir d'une API :
    fetch('https://example.com/api/stat')
    .then(response => response.json())
    .then(data => setStat(data.value))
    .catch(error => console.error(error));
}, []);
*/
  return (
  
      <div className="card">
        <div className="card-body AyCard" >
          <div className="d-flex align-items-center">
           <img src={icon} className="me-3" />
          </div>
          <div className="mt-4 CardText">
            <h6 className="card-title">{title}</h6>
            {title === 'Earnings' && <h2>{stat}DH</h2>}
            {title !== 'Earnings' && <h2>{stat}</h2>}
          </div>
        </div>
      </div>
    
  );
}

