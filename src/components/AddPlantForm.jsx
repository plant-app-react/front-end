import { useState, useEffect } from "react";
import axios from "axios";
import uploadImage from "../services/file-upload-service";


const AddPlantForm = ({ handleAddPlant }) => {

    const API_URL = import.meta.env.VITE_API_URL;

    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    const [location, setLocation] = useState("")
    const [directSunlight, setDirectSunlight] = useState(false);
    const [toxicity, setToxicity] = useState(false);
    const [difficulty, setDifficulty] = useState("")
    const [isImageLoaded, setIsImageLoaded] = useState(false)


    const handleFileUpload = (e) => {

        const uploadData = new FormData();
        uploadData.append("image", e.target.files[0]);


        uploadImage(uploadData)
            .then(response => {
                console.log("response is: ", response);
                setImage(response.fileUrl);
                console.log(response.fileUrl)
                setIsImageLoaded(true);
            })
            .catch(err => console.log("Error while uploading the file: ", err));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const plantData = {
            name: name,
            image: image || "https://www.nycstreetdesign.info/sites/default/files/2018-12/Leaf%20icon_14.jpg",
            location: location,
            directSunlight: directSunlight,
            toxicity: toxicity,
            difficulty: difficulty
        };

        axios
            .post(`${API_URL}/plants`, plantData)
            .then((res) => {
                console.log(res)
                handleAddPlant(res.data)
                setName("")
                setImage("")
                setDirectSunlight(false);
                setToxicity(false);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    useEffect(() => {
        setIsImageLoaded(false) //Reset state when image changes
    }, [image]);

    return (
        <div className="flex flex-col justify-center items-center px-6">

            <form onSubmit={handleSubmit} className="text-3xl rounded-lg shadow-lg max-w-screen-sm m-6 px-6">
                <div className="max-w-sm mx-auto">
                    <label className="text-green-700 block text-sm font-medium">
                        Name:
                        <input
                            className="w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs h-8 lg:h-10"
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label className="text-green-700 block text-sm font-medium mt-3">
                        Image:
                        <input
                            className="w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs h-8 lh:h-10"
                            type="file"
                            name="image"
                            onChange={(e) => handleFileUpload(e)}
                        />
                    </label>


                    <label className="text-green-700 block text-sm font-medium mt-3">
                        Location:
                        <input
                            className="m-2"
                            type="radio"
                            name="location"
                            value="interior"
                            checked={location === "interior"}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                        <label className="text-gray-900">Interior</label>
                        <input
                            className="my-2 mx-4"
                            type="radio"
                            name="location"
                            value="exterior"
                            checked={location === "exterior"}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                        <label className="text-gray-900">Exterior</label>
                    </label>
                    <label className="text-green-700 block text-sm font-medium mt-3">
                        Direct Sunlight:
                        <input
                            className="m-2"
                            type="checkbox"
                            name="directSunlight"
                            checked={directSunlight}
                            onChange={(e) => setDirectSunlight(e.target.checked)}
                        />
                    </label>
                    <label className="text-green-700 block text-sm font-medium mt-3">
                        Toxicity:
                        <input
                            className="m-2"
                            type="checkbox"
                            name="toxicity"
                            checked={toxicity}
                            onChange={(e) => setToxicity(e.target.checked)}
                        />
                    </label>
                    <label className="text-green-700 block text-sm font-medium mt-3">
                        Difficulty:
                        <input
                            className="mx-2"
                            type="radio"
                            name="difficulty"
                            value="Easy Care"
                            checked={difficulty === "Easy Care"}
                            onChange={(e) => setDifficulty(e.target.value)}
                        />
                        <label className="text-gray-900">Easy Care</label>
                        <input
                            className="mx-2"
                            type="radio"
                            name="difficulty"
                            value="High Maintenance"
                            checked={difficulty === "High Maintenance"}
                            onChange={(e) => setDifficulty(e.target.value)}
                        />
                        <label className="text-gray-900">High Maintenance</label>
                    </label>
                </div>
                <div className="flex justify-center mt-8">
                    <button type="submit" className="bg-green-700 hover:bg-green-600 my-4 text-white text-sm lg:text-lg font-bold py-1 px-4 rounded-full ">Add</button>
                </div>
            </form>
        </div>
    );
}

export default AddPlantForm;