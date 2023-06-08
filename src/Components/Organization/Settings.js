import React, { useEffect } from "react";
import OrgHeader from "../../Sub-Components/OrgHeader";
import { FaPencilAlt, FaUserAlt } from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import { useParams } from "react-router-dom";
import { getOrgDetailAction, updateOrgAction } from "../../store/userSlice";
import Loader from "react-spinners/DotLoader"
import { Avatar } from "@mui/material";
function Settings() {
  const org_detail = useSelector(state=>state.user.details)
  const {loading, appErr} = useSelector(state=>state.user.updateOrgDetail)
  const dispatch = useDispatch()
  const router = useParams();
  const orgId = router.id
  useEffect(()=>{
    dispatch(getOrgDetailAction(orgId))
  }, [])
  const formik = useFormik({
    initialValues: {
        name: org_detail?.name ?? "",
        email: org_detail?.email ?? "",
        mobile: org_detail?.mobile ?? "",
        location: org_detail?.location ?? "",
        description: org_detail?.description ?? "",
        websiteLink: org_detail?.websiteLink ?? "",
    },
    enableReinitialize: true,
    onSubmit: (values)=>{
      const {name, email, mobile, location, description, websiteLink} = values;
      dispatch(updateOrgAction({orgId, name, email,  mobile, location, description, websiteLink}))
    }
  })
  return (
    <>
      <OrgHeader page={"Edit Profile"} />
      <hr/>
      <form onSubmit={formik.handleSubmit}>
        
      <div className="row">
        <div className="col-12 row my-3">
          <div className="col-sm-2 p-3 text-end">
            <label htmlFor="">Your Avatar</label>
          </div>
          <div className="col-sm-3 w-auto p-2 mx-3 text-center rounded" style={{ border: "2px dashed red" }}>
                <Avatar sx={{bgcolor: "blue", height:"15vh", width: "15vh", fontSize: "8vh", fontWeight: "bold"}}>
                {
                  org_detail?
                `${org_detail?.name?.split(" ")[0].split("")[0]}${
                  org_detail?.name?.split(" ")[1].split("")[0]
                }`:""
              }
                </Avatar>
                {/* <img src="" alt="profile image" /> */}
              {/* <label htmlFor="file">
                <input type="file" id="file" className="d-none"/>
                <span className="text-primary" style={{cursor: 'pointer'}}>Choose File</span>
              </label> */}
          </div>
        </div>
        <div className="col-lg-10 col-sm-12 mx-auto my-2 row">
          <div className="col-sm-6">
            <label htmlFor="">Organization Name</label>
            <div className="">
              <input
                type="text"
                name="name"
                placeholder="Organization Name"
                className="form-control"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </div>
          </div>
          <div className="col-sm-6">
            <label htmlFor="">Email</label>
            <div className="">
              <input
                type="email"
                name="email"
                placeholder="Organization Email"
                className="form-control"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </div>
          </div>
          <div className="col-sm-6 my-3">
            <label htmlFor="">Mobile</label>
            <div className="">
              <input
                type="text"
                pattern="\d*"
                name="mobile"
                placeholder="Organization Mobile"
                className="form-control"
                value={formik.values.mobile}
                onChange={formik.handleChange}
              />
            </div>
          </div>
          <div className="col-sm-6 my-3">
            <label htmlFor="">Website Link</label>
            <div className="">
              <input
                type="url"
                name="websiteLink"
                placeholder="Website Link here"
                className="form-control"
                value={formik.values.websiteLink}
                onChange={formik.handleChange}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-10 mx-auto row my-3">
          <div className="col-sm-6">
            <label htmlFor="">Address</label>
            <div className="">
              <textarea rows="3" cols="5" placeholder="Address" className="form-control" name="location" style={{resize: "none"}} onChange={formik.handleChange}  value={formik.values.location}></textarea>
            </div>
          </div>
          <div className="col-sm-6">
            <label htmlFor="">Description</label>
            <div className="">
              <textarea rows={'3'} cols={'5'} className="form-control" placeholder="Organizationn Description" name="description" onChange={formik.handleChange} style={{resize: "none"}}  value={formik.values.description}></textarea>
            </div>
          </div>
        </div>
      </div>
      <div className="text-end sticky-bottom">
        <button className="btn btn-danger px-3" type="submit">
          {
            loading?
            <Loader loading={loading} color="white" size={"4vh"}/>:
          "Save Profile"
          }
          </button>
        </div>
      </form>
    </>
  );
}

export default Settings;
