import { useState } from "react";
import axios from "axios";


const AddPlantForm = ({ handleAddPlant }) => {

    const API_URL = import.meta.env.VITE_API_URL;

    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    const [location, setLocation] = useState("")
    const [directSunlight, setDirectSunlight] = useState(false);
    const [toxicity, setToxicity] = useState(false);
    const [difficulty, setDifficulty] = useState("")

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
        <div className="AddPlantForm">

            <form onSubmit={handleSubmit}>

                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label>
                    Picture:
                    <input
                        type="url"
                        name="image"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                </label>
                <label>
                    Location:
                    <input
                        type="radio"
                        name="location"
                        value="interior"
                        checked={location === "interior"}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <label>Interior</label>
                    <input
                        type="radio"
                        name="location"
                        value="exterior"
                        checked={location === "exterior"}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <label>Exterior</label>
                </label>
                <label>
                    Direct Sunlight:
                    <input
                        type="checkbox"
                        name="directSunlight"
                        checked={directSunlight}
                        onChange={(e) => setDirectSunlight(e.target.checked)}
                    />
                </label>
                <label>
                    Toxicity:
                    <input
                        type="checkbox"
                        name="toxicity"
                        checked={toxicity}
                        onChange={(e) => setToxicity(e.target.checked)}
                    />
                </label>
                <label>
                    Difficulty:
                    <input
                        type="radio"
                        name="difficulty"
                        value="Easy Care"
                        checked={difficulty === "Easy Care"}
                        onChange={(e) => setDifficulty(e.target.value)}
                    />
                    <label>Easy Care</label>
                    <input
                        type="radio"
                        name="difficulty"
                        value="High Maintenance"
                        checked={difficulty === "High Maintenance"}
                        onChange={(e) => setDifficulty(e.target.value)}
                    />
                    <label>High Maintenance</label>
                </label>
                <button type="submit">Create Plant</button>
            </form>
        </div>
    );
}

export default AddPlantForm;