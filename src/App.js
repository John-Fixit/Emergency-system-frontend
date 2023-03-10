import React from 'react';
import logo from './logo.svg';
import './App.css';
import Emergency from './Components/User/Emergency';
import { Navigate, Route, Routes } from 'react-router-dom';
import Index from './Components/Organization/Index';
import socketIOClient from "socket.io-client";
import { baseUrl } from './URL';

function App() {
  const socket = socketIOClient.connect(baseUrl)
  return (
    <>

      <Routes >
        <Route path='' element={<Navigate to={'/emergency'}/>}/>
        <Route path='/emergency' element={<Emergency socket={socket}/>}/>
        <Route path='/org/*' element={<Index />}/>
      </Routes>
    </>
  );
}

export default App;
