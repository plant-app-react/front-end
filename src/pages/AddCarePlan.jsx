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
            <div className="flex flex-col mt-4 text-center justify-center items-center lg:mt-24 ">

                <form className="flex flex-col gap-2 w-96 p-8 rounded-xl shadow-lg  text-green-700 lg:p-12 lg:gap-4" onSubmit={handleSubmit}>

                    <label >
                        <p className="text-left text-sm ml-4 font-semibold lg:text-lg"> Water:</p>
                        <input
                            type="date"
                            name="water"
                            value={newCarePlan.water}
                            onChange={handleValueChanges}
                            className="w-full border-solid border-gray-300 border-2 m-2"
                        />
                    </label>
                    <label >
                        <p className="text-left text-sm ml-4 font-semibold lg:text-lg">Fertilize:</p>
                        <input
                            type="date"
                            name="fertilize"
                            value={newCarePlan.fertilize}
                            onChange={handleValueChanges}
                            className="w-full border-solid border-gray-300 border-2 m-2"
                        />
                    </label>
                    <label>
                        <p className="text-left text-sm ml-4 font-semibold lg:text-lg">Mist:</p>
                        <input
                            type="date"
                            name="mist"
                            value={newCarePlan.mist}
                            onChange={handleValueChanges}
                            className="w-full border-solid border-gray-300 border-2 m-2"
                        />
                    </label>
                    <label>
                        <p className="text-left text-sm ml-4 font-semibold lg:text-lg">Clean:</p>
                        <input
                            type="date"
                            name="clean"
                            value={newCarePlan.clean}
                            onChange={handleValueChanges}
                            className="w-full border-solid border-gray-300 border-2 m-2"
                        />
                    </label>
                    <label >
                        <p className="text-left text-sm ml-4 font-semibold lg:text-lg">Repot:</p>
                        <input
                            type="date"
                            name="repot"
                            value={newCarePlan.repot}
                            onChange={handleValueChanges}
                            className="w-full border-solid border-gray-300 border-2 m-2"
                        />
                    </label>

                    <button type="submit" className="bg-green-700 text-white text-md font-semibold rounded-full w-24 p-1 self-center hover:bg-green-600 lg:w-28 lg:text-md">Create Plan</button>
                    <Link to={`/plants/${plantId}`}><button className="bg-green-700 text-white text-md font-semibold rounded-full w-20 p-1 self-center hover:bg-green-600 lg:text-md">Cancel</button></Link>
                </form>

            </div>

        </>
    )
}

export default AddCarePlan;