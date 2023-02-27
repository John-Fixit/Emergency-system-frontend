import React from 'react';
import logo from './logo.svg';
import './App.css';
import Emergency from './Components/User/Emergency';
import { Navigate, Route, Routes } from 'react-router-dom';
import Index from './Components/Organization/Index';


function App() {

  return (
    <>

      <Routes >
        <Route path='' element={<Navigate to={'/emergency'}/>}/>
        <Route path='/emergency' element={<Emergency/>}/>
        <Route path='/org/*' element={<Index />}/>
      </Routes>
    </>
  );
}

export default App;
