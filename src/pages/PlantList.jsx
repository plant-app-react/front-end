import axios from "axios"
import { useState, useEffect } from "react"
import AddPlantForm from "../components/AddPlantForm";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoHeart } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";

const API_URL = import.meta.env.VITE_API_URL;

function PlantList() {

    const storedToken = localStorage.getItem("authToken");

    const { plantId } = useParams();

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
        toggleFormVisibility()
    };

    const [isFormVisible, setIsFormVisible] = useState(false)

    function toggleFormVisibility() {
        setIsFormVisible(!isFormVisible);
    }

    const deletePlant = (plantId) => {
        axios
            .delete(
                `${API_URL}/plants/${plantId}`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                console.log(response)
                getAllPlants()
            })
            .catch((error) => {
                console.log("Error deleting plant", error)
            })
    }



    const toggleFavourite = (plantId) => {
        setPlants(prevPlants =>
            prevPlants.map(plant =>
                plant._id === plantId ? { ...plant, isFavourite: !plant.isFavourite } : plant
            )
        );
    }

    return (
        <div>
            <div className="flex justify-center my-12">
                <button onClick={toggleFormVisibility} className="bg-green-700 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full">
                    Add Plant! 🌱
                </button>
            </div>
            {isFormVisible && <AddPlantForm handleAddPlant={handleAddPlant} />}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 m-12 place-items-center">

                {plants &&
                    plants.map(
                        (plant) => (
                            
                            <div className="w-10/12 overflow-hidden shadow-lg rounded-2xl transition duration-300 ease-in-out hover:scale-105" key={plant._id}>
                                <div className="h-96 relative">
                                    <img className="w-full h-full object-cover" src={plant.image} alt={plant.name} style={{ maxHeight: "450px" }} />
                                </div>
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2">{plant.name}</div>
                                </div>
                                <div className="px-6 pt-4 pb-2">
                                    {/* <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Easy Care</span> */}
                                    <Link to={`/plants/${plant._id}`} >
                                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-green-600 hover:text-white">Mode Details</span>
                                    </Link>
                                    <button onClick={() => deletePlant(plant._id)} className="inline-block bg-gray-200 rounded-full px-1.5 py-1.5 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-red-600 hover:text-white"><MdDeleteOutline /></button>
                                    <button onClick={() => toggleFavourite(plant._id)} className="inline-block bg-gray-200 rounded-full px-1.5 py-1.5 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-red-300 hover:text-white">
                                        {plant.isFavourite ? <IoHeart /> : <IoMdHeartEmpty />}
                                    </button>
                                </div>
                            </div>

                        )
                    )}
            </div>
        </div>
    )

}

export default PlantList;