import React from 'react'
import { baseUrl } from '../../../URL';
import socketIo from "socket.io-client"
export const UserDetailContext = React.createContext("");
export const SocketContext = React.createContext("");
export const MessageContext = React.createContext("");
function UserContext({subPages}) {
    const [userCrd, setUserCrd] = React.useState();
    const [messages, setMessages] = React.useState([])
    const socket = socketIo.connect(baseUrl);

  return (
    <>
    <UserDetailContext.Provider value={[userCrd, setUserCrd]}>   
        <SocketContext.Provider value={socket}>
          <MessageContext.Provider value={[messages, setMessages]}>
            {subPages}
          </MessageContext.Provider>
        </SocketContext.Provider>
    </UserDetailContext.Provider>

    </>
  )
}

export default UserContext