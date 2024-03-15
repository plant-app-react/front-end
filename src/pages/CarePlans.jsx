import axios from "axios"
import { useState, useEffect } from "react"
import moment from 'moment';
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const CarePlans = () => {

    const storedToken = localStorage.getItem("authToken");
    const [careplans, setCarePlans] = useState(null);

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


    console.log(careplans)



    const remindersPast = (date, propertyName, plantName, plantId) => {
        if (!moment(date).isValid()) {
            return ''; // Return nothing if the date is invalid
        }
        let now = new Date();
        const formattedNow = moment(now).startOf('day');
        const formattedDate = moment(date).startOf('day');

        if (formattedDate.isBefore(formattedNow)) {

            return (
                <li className="py-4">
                    <div className="flex items-center">

                        <span className="text-lg font-medium pl-2 ">{propertyName} the <Link to={`/plants/${plantId}`} className="text-green-600 hover:text-green-800">{plantName}</Link> was done {moment(date).startOf('day').fromNow()}</span>

                    </div>
                </li>
            )
        }
    }



    const calcToDoesToday = (date, propertyName, plantName, plantId) => {
        if (!moment(date).isValid()) {
            return ''; // Return nothing if the date is invalid
        }
        let now = new Date();
        const formattedNow = moment(now).startOf('day');
        const formattedDate = moment(date).startOf('day');

        if (formattedDate.isBefore(formattedNow)) {
            return null;
        }
        else if (formattedDate.isSame(formattedNow)) {
            return (
                <li className="py-4">
                    <div className="flex items-center">
                        <label className="ml-3 block text-gray-900">
                            <input type="checkbox" className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />
                            <span className="text-lg font-medium pl-2">{propertyName} the <Link to={`/plants/${plantId}`} className="text-green-600 hover:text-green-800">{plantName}</Link>!</span>
                        </label>
                    </div>
                </li>
            )
        }
    }

    const calcToDoesFuture = (date, propertyName, plantName, plantId) => {
        if (!moment(date).isValid()) {
            return ''; // Return nothing if the date is invalid
        }
        let now = new Date();
        const formattedNow = moment(now).startOf('day');
        const formattedDate = moment(date).startOf('day');

        if (formattedDate.isBefore(formattedNow)) {
            return null;
        }
        else if (formattedDate.isSame(formattedNow)) {
            return null;
        }
        return (
            <li className="py-4">
                <div className="flex items-center">
                    <label className="ml-3 block text-gray-900"> <input type="checkbox" className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />
                        <span className="text-lg font-medium pl-2">{formattedDate.fromNow() + ` you have to ${propertyName} the `} <Link to={`/plants/${plantId}`} className="text-green-600 hover:text-green-800">{plantName}</Link></span>
                    </label>
                </div>
            </li>
        )
    }

    return (
        <div className="careplans flex flex-col lg:flex-row mb-24">

            <div className="lg:w-1/4 mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16 ">
                <div className="px-4 py-4">
                    <h1 className="text-gray-800 font-bold text-2xl uppercase flex justify-center">Reminders ☝️</h1>
                </div>

                {careplans &&
                    <>
                        {careplans.some(careplan => remindersPast(careplan.water) || remindersPast(careplan.fertilize) || remindersPast(careplan.mist) || remindersPast(careplan.repot) || remindersPast(careplan.clean))
                            ? (careplans.map((careplan, index) => (
                                <ul className="divide-y divide-gray-200 px-4">
                                    {remindersPast(careplan.water, "water", careplan.plant.name, careplan.plant._id)}
                                    {remindersPast(careplan.fertilize, "fertilize", careplan.plant.name, careplan.plant._id)}
                                    {remindersPast(careplan.mist, "mist", careplan.plant.name, careplan.plant._id)}
                                    {remindersPast(careplan.repot, "repot", careplan.plant.name, careplan.plant._id)}
                                    {remindersPast(careplan.clean, "clean", careplan.plant.name, careplan.plant._id)}
                                    <hr />
                                </ul>
                            )))
                            : <p className="text-center">'You are not taking care of your plants!'</p>
                        }
                    </>
                }
            </div>

            <div className="lg:w-1/4  mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16 ">
                <div className="px-4 py-2">
                    <h1 className="text-gray-800 font-bold text-2xl uppercase flex justify-center">Today's To-Do List 📝</h1>
                </div>

                {careplans &&
                    <>
                        {careplans.some(careplan => calcToDoesToday(careplan.water) || calcToDoesToday(careplan.fertilize) || calcToDoesToday(careplan.mist) || calcToDoesToday(careplan.repot) || calcToDoesToday(careplan.clean))
                            ? (careplans.map((careplan, index) => (
                                <ul className="divide-y divide-gray-200 px-4">
                                    {calcToDoesToday(careplan.water, "water", careplan.plant.name, careplan.plant._id)}
                                    {calcToDoesToday(careplan.fertilize, "fertilize", careplan.plant.name, careplan.plant._id)}
                                    {calcToDoesToday(careplan.mist, "mist", careplan.plant.name, careplan.plant._id)}
                                    {calcToDoesToday(careplan.repot, "repot", careplan.plant.name, careplan.plant._id)}
                                    {calcToDoesToday(careplan.clean, "clean", careplan.plant.name, careplan.plant._id)}
                                    <hr />
                                </ul>
                            )))
                            : <p className="text-center">'Nothing to do today'</p>
                        }
                    </>
                }
            </div>

            <div className="lg:w-1/4 mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16 ">
                <div className="px-4 py-2">
                    <h1 className="text-gray-800 font-bold text-2xl uppercase flex justify-center">Next Day's To-Do List 🙏</h1>
                </div>

                {careplans &&
                    <>
                        {careplans.some(careplan => calcToDoesFuture(careplan.water) || calcToDoesFuture(careplan.fertilize) || calcToDoesFuture(careplan.mist) || calcToDoesFuture(careplan.repot) || calcToDoesFuture(careplan.clean))
                            ? (careplans.map((careplan, index) => (
                                <ul className="divide-y divide-gray-200 px-4">
                                    {calcToDoesFuture(careplan.water, "water", careplan.plant.name, careplan.plant._id)}
                                    {calcToDoesFuture(careplan.fertilize, "fertilize", careplan.plant.name, careplan.plant._id)}
                                    {calcToDoesFuture(careplan.mist, "mist", careplan.plant.name, careplan.plant._id)}
                                    {calcToDoesFuture(careplan.repot, "repot", careplan.plant.name, careplan.plant._id)}
                                    {calcToDoesFuture(careplan.clean, "clean", careplan.plant.name, careplan.plant._id)}
                                    <hr />
                                </ul>
                            )))
                            : <p className="text-center">'No upcoming tasks for the next few days'</p>
                        }
                    </>
                }
            </div>

        </div>
    );
}

export default CarePlans;