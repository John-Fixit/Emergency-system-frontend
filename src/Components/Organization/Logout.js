import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  return (
    <>
      <div className="modal fade" id="exampleModal" tabIndex="-1" >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel"></h5>
            </div>
            <div className="modal-body">
             <h5>Are you sure you want to logout?</h5>
             <button className="btn btn-secondary" data-bs-dismiss='modal'>Cancel</button>
             <button className="btn btn-danger" data-bs-dismiss="modal" onClick={()=>{
              localStorage.removeItem('org_token')
              navigate('/login')
              }}>Confirm</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Logout;
