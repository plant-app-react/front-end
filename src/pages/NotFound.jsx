import plantImg from "../assets/helpme-plant.jpg"

function NotFound() {
    return (
        <div className="w-screen h-screen flex flex-col items-center py-24">
            <img className="w-84" src={plantImg} />
            <p className="py-6">We couldn't find the page you are looking for</p>
        </div>
    )
}

export default NotFound;