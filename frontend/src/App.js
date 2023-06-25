import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import PrivateRoute from './utils/PrivateRoute';

const App = () => {
  return (
    <Router>
      <div>
        {/* <Navbar /> */}
        <Routes>
          <Route exact path='/' element={
              <PrivateRoute>
              <HomePage/>
              </PrivateRoute>
          }/>
          <Route path="/register" element={<RegisterForm/>} />
          <Route path="/login" element={<LoginForm/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
