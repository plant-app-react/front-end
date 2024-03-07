import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"

const API_URL = import.meta.env.VITE_API_URL;

function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();


    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleName = (e) => setName(e.target.value);


    const handleSignupSubmit = (e) => {
        e.preventDefault();
        const requestBody = { email, password, name };
        axios.post(`${API_URL}/signup`, requestBody)
            .then(() => {
                navigate("/login");
            })
            .catch((error) => {
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            })
    };


    return (
        <div className=" p-8 pb-16 mb-10 mt-10 rounded-lg shadow-md flex flex-col h-full relative w-full max-w-3xl mx-auto">


            <form
                onSubmit={handleSignupSubmit}
                className="grid grid-cols-1 gap-4 overflow-y-auto mt-12 px-4"
            >
                <h3 className="text-2xl font-semibold text-gray-700 mb-6 sticky left-0">
                    Sign Up
                </h3>

                <label
                    htmlFor="email"
                    className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold"
                >
                    E-mail
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={handleEmail}
                    className="border rounded p-2 w-full mb-6"
                    autoComplete="off"
                />

                <label
                    htmlFor="password"
                    className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold"
                >
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={handlePassword}
                    className="border rounded p-2 w-full mb-6"
                    autoComplete="off"
                />

                <label
                    htmlFor="name"
                    className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold"
                >
                    Name
                </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={handleName}
                    className="border rounded p-2 w-full mb-6"
                    autoComplete="off"
                />

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 transition duration-150 ease-in-out"
                >
                    Create Account
                </button>
            </form>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <p className="mt-10 mb-2">Already have an account?</p>
            <Link to={"/login"}> Log in</Link>
        </div>
    )
}
export default SignupPage