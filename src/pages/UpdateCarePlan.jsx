import axios from "axios"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;


const UpdateCarePlan = () => {
    const navigate = useNavigate()
    const { plantId } = useParams();

    const storedToken = localStorage.getItem('authToken');

    const [water, setWater] = useState("")
    const [fertilize, setFertilize] = useState("")
    const [mist, setMist] = useState("")
    const [clean, setClean] = useState("")
    const [repot, setRepot] = useState("")

    useEffect(() => {
        axios.get(`${API_URL}/plants/${plantId}/careplan`, {
            headers: { Authorization: `Bearer ${storedToken}` }
        })
            .then((res) => {
                setWater(res.data.water)
                setFertilize(res.data.fertilize)
                setMist(res.data.mist)
                setClean(res.data.clean)
                setRepot(res.data.repot)
            })
            .catch((e) => {
                console.log(e)
            })
    }, [plantId])

    const handleSubmit = (e) => {
        e.preventDefault();
        const newCarePlan = {
            water: water,
            fertilize: fertilize,
            mist: mist,
            clean: clean,
            repot: repot
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
        <div className="flex flex-col mt-4 text-center justify-center items-center lg:mt-24 ">

            <form className="flex flex-col gap-2 w-96 p-8 rounded-xl shadow-lg  text-green-700 lg:p-12 lg:gap-4" onSubmit={handleSubmit}>

                <label>
                    <p className="text-left text-sm ml-4 font-semibold lg:text-lg"> Water:</p>
                    <input
                        type="date"
                        name="water"
                        value={water}
                        placeholder={water}
                        onChange={(e) => setWater(e.target.value)}
                        className="w-full border-solid border-gray-300 border-2 m-2"
                    />
                </label>
                <label>
                    <p className="text-left text-sm ml-4 font-semibold lg:text-lg">Fertilize:</p>
                    <input
                        type="date"
                        name="fertilize"
                        value={fertilize}
                        placeholder={fertilize}
                        onChange={(e) => setFertilize(e.target.value)}
                        className="w-full border-solid border-gray-300 border-2 m-2"
                    />
                </label>
                <label>
                    <p className="text-left text-sm ml-4 font-semibold lg:text-lg">Mist:</p>
                    <input
                        type="date"
                        name="mist"
                        value={mist}
                        placeholder={mist}
                        onChange={(e) => setMist(e.target.value)}
                        className="w-full border-solid border-gray-300 border-2 m-2"
                    />
                </label>
                <label>
                    <p className="text-left text-sm ml-4 font-semibold lg:text-lg">Clean:</p>
                    <input
                        type="date"
                        name="clean"
                        value={clean}
                        placeholder={clean}
                        onChange={(e) => setClean(e.target.value)}
                        className="w-full border-solid border-gray-300 border-2 m-2"
                    />
                </label>
                <label>
                    <p className="text-left text-sm ml-4 font-semibold lg:text-lg">Repot:</p>
                    <input
                        type="date"
                        name="repot"
                        value={repot}
                        placeholder={repot}
                        onChange={(e) => setRepot(e.target.value)}
                        className="w-full border-solid border-gray-300 border-2 m-2"
                    />
                </label>





                <button type="submit" className="bg-green-700 text-white text-md font-semibold w-20 rounded-full self-center hover:bg-green-600 lg:w-20 lg:p-1 lg:text-md">Update</button>
                <Link to={`/plants/${plantId}`}><button className="bg-green-700 text-white text-md font-semibold rounded-full w-20 p-1 self-center hover:bg-green-600 lg:text-md">Cancel</button></Link>
            </form>
        </div>
    );
}

export default UpdateCarePlan;