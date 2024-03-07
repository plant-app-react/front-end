import axios from "axios"
import { useState, useEffect } from "react"

const API_URL = "http://localhost:5005"

function CarePlan() {
    const [carePlan, setCarePlan] = useState([]);

    const getCarePlan = () => {
        axios
            .get(`${API_URL}/plants/:plantId/careplan`)
            .then((response) => {
                console.log(response.data)
                setCarePlan(response.data);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getCarePlan();
    }, []);



    return (
        <div className="my-10 w-screen text-center">
         {/* <h1>{carePlan && carePlan.water}</h1> */}
        </div>
    )
}

export default CarePlan;