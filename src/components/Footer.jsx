import About from "../pages/About"
import { Link } from "react-router-dom"

function Footer() {
    return (
        <div className="fixed bottom-0 w-screen bg-green-600 mt-8 text-center lg:mt-16">
            <Link to="/about" className="text-stone-50">About PlantiePie</Link>

        </div>
    )
}

export default Footer;