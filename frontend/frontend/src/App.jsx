import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Router, Routes, Navigate } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Security from './components/Security'
import CreateUser from './components/CreateUser'
import Login from './components/Login'

function App() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  return (
      <Routes>
        <Route path="/" element={token ? <Navigate to="/dashboard"/> :<Login/>}></Route>
        <Route path="/dashboard" element={token ? <Dashboard/> : <Navigate to="/" />}>
          <Route path='security' element={<Security/>}></Route>
          <Route path='create-user' eelement={role === 'SuperAdmin' ? <CreateUser /> : <Navigate to="/dashboard/security" />} ></Route>
        </Route>
      </Routes>
  )
}

export default App
