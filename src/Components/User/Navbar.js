import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "../../Styles/navbar.css"

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
        <nav className="navbar navbar-expand-sm navbar-light shadow-sm">
          <div className="container-fluid pad_navbar">
            <Link to={`/`} className="navbar-brand fw-bold" ><span style={styles}>E.N.S</span>
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                {
                  menuList.map((item)=>{
                    return (
                    <li className={`nav-item px-2 ${selectedId===item.id? 'active bg-primary text-light': ''}`} key={item.id} onClick={()=>setselectedId(()=>{return item.id})}>
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