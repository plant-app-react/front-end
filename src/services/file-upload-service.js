import axios from "axios";

const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5005",
  // withCredentials: true // => you might need this option if using cookies and sessions
});

const errorHandler = (err) => {
  throw err;
};

const uploadImage = (file) => {
  return service
    .post("/upload", file)
    .then((res) => res.data)
    .catch(errorHandler);
};

export default uploadImage;
