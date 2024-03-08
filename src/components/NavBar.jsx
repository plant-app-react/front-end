import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/plantiepie-logo.png";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
    const {
        isLoggedIn,
        user,
        logOutUser
    } = useContext(AuthContext);
    return (
        <nav className="flex justify-between items-center mx-4 bg-green-700">


            <div className="h-16 self-start"><img className="h-16" src={Logo} /> </div>
            {isLoggedIn && (
                <>
                    <span className="text-sm text-white">Welcome {user && user.name}</span>
                    <Link to="/logout" onClick={logOutUser} className="font-bold text-white">Logout</Link>
                </>
            )}

            {!isLoggedIn && (
                <>
                    <NavLink to="/signup" className="font-bold text-white"> <button>Sign Up</button> </NavLink>
                    <NavLink to="/login" className="font-bold text-white"> <button>Login</button> </NavLink>
                </>
            )}

            <NavLink to="/" className="font-bold text-white">Home</NavLink>
            <NavLink to="/plants" className="font-bold text-white">Plants</NavLink>

        </nav>
    )
}

export default Navbar;