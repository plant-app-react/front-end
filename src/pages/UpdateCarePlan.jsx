import axios from "axios"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;


const UpdateCarePlan = () => {
    const navigate = useNavigate()
    const { plantId } = useParams();

    const storedToken = localStorage.getItem('authToken');

    const [water, setWater] = useState("")
    const [fertilize, setFertilize] = useState("")

    useEffect(() => {
        axios.get(`${API_URL}/plants/${plantId}/careplan`)
            .then((res) => {
                setWater(res.data.water)
                setFertilize(res.data.fertilize)
            })
            .catch((e) => {
                console.log(e)
            })
    }, [plantId])

    const handleSubmit = (e) => {
        e.preventDefault();
        const newCarePlan = {
            water: water,
            fertilize: fertilize
        };

        axios
            .put(
                `${API_URL}/plants/${plantId}/careplan`,
                newCarePlan,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                // setWater()
                // setFertilize()
                console.log(response)
                navigate(`/plants/${plantId}`)
            })
            .catch((e) => {
                console.log(e)
            })
    };


    return (
        <div className="mt-36 text-center flex justify-center">

            <form className="flex flex-col gap-4 w-96 p-12 rounded-xl shadow-lg text-xl text-green-700 items-center" onSubmit={handleSubmit}>

                <label>
                    Water:
                    <input
                        type="date"
                        name="water"
                        value={water}
                        placeholder={water}
                        onChange={(e) => setWater(e.target.value)}
                    />
                </label>
                <label>
                    Fertilize:
                    <input
                        type="date"
                        name="fertilize"
                        value={fertilize}
                        placeholder={fertilize}
                        onChange={(e) => setFertilize(e.target.value)}
                    />
                </label>
                <label>
                    Mist:
                    <input
                        type="date"
                        name="fertilize"
                        value={fertilize}
                        placeholder={fertilize}
                        onChange={(e) => setFertilize(e.target.value)}
                    />
                </label>
                <label>
                    Clean:
                    <input
                        type="date"
                        name="fertilize"
                        value={fertilize}
                        placeholder={fertilize}
                        onChange={(e) => setFertilize(e.target.value)}
                    />
                </label>
                <label>
                    Repot:
                    <input
                        type="date"
                        name="fertilize"
                        value={fertilize}
                        placeholder={fertilize}
                        onChange={(e) => setFertilize(e.target.value)}
                    />
                </label>





                <button type="submit" className="bg-green-700 text-white rounded-full w-24 p-1">Update</button>
            </form>
        </div>
    );
}

export default UpdateCarePlan;