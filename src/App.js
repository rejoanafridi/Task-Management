import React from 'react';
import './App.css';
import Home from './pages/home/Home';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './compoenets/navbar/Navbar';
import AddTask from './pages/add-new-task/AddTask';
import EditTask from './pages/edit-task/EditTask';
import Signup from './auth/signup/Signup';
import Login from './auth/login/Login';
import Profile from './pages/profile/Profile';
// Import the PrivateRoute component
import ProtectedRoute from './compoenets/ProtectedRoute';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }></Route>
          {/* Protect the AddTask and EditTask routes */}
          <Route
            path='/add-task'
            element={
              <ProtectedRoute>
                <AddTask />
              </ProtectedRoute>
            }></Route>
          <Route
            path='/edit-task/:editId'
            element={
              <ProtectedRoute>
                <EditTask />
              </ProtectedRoute>
            }></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }></Route>
          <Route
            path='/profile/:name'
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
