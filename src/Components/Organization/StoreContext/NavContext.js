import React, { useContext, useState } from 'react'
export const NavContext = useContext({});
function NavContext({subpages}) {
    const [navVisible, setnavVisible] = useState(false)
  return (
    <>
        <NavContext.Provider value={[navVisible, setnavVisible]}>
            {subpages}
        </NavContext.Provider>
    </>
  )
}

export default NavContext