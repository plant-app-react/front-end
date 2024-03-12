import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import Accordion from "../components/Accordion";

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


    const [showUpdateForm, setShowUpdateForm] = useState(false)

    const toggleUpdateForm = () => {
        setShowUpdateForm(!showUpdateForm);
    }

    return (
        <section className="">

            <div className="flex flex-col items-center gap-6 mt-12 rounded-2xl">
                <h2 className="text-lg font-semibold text-green-600 lg:text-2xl">{plant && plant.name}</h2>
                <div className="flex gap-16 shadow-lg p-12">
                    <img src={plant.image} alt="Plant" className="rounded-xl h-96" />

                    <ul className="flex flex-col gap-8 text-left text-green-600 mt-24">
                        <li className="font-bold text-xl">Location: <span className="font-normal mx-4">{plant.location}</span></li>
                        <li className="font-bold text-xl">Sunlight: <span className="font-normal">{plant.sunlight}</span></li>
                        <li className="font-bold text-xl">Care Level: <span className="font-normal">{plant.difficulty}</span></li>
                        <li className="font-bold text-xl">Toxicity: <span className="font-normal">{plant.toxicity}</span></li>
                    </ul>
                    <div className="p-12">
                        <Accordion>
                            <div className="flex flex-col gap-4 text-green-600 mb-2">
                                <p><span className="text-xl">Water:</span> {carePlan && carePlan.water}</p>
                                <p><span className="text-xl">Fertilize:</span> {carePlan && carePlan.fertilize}</p>
                                <p><span className="text-xl">Mist:</span> {carePlan && carePlan.mist}</p>
                                <p><span className="text-xl">Clean:</span> {carePlan && carePlan.clean}</p>
                                <p><span className="text-xl">Repot: </span>{carePlan && carePlan.repot}</p>
                                <div className="flex justify-evenly my-12">
                                    <button onClick={toggleUpdateForm} className="bg-green-700 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2 hover:bg-green-600 hover:text-white">Add Care Plan</button>
                                    {showUpdateForm && <h1>This is the edit form</h1>}
                                    <button onClick={deleteCarePlan} className="bg-green-700 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2 hover:bg-green-600 hover:text-white">Delete Care Plan</button>
                                    {/* <Link to="/plants" className=" bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-green-600 hover:text-white">Back to All Plants</Link> */}
                                </div>
                            </div>

                        </Accordion>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PlantDetails;