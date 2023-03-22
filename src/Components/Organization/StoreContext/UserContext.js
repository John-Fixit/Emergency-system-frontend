import React from 'react'
import { baseUrl } from '../../../URL';
import socketIo from "socket.io-client"
export const UserDetailContext = React.createContext("");
export const SocketContext = React.createContext("");

function UserContext({subPages}) {
    const [userCrd, setUserCrd] = React.useState();

    const socket = socketIo.connect(baseUrl);

  return (
    <>
    <UserDetailContext.Provider value={[userCrd, setUserCrd]}>   
        <SocketContext.Provider value={socket}>
            {subPages}
        </SocketContext.Provider>
    </UserDetailContext.Provider>

    </>
  )
}

export default UserContext