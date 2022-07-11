import React from 'react';
import SignUp from './screens/SignUp';
import Login from './screens/Login';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Page404 from './screens/Page404';
import Dashboard from './screens/DashBoard';
import ProtectedRoute from './middlewares/RoutesMiddleware/ProtectedRoute';
import RedirectAutenticated from './middlewares/RoutesMiddleware/RedirectAutenticated';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>    
        }/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="*" element={<Page404 />}/>
      </Routes>
    </BrowserRouter>
  );
}


export default App