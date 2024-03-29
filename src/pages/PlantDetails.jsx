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

    const [plant, setPlant] = useState({});
    const [carePlan, setCarePlan] = useState([]);


    const getPlant = () => {
        axios
            .get(`${API_URL}/plants/${plantId}`)
            .then((response) => {
                setPlant(response.data);
                console.log(response.data, "getallplants")
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getPlant();
    }, []);


    const getCarePlan = () => {
        axios
            .get(`${API_URL}/plants/${plantId}/careplan`, {
                headers: { Authorization: `Bearer ${storedToken}` }
            })
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
        if (!moment(date).isValid()) {
            return ''; // Return nothing if the date is invalid
        }
        return moment(date).startOf('day').fromNow();
    }

    return (

        <>
            {console.log(plant.difficulty, "Plant is", plant.directSunlight, plant.toxicity, plant.location)}
            <div className="flex justify-center items-center mx-auto mt-20">
                <h2 className="text-2xl lg:text-5xl font-semibold text-green-600">{plant && plant.name}</h2>
            </div>
            <div className="flex flex-col xl:flex-row items-center justify-center gap-12">

                <div className="flex flex-col gap-16 shadow-md p-12 rounded-xl lg:flex-row">
                    <img src={plant.image} alt="Plant" className="rounded-xl h-96" />

                    <ul className="flex flex-col gap-8 text-left text-green-600 mt-16">
                        <li className="font-bold text-xl">Location: <span className="font-normal">{plant.location}</span></li>
                        <li className="font-bold text-xl">Sunlight: <span className="font-normal">{plant.directSunlight ? "Yes" : "No"}</span></li>
                        <li className="font-bold text-xl">Care Level: <span className="font-normal">{plant.difficulty === "Easy Care" ? "Easy Care" : "High Maintenance"}</span></li>
                        <li className="font-bold text-xl">Toxicity: <span className="font-normal">{plant.toxicity ? "Yes" : "No"}</span></li>
                    </ul>
                </div>
                <div className="p-12 ">
                    <div className="flex gap-16 shadow-md px-12 rounded-xl">
                        <Accordion>
                            <div className="flex flex-col gap-4 text-green-600 mb-2">
                                {carePlan && (
                                    <div className="">
                                        <p className="pt-5 pb-2 text-center"><span className="text-xl mr-2">Watered:</span> {calcDays(carePlan.water)}</p>
                                        <p className="py-2 text-center"><span className="text-xl mr-2">Fertilized:</span> {calcDays(carePlan.fertilize)}</p>
                                        <p className="py-2 text-center"><span className="text-xl mr-2">Moistened:</span> {calcDays(carePlan.mist)}</p>
                                        <p className="py-2 text-center"><span className="text-xl mr-2">Cleaned:</span> {calcDays(carePlan.clean)}</p>
                                        <p className="py-2 text-center"><span className="text-xl mr-2">Repotted: </span>{calcDays(carePlan.repot)}</p>
                                    </div>
                                )}
                                <div className="flex justify-evenly mt-2">
                                    <Link to={`/plants/${plantId}/addcareplan`} className="bg-green-700 rounded-full px-3 py-1  lg:text-sm font-semibold text-white mr-2 mb-2 hover:bg-green-600 hover:text-white">Add</Link>
                                    <Link to={`/plants/${plant._id}/updatecareplan`} className="bg-green-700 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2 hover:bg-green-600 hover:text-white">Edit</Link>
                                    <button onClick={deleteCarePlan} className="inline-block bg-gray-200 rounded-full px-1.5 py-1.5 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-red-600 hover:text-white "><MdDeleteOutline /></button>

                                </div>
                            </div>
                        </Accordion>
                    </div>
                </div >
            </div >
            <Link to="/plants" ><p className="mx-auto text-center mt-4 mb-8 p-1 w-16 bg-green-700 text-stone-50 rounded-full hover:bg-green-600 cursor-pointer lg:mt-16 ">Back</p></Link>
        </>
    )
}

export default PlantDetails;