import React from 'react'
export const UserDetailContext = React.createContext("");
function UserContext({subPages}) {
    const [userCrd, setUserCrd] = React.useState();
  return (
    <UserDetailContext.Provider value={[userCrd, setUserCrd]}>
        {subPages}
    </UserDetailContext.Provider>
  )
}

export default UserContext