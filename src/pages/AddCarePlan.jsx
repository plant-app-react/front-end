import axios from "axios"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


const API_URL = import.meta.env.VITE_API_URL;

const AddCarePlan = () => {

    console.log(API_URL, "API_URL")
    const [newCarePlan, setNewCarePlan] = useState({
        water: "",
        fertilize: "",
        mist: "",
        clean: "",
        repot: ""
    })
    const { plantId } = useParams();
    console.log(plantId)


    const handleValueChanges = (e) => {
        setNewCarePlan({
            ...newCarePlan,
            [e.target.name]: e.target.value,

        });
    };

    const handleSubmit = (event) => {
        console.log(plantId, "plantId")
        event.preventDefault();
        axios
            .post(`${API_URL}/plants/${plantId}/careplan`, newCarePlan)
            .then((res) => {
                setNewCarePlan({
                    water: "",
                    fertilize: "",
                    mist: "",
                    clean: "",
                    repot: ""
                });

                console.log(res)
            })
            .catch((e) => {
                console.log(e, "Error creating care plan");
            });
    }


    useEffect(() => {

    }, [carePlan])


    return (
        <>
            <div className="mt-36 text-center flex justify-center">

                <form className="flex flex-col gap-4 w-96 p-12 rounded-xl shadow-lg text-xl text-green-700" onSubmit={handleSubmit}>

                    <label>
                        Water:
                        <input
                            type="text"
                            name="water"
                            value={newCarePlan.water}
                            onChange={handleValueChanges}
                            className="border-solid border-gray-300 border-2 mx-2 w-36"
                        />
                    </label>
                    <label>
                        Fertilize:
                        <input
                            type="text"
                            name="fertilize"
                            value={newCarePlan.fertilize}
                            onChange={handleValueChanges}
                            className="border-solid border-gray-300 border-2 mx-2 w-32"
                        />
                    </label>
                    <label>
                        Mist:
                        <input
                            type="text"
                            name="mist"
                            value={newCarePlan.mist}
                            onChange={handleValueChanges}
                            className="border-solid border-gray-300 border-2 mx-2 ml-6 w-36"
                        />
                    </label>
                    <label>
                        Clean:
                        <input
                            type="text"
                            name="clean"
                            value={newCarePlan.clean}
                            onChange={handleValueChanges}
                            className="border-solid border-gray-300 border-2 mx-2 w-36"
                        />
                    </label>
                    <label>
                        Repot:
                        <input
                            type="text"
                            name="repot"
                            value={newCarePlan.repot}
                            onChange={handleValueChanges}
                            className="border-solid border-gray-300 border-2 mx-2 w-36"
                        />
                    </label>
                    {/* 
                    <button type="submit" className="bg-green-700 text-white text-md rounded-lg w-36 mt-4 self-center hover:text-rose-300">Create Plan</button> */}
                </form>
            </div>
            {/* <Link to={`/plants/${plantId}`} className="bg-green-700  text-white text-sm">Back to plant details</Link> */}
        </>
    )
}

export default AddCarePlan;