import axios from "axios"
import { useState, useEffect } from "react"
import AddPlantForm from "../components/AddPlantForm";

const API_URL = import.meta.env.VITE_API_URL;

function PlantList() {
    const [plants, setPlants] = useState([]);

    const getAllPlants = () => {
        axios
            .get(`${API_URL}/plants`)
            .then((response) => {
                setPlants(response.data);
                console.log(response.data)
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getAllPlants();
    }, []);

    const handleAddPlant = (newPlant) => {
        setPlants([newPlant, ...plants]);
      };

const [isFormVisible, setIsFormVisible] = useState(false)

function toggleFormVisibility() {
    setIsFormVisible(!isFormVisible);
}

    return (
        <div>
            <button onClick={toggleFormVisibility}>
                Add Plant
            </button>
            {isFormVisible && <AddPlantForm onAddPlant={handleAddPlant}/>}




            <div className="Plantlist">

                {plants &&
                    plants.map(
                        (plant) => (

                            <div key={plant._id} className="max-w-sm overflow-hidden shadow-lg rounded-2xl transition duration-300 ease-in-out hover:scale-105">
                                <img className="w-full h-max " src={plant.image} />
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2">{plant.name}</div>
                                </div>
                                <div className="px-6 pt-4 pb-2">
                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#indoor/outdoor</span>
                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#easy care</span>
                                </div>
                            </div>


                        )
                    )}
            </div>
        </div>
    )

}

export default PlantList;