import { useState } from 'react';
import './AjoutVehicule.css';

function AjoutVehicule  ()  {
    const [marque, setMarque] = useState('');
    const [model, setModele] = useState('');
    const [annee, setAnnee] = useState('');
    const [tarif, setTarif] = useState('');
    const [photo, setPhoto] = useState('');

    const handleAddVehicule = async (e) => {
        e.preventDefault();

        const newVehicule = {
            marque,
            annee,
            model,
            tarif,
            photo
        };
        

        try {
            const response = await fetch('http://localhost:3000/createModel', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newVehicule) // Convert the data to JSON format
            });

            if (response.ok) {
                // Handle success
                console.log('Vehicule added successfully!');
                // Reset form fields
                setMarque('');
                setModele('');
                setAnnee('');
                setTarif('');
                setPhoto('');
            } else {
                // Handle error
                console.error('Failed to add vehicule');
            }
        } catch (error) {
            console.error('Failed to fetch API', error);
        }
    };

    return (
        <div className="ajout-vehicule">
            <h1 className="ajout-vehicule-title">Ajout Vehicule</h1>
            <form className="ajout-vehicule-form" onSubmit={handleAddVehicule}>
                <label className="ajout-vehicule-label">
                    Marque:
                    <input className="ajout-vehicule-input" type="text" name="marque" value={marque} onChange={(e) => setMarque(e.target.value)} />
                </label>
                <label className="ajout-vehicule-label">
                    Modèle:
                    <input className="ajout-vehicule-input" type="text" name="modele" value={model} onChange={(e) => setModele(e.target.value)} />
                </label>
                <label className="ajout-vehicule-label">
                    Année:
                    <input className="ajout-vehicule-input" type="int" name="annee" value={annee} onChange={(e) => setAnnee(e.target.value)} />
                </label>
                <label className="ajout-vehicule-label">
                    Prix:
                    <input className="ajout-vehicule-input" type="int" name="prix" value={tarif} onChange={(e) => setTarif(e.target.value)} />
                </label>
                <label className="ajout-vehicule-label">
                    Image:
                    <input className="ajout-vehicule-input" type="text" name="image" value={photo} onChange={(e) => setPhoto(e.target.value)} />
                </label>
                <input className="ajout-vehicule-submit" type="submit" value="Ajouter" />
            </form>
        </div>
    );
}

export default AjoutVehicule;