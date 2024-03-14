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
        <nav className="flex justify-between items-center bg-gradient-to-b from-green-700 to-green-600 lg:pr-4">
            <div className="bg-stone-50"><Link to={"/"}><img className="h-10 lg:h-16" src={Logo} alt="Logo" /></Link></div>
            <div>
                {isLoggedIn ? (
                    <>
                        <span className="text-xs text-stone-50 mx-4 lg:text-sm">Welcome {user && user.name}</span>
                        <NavLink to="/" className="mx-2 text-xs text-stone-100 font-semibold hover:underline lg:text-lg lg:font-bold">Home</NavLink>
                        <NavLink to="/plants" className="mx-2 text-xs font-semibold text-stone-50 hover:underline lg:text-lg lg:font-bold">Plants</NavLink>
                        <NavLink to="/plants/favorites" className="mx-2 text-xs font-semibold text-stone-50 hover:underline lg:text-lg lg:font-bold">Favorites</NavLink>
                        <NavLink to="/careplans" className="mx-2 text-xs font-semibold text-stone-50 hover:underline lg:text-lg lg:font-bold">Care Plans</NavLink>
                        <Link to="/logout" onClick={logOutUser} className="mx-2 text-xs font-semibold text-stone-50 hover:underline lg:text-lg lg:font-bold">Logout</Link>
                    </>
                ) : (
                    <>
                        <NavLink to="/" className="mx-2 text-xs font-semibold text-stone-50 hover:underline lg:text-lg lg:font-bold">Home</NavLink>
                        <NavLink to="/plants" className="mx-2 text-xs font-semibold text-stone-50 hover:underline lg:text-lg lg:font-bold">Plants</NavLink>
                        <NavLink to="/signup" className="mx-2 text-xs font-semibold text-stone-50 hover:underline lg:text-lg lg:font-bold">Sign Up</NavLink>
                        <NavLink to="/login" className="mx-2 text-xs font-semibold text-stone-50 hover:underline lg:text-lg lg:font-bold">Login</NavLink>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar;