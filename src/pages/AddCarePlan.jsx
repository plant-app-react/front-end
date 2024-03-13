import axios from "axios"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const AddCarePlan = () => {

    const navigate = useNavigate()
    const storedToken = localStorage.getItem("authToken");

    console.log(API_URL, "API_URL")
    const [newCarePlan, setNewCarePlan] = useState({
        water: "",
        fertilize: "",
        mist: "",
        clean: "",
        repot: ""
    })
    const { plantId } = useParams();

    const handleValueChanges = (e) => {
        setNewCarePlan({
            ...newCarePlan,
            [e.target.name]: e.target.value,

        });
    };

    const handleSubmit = (event) => {

        event.preventDefault();

        axios
            .post(`${API_URL}/plants/${plantId}/careplan`, newCarePlan, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((res) => {
                setNewCarePlan({
                    water: "",
                    fertilize: "",
                    mist: "",
                    clean: "",
                    repot: ""
                });
                navigate(`/plants/${plantId}`)
                console.log(res)
            })
            .catch((e) => {
                console.log(e, "Error creating care plan");
            });
    }


    return (
        <>
            <div className="flex flex-col mt-24 text-center justify-center items-center">

                <form className="flex flex-col gap-4 w-96 p-12 rounded-xl shadow-lg text-xl text-green-700" onSubmit={handleSubmit}>

                    <label>
                        Water:
                        <input
                            type="date"
                            name="water"
                            value={newCarePlan.water}
                            onChange={handleValueChanges}
                            className="w-full border-solid border-gray-300 border-2 m-2 "
                        />
                    </label>
                    <label>
                        Fertilize:
                        <input
                            type="date"
                            name="fertilize"
                            value={newCarePlan.fertilize}
                            onChange={handleValueChanges}
                            className="w-full border-solid border-gray-300 border-2 m-2"
                        />
                    </label>
                    <label>
                        Mist:
                        <input
                            type="date"
                            name="mist"
                            value={newCarePlan.mist}
                            onChange={handleValueChanges}
                            className="w-full border-solid border-gray-300 border-2 m-2"
                        />
                    </label>
                    <label>
                        Clean:
                        <input
                            type="date"
                            name="clean"
                            value={newCarePlan.clean}
                            onChange={handleValueChanges}
                            className="w-full border-solid border-gray-300 border-2 m-2"
                        />
                    </label>
                    <label>
                        Repot:
                        <input
                            type="date"
                            name="repot"
                            value={newCarePlan.repot}
                            onChange={handleValueChanges}
                            className="w-full border-solid border-gray-300 border-2 m-2"
                        />
                    </label>

                    <button type="submit" className="bg-green-700 text-white text-md rounded-full w-36 py-1 self-center hover:bg-green-600">Create Plan</button>
                    <Link to={`/plants/${plantId}`}><button className="bg-green-700 text-white text-md rounded-full w-24  self-center hover:bg-green-600">Back</button></Link>
                </form>

            </div>

        </>
    )
}

export default AddCarePlan;