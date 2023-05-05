import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  return (
    <>
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel"></h5>
            </div>
            <div class="modal-body">
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
