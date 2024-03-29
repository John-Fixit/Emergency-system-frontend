import React, { useContext, useEffect, useState} from "react";
import { sendMsg } from "../../FunctionControllers/sendMsgFunc";
import "../../Styles/emergency.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { getLocation } from "../../FunctionControllers/getUserCurrentLocation";
import { audioRecordComplete } from "../../FunctionControllers/audioRecordComplete";
import { videoRecordComplete } from "../../FunctionControllers/videoRecordComplete";
import Navbar from "../User/Navbar";
import Loader from "react-spinners/ClipLoader";
import DescTemplate from "../../Sub-Components/DescTemplate";
import AudioRecord from "../../Sub-Components/AudioRecord";
import VideoRecord from "../../Sub-Components/VideoRecord";
import Footer from "../Footer";
import { ContextForSocket } from "../Organization/StoreContext/SocketContext";
import ListOfOrgs from "../../Sub-Components/ListOfOrgs";
import useSWR from "swr";
import { baseUrl } from "../../URL";
function Emergency() {
  const socket = useContext(ContextForSocket);
  const [useCurrentLocation, setUseCurrentLocation] = React.useState(null);
  const [newLocation, setnewLocation] = useState('')
  const [details, setdetails] = React.useState({
    category: "",
    text: "",
    audioFile: "",
    videoFile: "",
    location: "",
  });
  const [isSending, setIsSending] = React.useState(false);
  const [resMsg, setResMsg] = React.useState({
    message: '',
    suggestedMeasure: []
  });
  const [responseDialog, setResponseDialog] = React.useState({
    open: false,
    NoError: null,
  });
  const { data, isLoading } = useSWR(`${baseUrl}/org/allOrgs`);
  const toastStyle = {
    theme: "colored",
    delay: 8000,
    autoClose: true,
    draggable: true,
    pauseOnHover: true,
  };

  useEffect(()=>{
    getAddress();
  }, [])

  const handleChange = (e) => {
    if (details.location == "") {
      getAddress();
    }
    setdetails({ ...details, [e.target.name]: e.target.value });
  };

  const getAddress = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      if (position) {
        const { latitude, longitude } = position.coords;
        getLocation(latitude, longitude)
          .then((addressData) => {
            setnewLocation(()=>{return addressData.formatted});
          })
          .catch((err) => {
            toast.error(err.message, toastStyle);
          });
      } else {
        toast.error("Geolocation is not supported in your browser", toastStyle);
      }
    });
  };

  const submit = async () => {
    const { category, text, audioFile, videoFile, location } = details;
    if (handleValidation().status) {
      setIsSending(true);
      sendMsg({ category, text, audioFile, videoFile, location })
        .then(async (res) => {
          const { message, success, data, suggestedMeasure } = res;
          if (success) {
            socket.emit("sendMsg", data);
            setdetails({
              ...details,
              category: "",
              text: "",
              audioFile: "",
              videoFile: "",
              location: "",
            });
            setUseCurrentLocation(false);
          }
          await setResMsg({...resMsg, message, suggestedMeasure});
          setResponseDialog({
            ...responseDialog,
            open: true,
            NoError: success,
          });
        })
        .finally(() => {
          setIsSending(false);
        });
    } else {
      await setResMsg({
        ...resMsg, message: handleValidation().message
      });
      setResponseDialog({ ...responseDialog, open: true, NoError: false });
    }
  };

  const handleValidation = () => {
    if (!!!details.category) {
      return {message: 'Please choose the category of the emergency you want to report!', status: false};
    }
    if(!(!!details.location)){
        return {message: 'Location can not be empty, please provide the location', status: false};
    }
    else {
      return {status: true};
    }
  };

  const getAudioRecorded = (blob) => {
    // const audioFile = audioRecordComplete(blob.blob);
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = function(){
      setdetails({ ...details, audioFile: reader.result });
    }
  };

  const getVideoRecorded = async (mediaBlobUrl) => {
    const blob = await fetch(mediaBlobUrl).then((bl) => bl.blob());
    const videoFile = videoRecordComplete(blob);
    const reader = new FileReader();
    reader.readAsDataURL(videoFile);
    reader.onload = () => {
      setdetails({ ...details, videoFile: reader.result });
    };
  };

  const handleCheckLocation = (e) => {
    if(e.target.checked){
      if(!!!newLocation){
          alert('Network issue, cannot get your location')
        }
        setdetails({...details, location: newLocation})
    }
    setUseCurrentLocation(e.target.checked);
  };

  const handleTemplate = (param) => {
    setdetails({ ...details, text: param });
  };

  const hoverOnUseLocation=()=>{
    if(!!!newLocation){
      alert('Network issue, cannot get your location')
    }
  }
  return (
    <>
      <Navbar />
      <div className="col-12 px-lg-4 px-2">
        <div className="row">
        <div className="col-sm-8 my-3 shadow-sm">
          <div className="row">
            <div className="category col-lg-6 col-md-6 col-sm-12">
              <label htmlFor="">Category of incident</label>
              <FormControl sx={{ m: 2, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="category"
                  value={details.category}
                  label="Category"
                  onChange={(e) =>
                    setdetails({ ...details, category: e.target.value })
                  }
                >
                  <MenuItem value={"Choose category"} disabled selected hidden>
                    Choose Category
                  </MenuItem>
                  <MenuItem value={"Road Accident"}>
                    Road Accident
                  </MenuItem>
                  <MenuItem value={"Fire"}>Fire</MenuItem>
                  <MenuItem value={"Medical"}>Medical</MenuItem>
                  <MenuItem value={"Robbery"}>Robbery</MenuItem>
                  <MenuItem value={"Riot"}>Riot</MenuItem>
                  <MenuItem value={"Natural Disaster"}>Natural Disaster</MenuItem>
                </Select>
                <FormHelperText>
                  Select the Category of your Organization
                </FormHelperText>
              </FormControl>
            </div>
            {/* Location */}
            <div className="location col-sm-6">
              {useCurrentLocation ? (
                ""
              ) : (
                <div className="provide_location">
                  <label htmlFor="">
                    Enter the exact location of the Emergency
                  </label>
                  <textarea
                    rows="2"
                    cols="5"
                    name="location"
                    className="form-control textArea my-2"
                    placeholder="Location of the incident..."
                    value={details.location}
                    onChange={(e) => handleChange(e)}
                  ></textarea>
                </div>
              )}
              <div className="device_location" >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={!!useCurrentLocation}
                      onChange={handleCheckLocation}
                      onMouseEnter={hoverOnUseLocation}
                    />
                  }
                  label="Use my current location"
                />
              </div>
            </div>
            <div className="col-12">
              <label htmlFor="">
               (Optional Information) 
              </label><br />
              <DescTemplate handleTemplate={handleTemplate} />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 text_desc_area my-2">
              <label htmlFor="">Description</label>
              <textarea
                rows="3"
                cols="10"
                name="text"
                className="form-control textArea"
                placeholder="More description of the incident..."
                value={details.text}
                onChange={(e) => handleChange(e)}
              ></textarea>
            </div>

          {/* voice record */}
          <div className="col-lg-6 col-md-6 col-sm-12 voice_desc_area my-2 media_record">
            <label htmlFor="">
              Use voice record
            </label>
              <AudioRecord getAudioRecorded={getAudioRecorded} />
          </div>
          <div className="video_desc_area border-0 card my-2 shadow">
            <div className="take_video">
              <label htmlFor="" className="text-center">
                Take a Video record
              </label>
              <VideoRecord getVideoRecorded={getVideoRecorded} />
            </div>
          </div>
        </div>
          <button
              className="btn submitBtn px-5 text-center float-end rounded btn-danger d-flex gap-2"
              onClick={() => submit()}
            >
              {
                <p className="my-auto">
                  <Loader loading={isSending} size={20} color={"white"} />
                </p>
              }
              Send 
            </button>
        </div>
        <ListOfOrgs allOrg={data?.data.result} isLoading={isLoading} />
      </div>
      </div>
      <Dialog
        open={responseDialog.open}
        onClose={() => false}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onKeyPress={(e) => {
          e.key == "Enter" &&
            setResponseDialog({ ...responseDialog, open: false });
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          className={`${
            responseDialog.NoError ? "text-success" : "text-danger"
          }`}
        >
          {"Response: Notification! Notification!! Notification!!!"}
        </DialogTitle>
        <DialogContent className="text-center">
          <DialogContentText
            id="alert-dialog-description"
            className={`form-control ${
              responseDialog.NoError
                ? "is-valid text-success"
                : "is-invalid text-danger"
            }`}
          >
            {resMsg.message}
          </DialogContentText>
          {
            resMsg.suggestedMeasure?.length ?
            <div className="my-2 px-lg-3 text-danger" style={{listStyleType: 'circle'}}>
              <ul className="text-start">
                <p className="fw-bold text-uppercase">Take Note of the following:</p>
                {
                  resMsg.suggestedMeasure?.map((msg, index)=>{
                    return(
                      <li key={index}>{msg}</li>
                      )
                    })
                }
              </ul>
            </div>: ''
          }
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              setResponseDialog({ ...responseDialog, open: false })
            }
            autoFocus
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer
        bodyStyle={{
          theme: "colored",
          delay: 8000,
          autoClose: true,
          draggable: true,
          pauseOnHover: true,
        }}
      />
      <Footer />
    </>
  );
}
export default Emergency;
