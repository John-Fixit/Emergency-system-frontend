import React, { useEffect } from "react";
import { sendMsg } from "../../FunctionControllers/sendMsgFunc";
import "../../Styles/emergency.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { getPosition } from "../../FunctionControllers/getUserCurrentLocation";
import { useAudioRecorder, AudioRecorder } from "react-audio-voice-recorder";
import { audioRecordComplete } from "../../FunctionControllers/audioRecordComplete";
import { ReactMediaRecorder } from "react-media-recorder";
import VideoPreview from "../../Pages/VideoPreview";
import { videoRecordComplete } from "../../FunctionControllers/videoRecordComplete";
function Emergency() {
  const recordingControls = useAudioRecorder();

  const [useCurrentLocation, setUseCurrentLocation] = React.useState(null);
  const [details, setdetails] = React.useState({
    category: "",
    text: "",
    audioFile: "",
    videoFile: "",
    location: "",
  });
  const [control, setControl] = React.useState("stop");

  const toastStyle = {
    theme: "colored",
    delay: 8000,
    autoClose: true,
    draggable: true,
    pauseOnHover: true,
  };

  const handleChange = (e) => {
    setdetails({ ...details, [e.target.name]: e.target.value });
  };

  getPosition();

  const submit = () => {
    const { category, text, audioFile, videoFile, location } = details;
    if (handleValidation()) {
      // if(!(!!details.location)){

      // }

      sendMsg({ category, text, audioFile, videoFile, location })
        .then((res) => {
          if (res.code) {
            console.log(res)
            toast.error(
              `${res.message}: please check your internet connection immidiately!!!`,
              toastStyle
            );
          } else {
            const { message, success } = res.data;
            success
              ? toast.success(message, toastStyle)
              : toast.error(message, toastStyle);
          }
        })
        .catch((err) => {
          toast.error(
            `${err.message}: please check your internet immidiately!!!`,
            toastStyle
          );
        });
    } else {
      toast.error("Please choose the category of the emergency!!", toastStyle);
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
  
  const getVideoRecorded = async(mediaBlobUrl) => {
    const blob = await fetch(mediaBlobUrl).then((bl)=>bl.blob());
    const videoFile =  videoRecordComplete(blob);
    const reader = new FileReader();
    reader.readAsDataURL(videoFile);
    reader.onload = () => {
      //error handling...
      setdetails({ ...details, videoFile: reader.result });
    };
  };



  const handleCheck = (e) => {
    setUseCurrentLocation(e.target.checked);
    console.log(e.target.checked);
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

  return (
    <>
      <button className="btn btn-danger" onClick={getPosition()}>
        Location
      </button>
      <div className="col-sm-5">
        <div className="category">
          <Typography component="h1" variant="h5">
            Category of incident
          </Typography>
          <FormControl sx={{ m: 2, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="category"
              value={details.category}
              label="Category"
              onChange={(e) => handleChange(e)}
            >
              <MenuItem value={""}>Choose Category</MenuItem>
              <MenuItem value={"vehicleAccident"}>Vehicle Accident</MenuItem>
              <MenuItem value={"fireAccident"}>Fire Accident</MenuItem>
              <MenuItem value={"robbery"}>Robbery</MenuItem>
              <MenuItem value={"riot"}>Riot</MenuItem>
            </Select>
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
            <textarea
              rows="10"
              cols="30"
              name="text"
              className="form-control textArea"
              placeholder="Describe more..."
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
                  // calling function videoRecordComplete to convert to video file
                  if(mediaBlobUrl){
                    getVideoRecorded(mediaBlobUrl)
                   
                  }
                  return (
                    <div>
                      {
                        status==="recording"?"": <video src={mediaBlobUrl} controls />
                      }
                     
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
                          <div style={{width: "6vh", height: "6vh", background: "red"}} className="rounded-circle align-items-center d-flex">
                          <p className="text-light mx-auto my-auto">REC</p>
                      </div>
                          
                        ) : (
                          <div style={{width: "6vh", height: "6vh", background: "red"}} className="rounded-circle align-items-center d-flex">
                          <p style={{width: "3vh", height: "3vh"}} className="bg-light rounded-circle mx-auto my-auto"></p>
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

          <div className="">
            <label htmlFor="">Enter the exact location of the Emergency</label>
            <input
              type="text"
              name="location"
              onChange={(e) => handleChange(e)}
              className="form-control"
            />

            <div className="device_location">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={useCurrentLocation}
                    onChange={handleCheck}
                  />
                }
                label="Use my current location"
              />
            </div>
          </div>
        </div>
        <div className="submitContent">
          <button className="btn submitBtn btn-danger" onClick={() => submit()}>
            Submit
          </button>
        </div>
      </div>

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
