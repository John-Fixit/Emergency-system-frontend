import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import "../../Styles/navbar.css";
import { UserDetailContext } from './StoreContext/UserContext';
function Navbar() {

    const [userDetail, setUserDetail] = useContext(UserDetailContext);

  return (
   <React.Fragment>
    <nav className="navbar navbar-expand-lg navbar-light bg-primary px-3">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link to={`/org/${userDetail&& userDetail._id}`}className="navbar-brand" href="#">ESemergency system</Link>
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to={`/org/${userDetail&& userDetail._id}`}className="nav-link" aria-current="page" href="#">Home</Link>
            </li>
            <li className="nav-item">
              <Link to={`/org/${userDetail&& userDetail._id}/${userDetail&& userDetail.category}`}className="nav-link" href="#">Messages</Link>
            </li>
          </ul>
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
   </React.Fragment>
  )
}

export default Navbar