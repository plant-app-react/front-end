import plant1 from "../assets/plant1.jpg"
import plant2 from "../assets/plant2.jpg"
import plant3 from "../assets/plant3.jpg"
import plant4 from "../assets/plant4.jpg"
import plant5 from "../assets/plant5.jpg"
import plant6 from "../assets/plant6.jpg"

function HomePage() {
    return (
        <>

            <div className="flex flex-col lg:flex-row lg:justify-center lg:items-center font-bold lg:mt-48 gap-12 pb-16 lg:h-96">
                <div className="text-center lg:mr-12">
                    <h1 className="text-4xl mt-6 lg:text-7xl lg:mt-24 text-green-700">Plant Care</h1>
                    <h2 className="text-4xl my-4  text-green-700 lg:text-6xl">Made Simpler</h2>
                    <h4 className="text-2xl my-8  text-green-600">We've got you covered</h4>
                    <p className="text-md lg:text-xl lg:my-8 text-green-600">With PlantiePie, create customized care plans<br />
                        and unlock your plant's full potential</p>
                    <p className="text-md lg:text-xl lg:my-8 text-green-600">Track your green friends growth, know precisely <br />when to water, fertilize and more.<br />

                        Let PlantiePie take the worry out of plant care, so you <br />
                        can enjoy watching your plants thrive
                        ack your plants grow</p>
                </div>
                <div className="grid lg:grid-cols-3 gap-4 lg:gap-12 w-2/6 h-96 mx-auto lg:mx-0">
                    <img src={plant1} alt="plant" className="rounded-xl" />
                    <img src={plant2} alt="plant" className="rounded-xl" />
                    <img src={plant3} alt="plant" className="rounded-xl" />
                    <img src={plant4} alt="plant" className="hidden lg:flex rounded-xl" />
                    <img src={plant5} alt="plant" className="hidden lg:flex rounded-xl" />
                    <img src={plant6} alt="plant" className="hidden lg:flex rounded-xl" />

                </div>
            </div >
            <div className="h-64 w-full lg:hidden"></div>
        </>
    )
}

export default HomePage;