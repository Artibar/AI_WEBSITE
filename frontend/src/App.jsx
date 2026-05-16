import React from 'react'
import Home from './pages/Home.jsx'
import {Routes, Route} from 'react-router-dom'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import  Dashboard  from './pages/Dashboard.jsx'
import LiveSite from "./pages/LiveSite.jsx"
import GenerateProfile from './pages/GenerateProfile.jsx'
import Preview from './pages/Preview.jsx'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/generate-profile' element={<GenerateProfile/>}/>
      <Route path='/preview/:id' element={<Preview/>}/>
      <Route path='/site/:id' element={<LiveSite/>}/>
    </Routes>
  )
}

export default App