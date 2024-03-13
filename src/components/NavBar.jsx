import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/plantipie-logo2.png";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
    const {
        isLoggedIn,
        user,
        logOutUser
    } = useContext(AuthContext);
    return (
        <nav className="flex justify-between items-center bg-green-600 lg:pr-4">
            <div className=""><Link to={"/"}><img className="h-10 lg:h-16" src={Logo} alt="Logo" /></Link></div>
            <div>
                {isLoggedIn ? (
                    <>
                        <span className="text-xs text-white mx-4 lg:text-sm">Welcome {user && user.name}</span>
                        <NavLink to="/" className="mx-2 text-xs text-white font-semibold hover:underline lg:text-lg lg:font-bold">Home</NavLink>
                        <NavLink to="/plants" className="mx-2 text-xs font-semibold text-white hover:underline lg:text-lg lg:font-bold">Plants</NavLink>
                        <NavLink to="/plants/favorites" className="mx-2 text-xs font-semibold text-white hover:underline lg:text-lg lg:font-bold">Favorites</NavLink>
                        <Link to="/logout" onClick={logOutUser} className="mx-2 text-xs font-semibold text-white hover:underline lg:text-lg lg:font-bold">Logout</Link>
                    </>
                ) : (
                    <>
                        <NavLink to="/" className="mx-2 text-xs font-semibold text-white hover:underline lg:text-lg lg:font-bold">Home</NavLink>
                        <NavLink to="/plants" className="mx-2 text-xs font-semibold text-white hover:underline lg:text-lg lg:font-bold">Plants</NavLink>
                        <NavLink to="/signup" className="mx-2 text-xs font-semibold text-white hover:underline lg:text-lg lg:font-bold">Sign Up</NavLink>
                        <NavLink to="/login" className="mx-2 text-xs font-semibold text-white hover:underline lg:text-lg lg:font-bold">Login</NavLink>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar;