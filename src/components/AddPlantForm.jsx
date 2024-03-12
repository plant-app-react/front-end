import { useState } from "react";
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


    const handleFileUpload = (e) => {

        const uploadData = new FormData();
        uploadData.append("image", e.target.files[0]);


        uploadImage(uploadData)
            .then(response => {
                console.log("response is: ", response);
                setImage(response.fileUrl);
                console.log(response.fileUrl)
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


    return (
        <div>

            <form onSubmit={handleSubmit} className="text-3xl">
                <div className="max-w-sm mx-auto">
                    <label className="block text-sm font-medium">
                        Name:
                        <input
                            className="w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs"
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label className="block text-sm font-medium mt-3">
                        Image:
                        <input
                            className="w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs"
                            type="file"
                            name="image"
                            onChange={(e) => handleFileUpload(e)}
                        />
                    </label>


                    <label className="block text-sm font-medium mt-3">
                        Location:
                        <input
                            className="ml-2"
                            type="radio"
                            name="location"
                            value="interior"
                            checked={location === "interior"}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                        <label>Interior</label>
                        <input
                            className="ml-2"
                            type="radio"
                            name="location"
                            value="exterior"
                            checked={location === "exterior"}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                        <label>Exterior</label>
                    </label>
                    <label className="block text-sm font-medium mt-3">
                        Direct Sunlight:
                        <input
                            className="ml-2"
                            type="checkbox"
                            name="directSunlight"
                            checked={directSunlight}
                            onChange={(e) => setDirectSunlight(e.target.checked)}
                        />
                    </label>
                    <label className="block text-sm font-medium mt-3">
                        Toxicity:
                        <input
                            className="ml-2"
                            type="checkbox"
                            name="toxicity"
                            checked={toxicity}
                            onChange={(e) => setToxicity(e.target.checked)}
                        />
                    </label>
                    <label className="block text-sm font-medium mt-3">
                        Difficulty:
                        <input
                            className="ml-2"
                            type="radio"
                            name="difficulty"
                            value="Easy Care"
                            checked={difficulty === "Easy Care"}
                            onChange={(e) => setDifficulty(e.target.value)}
                        />
                        <label>Easy Care</label>
                        <input
                            className="ml-2"
                            type="radio"
                            name="difficulty"
                            value="High Maintenance"
                            checked={difficulty === "High Maintenance"}
                            onChange={(e) => setDifficulty(e.target.value)}
                        />
                        <label>High Maintenance</label>
                    </label>
                </div>
                <div className="flex justify-center mt-8">
                    <button type="submit" className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full ">Create Plant</button>
                </div>
            </form>
        </div>
    );
}

export default AddPlantForm;