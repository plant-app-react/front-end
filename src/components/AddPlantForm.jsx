import { useState } from "react";
import axios from "axios";


const AddPlantForm = ({onAddPlant}) => {
const [newPlant, setNewPlant] = useState({
    name: "",
    image: ""
})

const API_URL = import.meta.env.VITE_API_URL;

const handleValueChanges = (e) => {
    setNewPlant({
        ...newPlant,
        [e.target.name]: e.target.value ,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    axios
    .post(`${API_URL}/plants`, newPlant)
    .then((res) => {
    onAddPlant(res.data);
    setNewPlant({
        name: "",
        image: "",
    }); 
        
       console.log(res)
    })
    .catch((e) => {
      console.log(e);
    });
}


    return (
        <div>

            <form onSubmit={handleSubmit}>

                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        placeholder="Monstera"
                        value={newPlant.name}
                        onChange={handleValueChanges}
                    />
                </label>
                <label>
                    Picture:
                    <input
                        type="url"
                        name="image"
                        placeholder="http://url.com"
                        value={newPlant.image}
                        onChange={handleValueChanges}
                    />
                </label>

                <button type="submit">Create Plant</button>
            </form>
        </div>
    );
}

export default AddPlantForm;