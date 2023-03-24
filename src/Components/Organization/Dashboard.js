import React, { useContext } from 'react'
import Navbar from './Navbar'
import { SocketContext } from './StoreContext/UserContext'

import { useNavigate } from 'react-router-dom';
function Dashboard() {
  const socket = useContext(SocketContext);
  const navigate = useNavigate({});

  return (
    <>
        <Navbar />
        <div >
            <h1>This is a Dashboard component</h1>
        </div>
    </>
  )
}

export default Dashboard