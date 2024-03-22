import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import VehiculeList from '../VehiculeList';

function AdminView({ models, setModels }) {
    const [newModel, setNewModel] = useState('');
    const [editModel, setEditModel] = useState(null);

    AdminView.propTypes = {
        models: PropTypes.array.isRequired,
        setModels: PropTypes.func.isRequired,
    };

    const fetchModels = async () => {
        const response = await fetch('http://localhost:3000/modele');
        const fetchedModels = await response.json();
        setModels(fetchedModels);
    };

    useEffect(() => {
        fetchModels();
    }, []);

    const handleAddModel = () => {
        if (newModel.trim() !== '') {
            setModels([...models, newModel]);
            setNewModel('');
        }
    };

    const handleEditModel = (index) => {
        setEditModel(index);
        setNewModel(models[index]);
    };

    const handleUpdateModel = () => {
        if (newModel.trim() !== '') {
            const updatedModels = [...models];
            updatedModels[editModel] = newModel;
            setModels(updatedModels);
            setEditModel(null);
            setNewModel('');
        }
    };

    const handleDeleteModel = (index) => {
        const updatedModels = [...models];
        updatedModels.splice(index, 1);
        setModels(updatedModels);
    };

    return (
        <div>
            <VehiculeList />
            <h2>Admin View</h2>
            <input
                type="text"
                value={newModel}
                onChange={(e) => setNewModel(e.target.value)}
            />
            <button onClick={handleAddModel}>Add Model</button>
            <button onClick={handleUpdateModel}>Update Model</button>
            <ul>
                {models && models.map((model, index) => (
                    <li key={index}>
                        {editModel === index ? (
                            <input
                                type="text"
                                value={newModel}
                                onChange={(e) => setNewModel(e.target.value)}
                            />
                        ) : (
                            model
                        )}
                        <button onClick={() => handleEditModel(index)}>Edit</button>
                        <button onClick={() => handleDeleteModel(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminView;