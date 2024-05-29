import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "../../Styles/navbar.css"
import { Avatar, Tooltip, Zoom } from '@mui/material';
import logo from "../../assets/ENS Logo.png";
function Navbar() {
  const [selectedId, setselectedId] = useState(1);
    const styles = {
        fontSize: '4vh',
        fontWeight: 'bold',
        color: "red"
    }
    const menuList = [
      {id: 1, name: 'Home', path: '/'},
      // {id: '2', name: 'About', path: '/about'},
      // {id: '3', name: 'Contact', path: '/contact'},
    ]

    const ENS = ()=>{
      return (
        <>
          <img src={logo} alt="ENS Logo" className="rounded"/>
        </>
      )
    }
 
  return (
    <React.Fragment>
        <nav className="navbar navbar-expand-sm navbar-light shadow-sm sticky-top " style={{
          borderBottom: "2px solid #11113D"
        }}>
          <div className="container-fluid pad_navbar">
            <Link to={`/`} className="navbar-brand fw-bold" ><span style={styles}>
            <Tooltip title={<ENS />} placement="right-start" arrow sx={{padding: '5px'}} TransitionComponent={Zoom}>
              <Avatar
              alt="Remy Sharp"
              src={logo}
              sx={{ width: 50, height: 50 }}
            />
            </Tooltip>
            </span>
            </Link>
            {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                {
                  menuList.map((item)=>{
                    return (
                    <li className={`nav-item px-3 ${selectedId===item.id? 'active  text-light fw-bold': ''}`} key={item.id} onClick={()=>setselectedId(()=>{return item.id})} style={{
                      backgroundColor: "#11113D"
                    }}>
                      <Link to={item.path} className={`nav-link ${selectedId===item.id? 'text-light': ''}`} >{item.name}</Link>
                    </li>
                    )
                  })
                }
              </ul>
            </div> */}
          </div>
        </nav>
    </React.Fragment>
  )
}

export default Navbar