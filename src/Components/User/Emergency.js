import React, { useEffect } from "react";
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
import { useAudioRecorder, AudioRecorder } from "react-audio-voice-recorder";
import { audioRecordComplete } from "../../FunctionControllers/audioRecordComplete";
import { ReactMediaRecorder } from "react-media-recorder";
import VideoPreview from "../../Pages/VideoPreview";
import { videoRecordComplete } from "../../FunctionControllers/videoRecordComplete";
import Navbar from "../Navbar";
import Loader from "react-spinners/ClipLoader"
import DescTemplate from "../../Pages/DescTemplate";
function Emergency({socket}) {
  const recordingControls = useAudioRecorder();
  React.useEffect(()=>{
   
})

  const [useCurrentLocation, setUseCurrentLocation] = React.useState(null);
  const [details, setdetails] = React.useState({
    category: "",
    text: "",
    audioFile: "",
    videoFile: "",
    location: "",
  });
  const [responseDialog, setResponseDialog] = React.useState({
    open: false,
    NoError: null
  });
  
  const [control, setControl] = React.useState("stop");
  const [isLoading, setIsLoading] = React.useState(false);
  const [resMsg, setResMsg] = React.useState("")
  const toastStyle = {
    theme: "colored",
    delay: 8000,
    autoClose: true,
    draggable: true,
    pauseOnHover: true,
  };

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
            setdetails({ ...details, location: addressData.formatted });
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
    if (handleValidation()) {
      setIsLoading(true);
      sendMsg({ category, text, audioFile, videoFile, location })
        .then(async(res) => {
            const { message, success } = res;
            await setResMsg(message)
            setResponseDialog({...responseDialog, open: true, NoError: success})
            if(success){
              setdetails({...details, category: "", text: "", audioFile: "", videoFile: "", location: ""});
              setUseCurrentLocation(false)
            }
           
        })
        .finally(()=>{
          setIsLoading(false);
        });
    } else {
     await setResMsg(`Please choose the category of the emergency you want to report!`)
      setResponseDialog({...responseDialog, open: true, NoError: false})
    }
  };
  

  const handleValidation = () => {
    if (!!!details.category) {
      return false;
    } else {
      return true;
    }
  };

  const getAudioRecorded = (blob) => {
    const audioFile = audioRecordComplete(blob);
    const reader = new FileReader();
    reader.readAsDataURL(audioFile);
    reader.onload = () => {
      setdetails({ ...details, audioFile: reader.result });
    };
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

  const handleCheck = (e) => {
    setUseCurrentLocation(e.target.checked);
    getAddress();
  };

  //video
  const videoControl = ({ startRecording, stopRecording }) => {
    if (control === "stop") {
      startRecording();
      setControl("start");
    } else if (control === "start") {
      stopRecording();
      setControl("stop");
    }
  };

  const handleTemplate=(param)=>{
      setdetails({...details, text: param})
  }

  return (
    <>
      <Navbar />
      <div className="col-sm-5 mx-3">
        <div className="category">
          <Typography component="h1" variant="h5">
            Category of incident
          </Typography>
          <FormControl sx={{ m: 2, minWidth: 120 }}>
            {/* <InputLabel id="demo-simple-select-label">Category</InputLabel> */}
            {/* <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="category"
              // value={details.category}
              label="Category"
              onChange={(e) => setdetails({...details, 'category': e.target.value})}
            >
              <MenuItem value={""}>Choose Category</MenuItem>
              <MenuItem value={"vehicleAccident"}>Vehicle Accident</MenuItem>
              <MenuItem value={"fireAccident"}>Fire Accident</MenuItem>
              <MenuItem value={"robbery"}>Robbery</MenuItem>
              <MenuItem value={"riot"}>Riot</MenuItem>
            </Select> */}
            <select   
              name="category"
              value={details.category}
              label="Category"
              onChange={(e) => setdetails({...details, 'category': e.target.value})}
              className="form-control"
            >
            <option value={"Choose Category"}>Choose Category</option>
              <option value={"vehicleAccident"}>Vehicle Accident</option>
              <option value={"fireAccident"}>Fire Accident</option>
              <option value={"robbery"}>Robbery</option>
              <option value={"riot"}>Riot</option>
            </select>
            <FormHelperText>
              Select the Category of your Organization
            </FormHelperText>
          </FormControl>
        </div>
        <div className="content my-2">
          <div className="text_desc_area">
            <Typography component="h1" variant="h5">
              More description of the incident (Optional)
            </Typography>
            <DescTemplate handleTemplate={handleTemplate}/>
            <textarea
              rows="10"
              cols="30"
              name="text"
              className="form-control textArea"
              placeholder="Describe more..."
              value={details.text}
              onChange={(e) => handleChange(e)}
            ></textarea>
          </div>
          <div className="voice_desc_area">
            <Typography component="" variant="h5">
              Use Voice Record
            </Typography>
            <label htmlFor="">
              Use voice record for more description of the incident
            </label>
            <div>
              <AudioRecorder
                onRecordingComplete={getAudioRecorded}
                recorderControls={recordingControls}
              />
              <button
                className="btn btn-primary"
                onClick={recordingControls.stopRecording}
              >
                Stop
              </button>
            </div>
          </div>
          <div className="video_desc_area">
            <Typography component="h1" variant="h5">
              Add Video for more description
            </Typography>
            <div className="take_video">
              <label htmlFor="">
                Take video coverage for more description about the urgent
                incident:{" "}
              </label>
              <ReactMediaRecorder
                video
                blobPropertyBag={{ type: "video/webm" }}
                render={({
                  previewStream,
                  startRecording,
                  status,
                  stopRecording,
                  mediaBlobUrl,
                }) => {
                  if (mediaBlobUrl) {
                    getVideoRecorded(mediaBlobUrl);
                  }
                  return (
                    <div>
                      {status === "recording" ? (
                        ""
                      ) : (
                        <video src={mediaBlobUrl} controls />
                      )}

                      {mediaBlobUrl ? (
                        ""
                      ) : (
                        <VideoPreview stream={previewStream} />
                      )}
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          videoControl({
                            startRecording,
                            stopRecording,
                          })
                        }
                      >
                        {status != "recording" ? (
                          <div
                            style={{
                              width: "6vh",
                              height: "6vh",
                              background: "red",
                            }}
                            className="rounded-circle align-items-center d-flex"
                          >
                            <p className="text-light mx-auto my-auto">REC</p>
                          </div>
                        ) : (
                          <div
                            style={{
                              width: "6vh",
                              height: "6vh",
                              background: "red",
                            }}
                            className="rounded-circle align-items-center d-flex"
                          >
                            <p
                              style={{ width: "3vh", height: "3vh" }}
                              className="bg-light rounded-circle mx-auto my-auto"
                            ></p>
                          </div>
                        )}
                      </button>
                    </div>
                  );
                }}
              />
            </div>
            {/* <div className="upload_video">
          <label htmlFor="">
              Already have the video coverage for more description about the
              incident:{" "}
            </label>
            ///
          </div> */}
          </div>

          <div className="location">
            {useCurrentLocation ? (
              ""
            ) : (
              <div className="provide_location">
                <label htmlFor="">
                  Enter the exact location of the Emergency
                </label>
                <input
                  type="text"
                  name="location"
                  onChange={(e) => handleChange(e)}
                  className="form-control"
                  value={details.location}
                />
              </div>
            )}

            <div className="device_location">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!!useCurrentLocation}
                    onChange={handleCheck}
                  />
                }
                label="Use my current location"
              />
            </div>
          </div>
        </div>
        <div className="submitContent">
          <button className="btn submitBtn btn-danger d-flex gap-2" onClick={() => submit()}>
            {
            <p className="my-auto">
              <Loader loading={isLoading} size={20} color={'white'}/>
            </p>
            }
            Submit
          </button>
        </div>
      </div>

      <Dialog
        open={responseDialog.open}
        onClose={()=>false}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className={`${responseDialog.NoError? "text-success": "text-danger"}`}>
          {"Response: Notification! Notification!! Notification!!!"}
        </DialogTitle>
        <DialogContent className="text-center">
          <DialogContentText id="alert-dialog-description" className={`form-control ${responseDialog.NoError? "is-valid text-success": "is-invalid text-danger"}`}>
            {resMsg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setResponseDialog({...responseDialog, open: false})} autoFocus>
            Agree
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
    </>
  );
}

export default Emergency;


