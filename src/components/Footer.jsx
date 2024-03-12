import About from "../pages/About"
import { Link } from "react-router-dom"

function Footer() {
    return (
        <div className="fixed bottom-0 w-screen bg-green-700 mt-16 text-center">
            <Link to="/about" className="text-white">About PlantiePie</Link>

        </div>
    )
}

export default Footer;