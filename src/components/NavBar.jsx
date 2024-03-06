import { NavLink } from "react-router-dom";
import Logo from "../assets/plantiepie-logo.png";

function Navbar() {
    return (
        <nav className="flex justify-between items-center mx-4 bg-green-700">
            <div className="h-16 self-start"><img className="h-16" src={Logo} /> </div>
            <span className="font-bold text-white">Sign up</span>
            <span className="font-bold text-white">Log in</span>
            <NavLink to="/" className="font-bold text-white">Home</NavLink>
            <NavLink to="/plants" className="font-bold text-white">Plants</NavLink>

        </nav>
    )
}

export default Navbar;