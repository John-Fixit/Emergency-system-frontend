import React from 'react'
import { baseUrl } from '../../../URL';
import socketIo from "socket.io-client"
export const ContextForSocket = React.createContext("");
function SocketContext({subPages}) {
    const socket = socketIo.connect(baseUrl);
  return (
    <>
        <ContextForSocket.Provider value={socket}>
            {subPages}
        </ContextForSocket.Provider>
    </>
  )
}

export default SocketContext