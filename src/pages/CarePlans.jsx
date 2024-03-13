import axios from "axios"
import { useState, useEffect } from "react"
import moment from 'moment';

const API_URL = import.meta.env.VITE_API_URL;

const CarePlans = () => {

    const storedToken = localStorage.getItem("authToken");
    const [careplans, setCarePlans] = useState([]);

    const getCarePlans = () => {
        axios
            .get(`${API_URL}/careplans`, {
                headers: { Authorization: `Bearer ${storedToken}` }
            })
            .then((response) => {
                console.log(response.data)
                setCarePlans(response.data);
            })
            .catch((error) => console.log(error));
    };
    useEffect(() => {
        getCarePlans();
    }, []);


    // console.log(careplans)

    const calcToDoes = (date) => {
        let now = new Date();
    if (date < now) {
     return "nothing to do to this plant";
    } else if (date === now) {
     return "Today you have to work on it a bit";
    } else {
     return (moment(date).startOf('day').fromNow() + " left until next step")   }}
 

    return (
        <div className="careplans">
            <h1>To DO</h1>
            {/* <p>{careplans && calcToDoes(careplans.water)} </p> */}
            {careplans  &&
                    careplans.map(
                        (obj) => (
                            <div key={obj._id}>
                                <p>{calcToDoes(obj.water)}</p>
                            </div>
                        ))}
        </div>
    );
}

export default CarePlans;