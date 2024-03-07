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





    return (
        <div className="my-10 w-screen text-center">

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

                <label>
                    Water:
                    <input
                        type="text"
                        name="water"
                        value={newCarePlan.water}
                        onChange={handleValueChanges}
                    />
                </label>
                <label>
                    Fertilize:
                    <input
                        type="text"
                        name="fertilize"
                        value={newCarePlan.fertilize}
                        onChange={handleValueChanges}
                    />
                </label>
                <label>
                    Mist:
                    <input
                        type="text"
                        name="mist"
                        value={newCarePlan.mist}
                        onChange={handleValueChanges}
                    />
                </label>
                <label>
                    Clean:
                    <input
                        type="text"
                        name="clean"
                        value={newCarePlan.clean}
                        onChange={handleValueChanges}
                    />
                </label>
                <label>
                    Repot:
                    <input
                        type="text"
                        name="repot"
                        value={newCarePlan.repot}
                        onChange={handleValueChanges}
                    />
                </label>

                <button type="submit" className="text-green-800">Create Care Plan</button>
                <Link to={`/plants/${plantId}`} className="text-green-800">Back to plant details</Link>
            </form>
        </div>
    )
}

export default AddCarePlan;