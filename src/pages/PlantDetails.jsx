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

    return (
        <section className="">

            <div className="flex flex-col items-center gap-6 mt-12">
                <h2 className="font-semibold">{plant && plant.name}</h2>
                <img src={plant.image} alt="Plant" />
                <h3 className="text-decoration: underline">Care Plan:</h3>
                <div className="flex flex-col gap-2">
                    <p>Water: {carePlan && carePlan.water}</p>
                    <p>Fertilize: {carePlan && carePlan.fertilize}</p>
                    <p>Mist: {carePlan && carePlan.mist}</p>
                    <p>Clean: {carePlan && carePlan.clean}</p>
                    <p>Repot: {carePlan && carePlan.repot}</p>
                </div>
            </div>
            <div className="flex justify-evenly my-12">
                <Link to={`/plants/${plantId}/addcareplan`}>Add Care Plan</Link>
                <button onClick={deleteCarePlan}>Delete Care Plan</button>
                <Link to="/">Back to Home Page</Link>
            </div>
        </section>
    )
}

export default PlantDetails;