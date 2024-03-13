import { useState } from "react";
import axios from "axios";
import uploadImage from "../services/file-upload-service";


const AddPlantForm = ({ handleAddPlant }) => {

    const API_URL = import.meta.env.VITE_API_URL;

    const [name, setName] = useState("")
    const [image, setImage] = useState(null)
    const [location, setLocation] = useState("")
    const [directSunlight, setDirectSunlight] = useState(false);
    const [toxicity, setToxicity] = useState(false);
    const [difficulty, setDifficulty] = useState("")
    const [imageLoaded, setImageLoaded] = useState(null)

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };

    const handleDifficulty = (_e) => {
        setDifficulty(_e.target.value);
    };

    const handleFileUpload = (_e) => {
        setImageLoaded("isLoading")
        const uploadData = new FormData();
        uploadData.append("image", _e.target.files[0]);
        uploadImage(uploadData)
            .then(response => {
                setImage(response.fileUrl);
                setImageLoaded(null)
            })
            .catch(err => console.log("Error while uploading the file: ", err));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const plantData = {
            name: name,
            location: location,
            directSunlight: directSunlight,
            toxicity: toxicity,
            difficulty: difficulty
        };

        if (image) {
            plantData.image = image
        }

        axios
            .post(`${API_URL}/plants`, plantData)
            .then((res) => {
                console.log(res)
                handleAddPlant(res.data)
                setName("")
                setImage("")
                setDifficulty("")
                setDirectSunlight(false);
                setToxicity(false);
            })
            .catch((e) => {
                console.log(e);
            });
    }
    //TODO: make all functions for changing states 
    //## (e)=>setName(e.target.value) or const handleNameChange=()=>{} ##

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
                            onChange={handleFileUpload}
                        />
                    </label>


                    <label className="text-green-700 block text-sm font-medium mt-3">
                        Location:
                        <label className="text-gray-900">Interior</label>
                        <input
                            className="m-2"
                            type="radio"
                            name="location"
                            value="interior"
                            checked={location === "interior"}
                            onChange={handleLocationChange}
                        />
                        <label className="text-gray-900">Exterior</label>
                        <input
                            className="my-2 mx-4"
                            type="radio"
                            name="location"
                            checked={location === "exterior"}
                            onChange={handleLocationChange}
                        />
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
                        <label className="text-gray-900">Easy Care</label>
                        <input
                            className="mx-2"
                            type="radio"
                            name="difficulty"
                            value="Easy Care"
                            checked={difficulty === "Easy Care"}
                            onChange={handleDifficulty}
                        />
                        <label className="text-gray-900">High Maintenance</label>
                        <input
                            className="mx-2"
                            type="radio"
                            name="difficulty"
                            value="High Maintenance"
                            checked={difficulty === "High Maintenance"}
                            onChange={(e) => setDifficulty(e.target.value)}
                        />
                    </label>
                </div>
                <div className="flex justify-center mt-8">
                    <button disabled={imageLoaded === "isLoading"} type="submit" className="disabled:bg-gray-100 disabled:text-black bg-green-700 hover:bg-green-600 my-4 text-white text-sm lg:text-lg font-bold py-1 px-4 rounded-full ">Add</button>
                </div>
            </form>
        </div>
    );
}

export default AddPlantForm;