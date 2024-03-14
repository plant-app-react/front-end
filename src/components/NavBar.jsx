import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/plantipie-logo2.png";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { GiHamburgerMenu } from "react-icons/gi";
import { SlClose } from "react-icons/sl";


function Navbar() {
    const {
        isLoggedIn,
        user,
        logOutUser
    } = useContext(AuthContext);

    const NavLinks = () => {
        return (
            <div className="flex flex-col gap-3 md:gap-2 items-center md:flex-row md:bg-none bg-gradient-to-b from-green-600/95 to-green-700/95 p-6 rounded-md rounded-tr-none rounded-br-none md:rounded-none">
                {isLoggedIn ? (
                    <>
                        <span className="text-base text-stone-50 mx-4 lg:text-sm">Welcome {user && user.name}</span>
                        <NavLink to="/" className="mx-2 text-lg md:text-xs text-stone-100 font-semibold underline-offset-4 hover:underline lg:text-lg lg:font-bold">Home</NavLink>
                        <NavLink to="/plants" className="mx-2 text-lg md:text-xs font-semibold text-stone-50 hover:underline underline-offset-4 lg:text-lg lg:font-bold">Plants</NavLink>
                        <NavLink to="/plants/favorites" className="mx-2 text-lg md:text-xs font-semibold text-stone-50 hover:underline underline-offset-4 lg:text-lg lg:font-bold">Favorites</NavLink>
                        <NavLink to="/careplans" className="mx-2 text-lg md:text-xs font-semibold text-stone-50 hover:underline underline-offset-4 lg:text-lg lg:font-bold">My Tasks</NavLink>

                        <Link to="/logout" onClick={logOutUser} className="mx-2 mt-2 md:mt-0 text-lg md:text-xs font-semibold text-stone-50 underline-offset-4 hover:underline lg:text-lg lg:font-bold">Logout</Link>
                    </>
                ) : (
                    <>
                        <NavLink to="/" className="mx-2 text-lg md:text-xs font-semibold text-stone-50 underline-offset-4 hover:underline lg:text-lg lg:font-bold">Home</NavLink>
                        <NavLink to="/plants" className="mx-2 text-lg md:text-xs font-semibold underline-offset-4 text-stone-50 hover:underline lg:text-lg lg:font-bold">Plants</NavLink>
                        <NavLink to="/signup" className="mx-2 text-lg md:text-xs underline-offset-4 font-semibold text-stone-50 hover:underline lg:text-lg lg:font-bold">Sign Up</NavLink>
                        <NavLink to="/login" className="mx-2 text-lg md:text-xs underline-offset-4 font-semibold text-stone-50 hover:underline lg:text-lg lg:font-bold">Login</NavLink>
                    </>
                )}
            </div>
        )
    }

    const [isOpen, setIsOpen] = useState(false);

    const toggleNavBar = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <nav className="flex justify-between items-center bg-gradient-to-b from-green-700 to-green-600">
                <div className="bg-stone-50"><Link to={"/"}><img className="h-10 lg:h-16" src={Logo} alt="Logo" /></Link></div>

                <div className="hidden md:block ">
                    <NavLinks />
                </div>

                <div className="md:hidden flex justify-center me-6 py-6">
                    <button onClick={toggleNavBar} className=" text-2xl text-stone-50">{isOpen ? <SlClose /> : <GiHamburgerMenu />}</button>
                </div>
                {isOpen && (
                    <div className="md:hidden absolute top-[4.5rem] right-0 w-[80%] min-w-[250px] z-100">
                        <NavLinks />
                    </div>
                )}
            </nav>


        </>
    );
}

export default Navbar;