import React from 'react';
import logo from './logo.svg';
import './App.css';
import Emergency from './Components/User/Emergency';
import { Navigate, Route, Routes } from 'react-router-dom';
import socketIOClient from "socket.io-client";
import { baseUrl } from './URL';
import OrgMainRoute from './Components/Organization/OrgMainRoute';
import Login from './Components/Organization/Login';
import AddOrg from './Components/Organization/AddOrg';
import {SWRConfig} from "swr"
import axios from 'axios';
function App() {
  const socket = socketIOClient.connect(baseUrl)
  const fetcher =(...args)=>axios.get(...args)
  return (
    <>
      <SWRConfig value={{fetcher: fetcher}}>
        <Routes>
          <Route path='' element={<Navigate to={'/emergency'}/>}/>
          <Route path='/emergency' element={<Emergency socket={socket}/>}/>
          <Route path="/addOrg" element={<AddOrg />} />
          <Route path="/login" element={<Login />} />
          <Route path='/org/*' element={<OrgMainRoute />}/>
        </Routes>
      </SWRConfig>
    </>
  );
}

export default App;
