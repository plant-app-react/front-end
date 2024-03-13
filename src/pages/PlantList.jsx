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
            })
            .catch((error) => console.log(error));
    };



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

                getAllPlants()
            })
            .catch((error) => {
                console.log("Error deleting plant", error)
            })
    }

    const [favorites, setFavorites] = useState([])

    const displayFavorites = () => {
        axios
            .get(`${API_URL}/auth/favorites`, {
                headers: { Authorization: `Bearer ${storedToken}` }
            })
            .then((response) => {
                setFavorites(response.data);
            })
            .catch((error) => console.log(error));
    };


    const toggleFavorite = (plantId) => {
        axios
            .post(`${API_URL}/auth/favorites/${plantId}`, {}, {
                headers: { Authorization: `Bearer ${storedToken}` }
            })
            .then(() => {
                displayFavorites()
            })
            .catch((error) => {
                console.log("Error toggling favorite:", error);
            })
    }

    const isFavorite = (plantId) => {
        if (favorites.map((fav) => { return fav._id }).includes(plantId)) {
            return true
        }
    }

    useEffect(() => {
        getAllPlants();
        displayFavorites();
    }, []);


    return (
        <div>
            <div className="flex justify-center my-12">
                <button onClick={toggleFormVisibility} className="bg-green-700 hover:bg-green-600 text-white text-md p-2 lg:text-lg font-bold lg:py-2 lg:px-4 rounded-full">
                    Add Plant
                </button>
            </div>
            {isFormVisible && <AddPlantForm handleAddPlant={handleAddPlant} />}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 m-12 place-items-center">

                {plants && favorites &&
                    plants.map(
                        (plant) => (

                            <div className="w-10/12 overflow-hidden shadow-lg rounded-2xl transition duration-300 ease-in-out hover:scale-105 min-w-64" key={plant._id}>
                                <div className="h-96 relative">
                                    <Link to={`/plants/${plant._id}`} ><img className="w-full h-full object-cover" src={plant.image} alt={plant.name} style={{ maxHeight: "450px" }} /></Link>
                                </div>
                                <div className="px-6 py-4">
                                    <Link to={`/plants/${plant._id}`} ><div className="font-bold text-xl mb-2 text-center text-green-700">{plant.name}</div></Link>
                                </div>
                                <div className="px-6 pt-4 pb-2 flex justify-end">
                                    {/* <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Easy Care</span> */}
                                    {/* <Link to={`/plants/${plant._id}`} >
                                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-green-600 hover:text-white">More Details</span>
                                    </Link> */}
                                    <button onClick={() => toggleFavorite(plant._id)} className="inline-block bg-gray-200 rounded-full px-1.5 py-1.5 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-red-300 hover:text-white">
                                        {isFavorite(plant._id) ? (
                                            <IoHeart />
                                        ) : (
                                            <IoMdHeartEmpty />
                                        )}
                                    </button>
                                    <button onClick={() => deletePlant(plant._id)} className="bg-gray-200 rounded-full px-1.5 py-1.5 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-red-600 hover:text-white"><MdDeleteOutline /></button>
                                </div>
                            </div>

                        )
                    )}
            </div>
        </div>
    )

}

export default PlantList;