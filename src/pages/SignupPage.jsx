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
        <div className="pb-4 mb-2 rounded-lg shadow-md flex flex-col min-w-min max-w-md relative mx-auto">


            <form
                onSubmit={handleSignupSubmit}
                className="grid grid-cols-1 gap-4 overflow-y-auto mt-8 px-4"
            >
                <h3 className="text-center text-md font-semibold text-green-700 mb-2 sticky lg:text-xl lg:font-bold">
                    Create Account
                </h3>

                <label
                    htmlFor="email"
                    className="text-center text-md font-semibold text-green-700 mb-2 lg:text-md lg:font-bold"
                >
                    E-mail
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={handleEmail}
                    className="border rounded p-2 w-full mb-2"
                    autoComplete="off"
                />

                <label
                    htmlFor="password"
                    className="text-center text-md font-semibold text-green-700 mb-2 lg:text-md lg:font-bold"
                >
                    Password
                </label>

                <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={handlePassword}
                    className="border rounded p-2 w-full mb-1"
                    autoComplete="off"
                />
                <p className="text-sm">*Min 6 characters, 1 uppercase, 1 number</p>
                <label
                    htmlFor="name"
                    className="text-center text-md font-semibold text-green-700 mb-2 lg:text-md lg:font-bold"
                >
                    Name
                </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={handleName}
                    className="border rounded p-2 w-full mb-1"
                    autoComplete="off"
                />
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-green-700 text-white rounded mx-2 py-1 my-1 w-24 hover:bg-green-600 lg:font-bold lg:py-2 lg:px-2  "
                    >
                        Sign Up
                    </button>
                </div>
            </form>

            {errorMessage && <p className="text-center error-message">{errorMessage}</p>}

            <p className="text-center text-xs mt-4 lg:text-sm">Already have an account?</p>
            <Link to={"/login"} className="text-center"><span className="text-green-700 font-semibold hover:text-green-500"> Log in</span></Link>
        </div>
    )
}
export default SignupPage