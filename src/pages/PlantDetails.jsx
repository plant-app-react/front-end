import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function PlantDetails() {

    const storedToken = localStorage.getItem("authToken");

    const { plantId } = useParams();

    const [plant, setPlant] = useState([]);

    const getPlant = () => {
        axios
            .get(`${API_URL}/plants/${plantId}`)
            .then((response) => {
                setPlant(response.data);
                console.log(response.data)
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getPlant();
    }, []);



    const [carePlan, setCarePlan] = useState([]);

    const getCarePlan = () => {
        axios
            .get(`${API_URL}/plants/${plantId}/careplan`)
            .then((response) => {
                console.log(response.data)
                setCarePlan(response.data);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getCarePlan();
    }, []);

    const deleteCarePlan = () => {

        axios
            .delete(
                `${API_URL}/plants/${plantId}/careplan`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                console.log(response)
                getCarePlan()
            })
            .catch((error) => {
                console.log("Error deleting care plan", error)
            })
    }

    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    }


    return (
        <section className="">

            <div className="flex flex-col items-center gap-6 mt-12">
                <h2 className="text-lg font-semibold text-green-600 lg:text-2xl">{plant && plant.name}</h2>
                <div className="flex gap-16 mt-8">
                    <img src={plant.image} alt="Plant" className="rounded-lg h-96" />

                    <ul className="flex flex-col gap-8 text-left text-green-600 mt-24">
                        <li className="font-bold text-xl">Location: <span className="font-normal">{plant.location}</span></li>
                        <li className="font-bold text-xl">Sunlight: <span className="font-normal">{plant.sunlight}</span></li>
                        <li className="font-bold text-xl">Care Level: <span className="font-normal">{plant.difficulty}</span></li>
                        <li className="font-bold text-xl">Toxicity: <span className="font-normal">{plant.toxicity}</span></li>
                    </ul>
                </div>
                <div>
                    <button onClick={toggleVisibility} className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2
                     hover:bg-green-600 hover:text-white mt-8">Care Plan</button>
                    {isVisible && (
                        <div className="flex flex-col gap-2">
                            <p>Water: {carePlan && carePlan.water}</p>
                            <p>Fertilize: {carePlan && carePlan.fertilize}</p>
                            <p>Mist: {carePlan && carePlan.mist}</p>
                            <p>Clean: {carePlan && carePlan.clean}</p>
                            <p>Repot: {carePlan && carePlan.repot}</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex justify-evenly my-12">
                <Link to={`/plants/${plantId}/addcareplan`} className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-green-600 hover:text-white">Add Care Plan</Link>
                <button onClick={deleteCarePlan} className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-green-600 hover:text-white">Delete Care Plan</button>
                <Link to="/plants" className=" bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-green-600 hover:text-white">Back to All Plants</Link>
            </div>
        </section>
    )
}

export default PlantDetails;