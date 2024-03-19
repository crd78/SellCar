import { useState, useEffect } from 'react';
import '../src/asset/css/VehiculeList.css';


function App() {
  const [models, setModels] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/modele');
        const data = await response.json();
        setModels(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="modele-list-title">Liste des modèles</h1>
      <div className="modele-list-container">
        {models.length > 0 ? (
          models.map((model,) => (
            <div key={model.id} className={`modele-item`}>
              <h2 className={`marque`} title={`Rechercher d'autre modèle de cette marque`}>{model.Marque}</h2>
              <img src={model.photo} alt={model.photo} />
              <div className="Tarif">{model.tarif} €</div>
                <div className="details">
                  <h3> Modèle : {model.model}</h3>
                  <h3> Année : {model.année}</h3>
                  <p>{model.description}</p>
                </div>
            </div>
          ))
        ) : (
          <p>Aucun modèle trouvé</p>
        )}
      </div>
    </div>
  );
}

export default App
