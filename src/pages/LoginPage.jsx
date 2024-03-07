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
        <div className="p-8 pb-16 mb-10 mt-10 rounded-lg shadow-md flex flex-col h-full relative w-full max-w-3xl mx-auto">


            <form
                onSubmit={handleLoginSubmit}
                className="grid grid-cols-1 gap-4 overflow-y-auto mt-12 px-4"
            >
                <h3 className="text-center text-2xl font-semibold text-green-700 mb-6 sticky">
                    Login
                </h3>

                <label
                    htmlFor="email"
                    className="text-center text-green-700 mb-2 text-l font-bold"
                >
                    Email
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
                    className="border rounded p-2 w-full mb-6"
                    autoComplete="off"
                />

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-green-700 text-white font-bold py-2 px-4 rounded my-4 w-24"
                    >
                        Log In
                    </button>
                </div>
            </form>

            {errorMessage && <p className="text-center error-message">{errorMessage}</p>}

            <p className="text-center mt-10 mb-2">Don't have an account yet?</p>
            <Link to={"/signup"} className="text-center text-green-700"> Sign Up</Link>
        </div>
    );
}

export default LoginPage;
