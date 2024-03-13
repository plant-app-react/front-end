import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const API_URL = import.meta.env.VITE_API_URL;

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();

    const { storeToken, authenticateUser } = useContext(AuthContext);

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const requestBody = { email, password };

        axios
            .post(`${API_URL}/auth/login`, requestBody)
            .then((response) => {
                console.log("JWT token", response.data.authToken);

                storeToken(response.data.authToken);
                authenticateUser();
                navigate("/");
            })
            .catch((error) => {
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            });
    };

    return (
        <div className="p-2 pb-4 mt-16 mb-10 rounded-lg shadow-md flex flex-col min-w-min max-w-md relative mx-auto">


            <form
                onSubmit={handleLoginSubmit}
                className="grid grid-cols-1 gap-4 overflow-y-auto mt-12 px-4"
            >
                <h3 className="text-center text-md font-semibold text-green-700 mb-6 sticky lg:text-xl lg:font-bold">
                    Login
                </h3>

                <label
                    htmlFor="email"
                    className="text-center text-md font-semibold text-green-700 mb-2 lg:text-md lg:font-bold"
                >
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={handleEmail}
                    className="border rounded p-2 w-full mb-4"
                    autoComplete="off"
                />

                <label
                    htmlFor="password"
                    className="text-center text-md font-semibold text-green-700 mb-4 sticky lg:text-md lg:font-bold"
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

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-green-700 text-white rounded mx-2 py-1 my-4 w-24 hover:bg-green-600 lg:font-bold lg:py-2 lg:px-2  "
                    >
                        Log In
                    </button>
                </div>
            </form>

            {errorMessage && <p className="text-center error-message">{errorMessage}</p>}

            <p className="text-center text-sm mt-4 mb-2 lg:text-md">Don't have an account yet?</p>
            <Link to={"/signup"} className="text-center text-green-700"> Sign Up</Link>
        </div>
    );
}

export default LoginPage;
