import axios from "axios"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";


const API_URL = import.meta.env.VITE_API_URL;

const AddCarePlan = () => {
    const [newCarePlan, setNewCarePlan] = useState({
        water: "",
        fertilize: ""
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
            .post(`${API_URL}/plants/${plantId}/careplan`, newCarePlan)
            .then((res) => {
                setNewCarePlan({
                    water: "",
                    fertilize: "",
                });

                console.log(res)
            })
            .catch((e) => {
                console.log(e);
            });
    }





    return (
        <div className="my-10 w-screen text-center">

            <form onSubmit={handleSubmit}>

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

                <button type="submit">Create Care Plan</button>
            </form>
        </div>
    )
}

export default AddCarePlan;