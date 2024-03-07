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
         <div className="my-10 w-screen text-center">

            <form onSubmit={handleSubmit}>

                <label>
                    Water:
                    <input
                        type="text"
                        name="water"
                        value={water}
                        placeholder={water}
                        onChange={(e) => setWater(e.target.value)}
                    />
                </label>
                <label>
                    Fertilize:
                    <input
                        type="text"
                        name="fertilize"
                        value={fertilize}
                        placeholder={fertilize}
                        onChange={(e) => setFertilize(e.target.value)}
                    />
                </label>

                <button type="submit">Update Care Plan</button>
            </form>
        </div>
    );
}
 
export default UpdateCarePlan;