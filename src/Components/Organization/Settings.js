import React from "react";
import OrgHeader from "../../Sub-Components/OrgHeader";
import { FaPencilAlt, FaUserAlt } from "react-icons/fa";
import {useSelector} from "react-redux";
import {useFormik} from "formik";
function Settings() {
  const org_detail = useSelector(state=>state.user.details)

  const formik = useFormik({
    initialValues: {
        name: org_detail?.name ?? "",
        email: org_detail?.email ?? "",
        mobile: org_detail?.mmobile ?? "",
        category: org_detail?.category ?? "",
        location: org_detail?.location ?? "",
        description: org_detail?.description ?? "",
        websiteLink: org_detail?.websiteLink ?? "",
    },
    onsubmit: (values)=>{
      console.log(values);
    }
  })
  return (
    <>
      <OrgHeader page={"Profile Setting"} />
      <hr/>
      <form onSubmit={formik.handleSubmit}>
        <button className="btn btn-danger px-3 float-end">Save Profile</button>
      <div className="row">
        <div className="col-12 row my-3">
          <div className="col-sm-2 p-3 text-end">
            <label htmlFor="">Your Logo</label>
          </div>
          <div className="col-3 p-2 mx-3 text-center" style={{ border: "2px dashed blue" }}>
              <FaUserAlt
                size={"12vh"}
                color="blue"
                className="border border-danger rounded-circle p-2"
                />
                {/* <img src="" alt="profile image" /> */}
              <label htmlFor="file">
                <input type="file" id="file" className="d-none"/>
                <span className="text-primary" style={{cursor: 'pointer'}}>Choose File</span>
              </label>
          </div>
        </div>
        <div className="col-10 mx-auto my-5 row">
          <div className="col-sm-6">
            <label htmlFor="">Organization Name</label>
            <div className="">
              <input
                type="text"
                name=""
                placeholder="Organization Name"
                className="form-control"
                value={formik.values.name}
              />
            </div>
          </div>
          <div className="col-sm-6">
            <label htmlFor="">Organization Email</label>
            <div className="">
              <input
                type="email"
                name=""
                placeholder="Organization Email"
                disabled
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="col-10 mx-auto row my-5">
          <div className="col-sm-6">
            <label htmlFor="">Organization Address</label>
            <div className="">
              <textarea rows="3" cols="5" placeholder="Address" className="form-control" style={{resize: "none"}}></textarea>
            </div>
          </div>
          <div className="col-sm-6">
            <label htmlFor="">Organization Description</label>
            <div className="">
              <textarea rows={'3'} cols={'5'} className="form-control" placeholder="Organizationn Description" style={{resize: "none"}}></textarea>
            </div>
          </div>
        </div>
      </div>
              
      </form>
    </>
  );
}

export default Settings;
