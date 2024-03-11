

function HomePage() {
    return (
        <>

            <div className="flex flex-col lg:flex-row lg:justify-center lg:items-center font-bold lg:mt-48 gap-24">
                <div className="text-center mr-12">
                    <h1 className="text-4xl lg:text-8xl mt-24 text-green-700">Plant Care</h1>
                    <h2 className="text-6xl my-4  text-green-700">Made Simpler</h2>
                    <h4 className="text-2xl my-4  text-green-600">We've got you covered</h4>
                    <p className="text-md lg:text-xl my-8 text-green-600">With PlantiePie, create customized care plans<br />
                        and unlock your plant's full potential</p>
                </div>
                <div className="grid lg:grid-cols-3 gap-12 w-2/6 h-96">
                    <img src="./src/assets/plant1.jpg" alt="plant" className="rounded-xl" />
                    <img src="./src/assets/plant2.jpg" alt="plant" className="rounded-xl" />
                    <img src="./src/assets/plant7.jpg" alt="plant" className="rounded-xl" />
                    <img src="./src/assets/plant4.jpg" alt="plant" className="rounded-xl" />
                    <img src="./src/assets/plant3.jpg" alt="plant" className="rounded-xl" />
                    <img src="./src/assets/plant5.jpg" alt="plant" className="rounded-xl" />

                </div>
            </div >
        </>
    )
}

export default HomePage;