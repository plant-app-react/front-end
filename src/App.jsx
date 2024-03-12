import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"
import PlantList from "./pages/PlantList"
import Favorites from './pages/Favorites'
import PlantDetails from "./pages/PlantDetails"
import NotFound from "./pages/NotFound"
import AddCarePlan from './pages/AddCarePlan'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import UpdateCarePlan from './pages/UpdateCarePlan'
import IsPrivate from './components/IsPrivate'
import Logout from './components/Logout'
import About from "./pages/About"


function App() {


  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/plants" element={<PlantList />} />
        <Route path="/plants/favorites" element={<Favorites />} />
        <Route path="/plants/:plantId" element={<IsPrivate><PlantDetails /></IsPrivate>} />
        <Route path="/plants/:plantId/addcareplan" element={<IsPrivate><AddCarePlan /></IsPrivate>} />
        <Route path="/plants/:plantId/updatecareplan" element={<IsPrivate><UpdateCarePlan /></IsPrivate>} />
        <Route path="/about" element={<About />}></Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
