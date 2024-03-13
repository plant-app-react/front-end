import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import Accordion from "../components/Accordion";
import moment from 'moment';
import { MdDeleteOutline } from "react-icons/md";

const API_URL = import.meta.env.VITE_API_URL;

function PlantDetails() {

    const storedToken = localStorage.getItem("authToken");

    const { plantId } = useParams();

    const [plant, setPlant] = useState([]);
    const [carePlan, setCarePlan] = useState([]);


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

    const calcDays = (date) => {
        return moment(date).startOf('day').fromNow();
    }

    // const [showUpdateForm, setShowUpdateForm] = useState(false)

    // const toggleUpdateForm = () => {
    //     setShowUpdateForm(!showUpdateForm);
    // }

    return (
        <>

            <div className="flex justify-center items-center mx-auto mt-20">
                <h2 className="text-2xl lg:text-5xl font-semibold text-green-600">{plant && plant.name}</h2>
            </div>
            <div className="flex xl:flex-row items-center justify-center gap-12 mt-12 flex-col">

                <div className="flex gap-16 shadow-md p-12 rounded-xl">
                    <img src={plant.image} alt="Plant" className="rounded-xl h-96" />

                    <ul className="flex flex-col gap-8 text-left text-green-600 mt-24">
                        <li className="font-bold text-xl">Location: <span className="font-normal mx-4">{plant.location}</span></li>
                        <li className="font-bold text-xl">Sunlight: <span className="font-normal">{plant.sunlight}</span></li>
                        <li className="font-bold text-xl">Care Level: <span className="font-normal">{plant.difficulty}</span></li>
                        <li className="font-bold text-xl">Toxicity: <span className="font-normal">{plant.toxicity}</span></li>
                    </ul>
                </div>
                <div className="p-12 ">
                    <div className="flex gap-16 shadow-md p-12 rounded-xl">
                        <Accordion>
                            <div className="flex flex-col gap-4 text-green-600 mb-2">
                                {carePlan && (
                                    <div className="">
                                        <p className="pt-3 pb-2"><span className="text-xl">Watered:</span> {calcDays(carePlan.water)}</p>
                                        <p className="py-2"><span className="text-xl">Fertilized:</span> {calcDays(carePlan.fertilize)}</p>
                                        <p className="py-2"><span className="text-xl">Moistened:</span> {calcDays(carePlan.mist)}</p>
                                        <p className="py-2"><span className="text-xl">Cleaned::</span> {calcDays(carePlan.clean)}</p>
                                        <p className="py-2"><span className="text-xl">Repotted: </span>{calcDays(carePlan.repot)}</p>
                                    </div>
                                )}
                                <div className="flex justify-evenly mt-2">
                                    <Link to={`/plants/${plantId}/addcareplan`} className="bg-green-700 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2 hover:bg-green-600 hover:text-white">Add Care Plan</Link>
                                    <Link to={`/plants/${plant._id}/updatecareplan`} className="bg-green-700 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2 hover:bg-green-600 hover:text-white">Edit</Link>
                                    <button onClick={deleteCarePlan} className="inline-block bg-gray-200 rounded-full px-1.5 py-1.5 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-red-600 hover:text-white lg:ml-28"><MdDeleteOutline /></button>
                                    {/* <button onClick={deleteCarePlan} className="bg-green-700 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2 hover:bg-green-600 hover:text-white">Delete Care Plan</button> */}
                                </div>
                            </div>
                        </Accordion>
                    </div>
                </div >
            </div >
        </>
    )
}

export default PlantDetails;