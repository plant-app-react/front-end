import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function PlantDetails() {

    const storedToken = localStorage.getItem("authToken");

    const { plantId } = useParams();
  
    const [plant, setPlant] = useState([]);

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



    const [carePlan, setCarePlan] = useState([]);

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

    return (
        <div>


            <h1>{plant && plant.name}</h1>
            {/* <img src={plant.image} alt="Plant" /> */}
            <Link to={`/plants/${plantId}/addcareplan`}>Add Care Plan</Link>
            <h1>{carePlan && carePlan.water}</h1>
            <button onClick={deleteCarePlan}>Delete Care Plan</button>
        </div>
    )
}

export default PlantDetails;