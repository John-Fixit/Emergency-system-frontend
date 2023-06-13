import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "../../Styles/navbar.css"
import { Avatar } from '@mui/material';

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

 
  return (
    <React.Fragment>
        <nav className="navbar navbar-expand-sm navbar-light shadow-sm sticky-top border-bottom border-danger border-2">
          <div className="container-fluid pad_navbar">
            <Link to={`/`} className="navbar-brand fw-bold" ><span style={styles}>
              <Avatar
              alt="Remy Sharp"
              src={require("../../assets/ENS Logo.png")}
              sx={{ width: 50, height: 50 }}
            />
            </span>
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                {
                  menuList.map((item)=>{
                    return (
                    <li className={`nav-item px-3 ${selectedId===item.id? 'active bg-primary text-light fw-bold': ''}`} key={item.id} onClick={()=>setselectedId(()=>{return item.id})}>
                      <Link to={item.path} className={`nav-link ${selectedId===item.id? 'text-light': ''}`} >{item.name}</Link>
                    </li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
        </nav>
    </React.Fragment>
  )
}

export default Navbar