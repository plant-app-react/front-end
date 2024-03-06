import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"
import PlantList from "./pages/PlantList"
import PlantDetails from "./pages/PlantDetails"
import NotFound from "./pages/NotFound"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar />
      <h1>Plant App</h1>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/plants" element={<PlantList />} />
        <Route path="/plants/:plantId" element={<PlantDetails />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
