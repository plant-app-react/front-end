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
        axios.post(`${API_URL}/auth/signup`, requestBody)

            .then(() => {
                navigate("/login");
            })
            .catch((error) => {
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            })
    };


    return (
        <div className="p-8 pb-16 mb-10 mt-10 rounded-lg shadow-md flex flex-col h-full relative w-full max-w-3xl mx-auto">


            <form
                onSubmit={handleSignupSubmit}
                className="grid grid-cols-1 gap-4 overflow-y-auto mt-12 px-4"
            >
                <h3 className="text-center text-2xl font-semibold text-green-700 mb-6 sticky">
                    Create an Account
                </h3>

                <label
                    htmlFor="email"
                    className="text-center text-green-700 mb-2 text-l font-bold"
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
                    className="text-center text-green-700 mb-2 text-l font-bold"
                >
                    Password
                </label>

                <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={handlePassword}
                    className="border rounded p-2 w-full"
                    autoComplete="off"
                />
                <p className="text-sm">*Min 6 characters, 1 uppercase, 1 number</p>
                <label
                    htmlFor="name"
                    className="text-center text-green-700 mb-2 text-l font-bold"
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
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-green-700 text-white font-bold py-2 px-4 rounded my-4 w-24"
                    >
                        Sign Up
                    </button>
                </div>
            </form>

            {errorMessage && <p className="text-center error-message">{errorMessage}</p>}

            <p className="text-center mt-10 mb-2">Already have an account?</p>
            <Link to={"/login"} className="text-center text-green-700 font-semibold"> Log in</Link>
        </div>
    )
}
export default SignupPage