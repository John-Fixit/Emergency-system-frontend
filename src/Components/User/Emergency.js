
import React, { useState } from "react";
import { sendMsg } from "../../FunctionControllers/sendMsg";
import "../../Styles/emergency.css";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Emergency() {
  const [category, setcategory] = useState("");
  const [location, setlocation] = useState("");
  const [details, setdetails] = useState({
    category: "",
    text: "",
    location: "",
  });


const toastStyle = {theme: "colored", delay: 8000, autoClose: true, draggable: true, pauseOnHover: true};

  const handleChange = (e) => {
    setdetails({ ...details, [e.target.name]: e.target.value });
  };

  const submit = () => {
    const { category, text, location } = details;
    // let loc = navigator.geolocation.getCurrentPosition((position)=>{
    //     console.log(position)
    // })

    if(handleValidation()){

      if(!(!!details.location)){
        //get the current location of the user
      }


      sendMsg({category, text, location}).then((res)=>{
        if(res.code){
          toast.error(`${res.message}: please check your internet immidiately!!!`, toastStyle)
        }
        else{
          const {message, success} = res.data
          success?
            toast.success(message, toastStyle):
            toast.error(message, toastStyle)
        }
      }).catch((err)=>{
        toast.error(`${err.message}: please check your internet immidiately!!!`, toastStyle)
      });
    }
    else{
      toast.error("Please choose the category of the emergency!!", toastStyle);
    }

  };
  const handleValidation = () => {
    if(!(!!details.category)){
        return false;
    }
    else{
      return true
    }
  };

  return (
    <>
   
      <div className="col-sm-5" >
        <div className="category">
          <label htmlFor="">Emergency Category</label>
          <select
            className="form-control"
            name="category"
            onChange={(e) => handleChange(e)}
          >
            <option value="">Choose Category</option>
            <option value="vehicleAccident">Vehicle Accident</option>
            <option value="fireAccident">Fire Accident</option>
            <option value="robbery">Robbery</option>
            <option value="riot">Riot</option>
          </select>
        </div>
        <div className="content my-2">
          <div className="text_desc_area">
            <textarea
              rows="10"
              cols="30"
              name="text"
              className="form-control"
              onChange={(e) => handleChange(e)}
            ></textarea>
          </div>
          <div className="voice_desc_area">
            <label htmlFor="">
              Use voice record for more description of the incident
            </label>
          </div>
          <div className="video_desc_area">
            <label htmlFor="">
              Take video coverage for more description about the urgent
              incident:{" "}
            </label>
          </div>

          <div className="">
            <label htmlFor="">Enter the exact location of the Emergency</label>
            <input
              type="text"
              name="location"
              onChange={(e) => handleChange(e)}
              className="form-control"
            />

            <div className="device_location">
              <label htmlFor="">Use my current location</label>{" "}
              <input type="checkbox" className="form-check-input"/>
            </div>
          </div>
        </div>
        <div className="submitContent">
          <button className="btn submitBtn btn-danger" onClick={() => submit()}>
            Submit
          </button>
        </div>
      </div>

      <ToastContainer bodyStyle={{theme: "colored", delay: 8000, autoClose: true, draggable: true, pauseOnHover: true}}/>
    </>
  );
}

export default Emergency;
