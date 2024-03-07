import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"
import PlantList from "./pages/PlantList"
import PlantDetails from "./pages/PlantDetails"
import NotFound from "./pages/NotFound"
import AddCarePlan from './pages/AddCarePlan'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/plants" element={<PlantList />} />
        <Route path="/plants/:plantId" element={<PlantDetails />} />
        <Route path="/plants/:plantId/addcareplan" element={<AddCarePlan />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
