import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'
import { IoMdHeartEmpty } from "react-icons/io";
import { IoHeart } from "react-icons/io5";
import { useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const Favorites = () => {

    const [favoritePlants, setFavoritePlants] = useState([]);
    const storedToken = localStorage.getItem("authToken");
    const { plantId } = useParams();

    // Fetch the user's favorite plants when the component mounts
    const getFavoritePlants = () => {
        axios
            .get(`${API_URL}/auth/favorites`, {
                headers: { Authorization: `Bearer ${storedToken}` }
            })
            .then((response) => {
                console.log(response.data)
                setFavoritePlants(response.data);
            })
            .catch((error) => console.log(error));
    };
    useEffect(() => {
        getFavoritePlants();
    }, []);

    const toggleFavorite = (plantId) => {
        axios
            .delete(`${API_URL}/auth/favorites/${plantId}`, {
                headers: { Authorization: `Bearer ${storedToken}` }
            })
            .then(() => {
                getFavoritePlants()
            })
            .catch((error) => {
                console.log("Error toggling favorite:", error);
            })
    }


    return (
        <section>
            <h3 className="text-3xl text-center mt-16 text-green-600 font-bold">My Plants</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 m-12 place-items-center">
                {favoritePlants.map((plant) => (

                    <div className="w-10/12 overflow-hidden shadow-lg rounded-2xl transition duration-300 ease-in-out hover:scale-105" key={plant._id}>
                        <div className="h-96 relative">
                            <img className="w-full h-full object-cover" src={plant.image} alt={plant.name} style={{ maxHeight: "450px" }} />
                        </div>
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2 text-center text-green-700">{plant.name}</div>
                        </div>
                        <div className="px-6 pt-4 pb-2">
                            {/* <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Easy Care</span> */}
                            <Link to={`/plants/${plant._id}`} >
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-green-600 hover:text-white">More Details</span>
                            </Link>
                            <button onClick={() => toggleFavorite(plant._id)} className="inline-block bg-gray-200 rounded-full px-1.5 py-1.5 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-red-300 hover:text-white">
                                <IoHeart />
                            </button>
                        </div>
                    </div>

                ))}
            </div>
        </section>
    );
}

export default Favorites;