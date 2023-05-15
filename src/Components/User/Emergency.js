import React, { useContext, useEffect, useRef} from "react";
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
  const [details, setdetails] = React.useState({
    category: "",
    text: "",
    audioFile: "",
    videoFile: "",
    location: "",
  });
  const [isSending, setIsSending] = React.useState(false);
  const [resMsg, setResMsg] = React.useState("");
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
            console.log(addressData.formatted);
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
      setIsSending(true);
      sendMsg({ category, text, audioFile, videoFile, location })
        .then(async (res) => {
          const { message, success, data } = res;
          console.log(success)
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
          await setResMsg(message);
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
      await setResMsg(
        `Please choose the category of the emergency you want to report!`
      );
      setResponseDialog({ ...responseDialog, open: true, NoError: false });
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
    const audioFile = audioRecordComplete(blob.blob);
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

  const handleCheckLocation = (e) => {
    setUseCurrentLocation(e.target.checked);
    getAddress();
  };

  const handleTemplate = (param) => {
    setdetails({ ...details, text: param });
  };

  
  return (
    <>
      <Navbar />
      <div className="col-12 px-lg-4 px-2">
        <div className="row">
        <div className="col-md-8 my-3 mx-aut shadow-sm">
          <div className="submitContent">
            <button
              className="btn submitBtn btn-danger d-flex gap-2"
              onClick={() => submit()}
            >
              {
                <p className="my-auto">
                  <Loader loading={isSending} size={20} color={"white"} />
                </p>
              }
              Submit
            </button>
          </div>
          <div className="row">
            <div className="category col-sm-6">
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
                  onChange={(e) =>
                    setdetails({ ...details, category: e.target.value })
                  }
                >
                  <MenuItem value={"Choose category"} disabled selected hidden>
                    Choose Category
                  </MenuItem>
                  <MenuItem value={"vehicleAccident"}>
                    Vehicle Accident
                  </MenuItem>
                  <MenuItem value={"fireAccident"}>Fire Accident</MenuItem>
                  <MenuItem value={"robbery"}>Robbery</MenuItem>
                  <MenuItem value={"riot"}>Riot</MenuItem>
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
              <div className="device_location">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={!!useCurrentLocation}
                      onChange={handleCheckLocation}
                    />
                  }
                  label="Use my current location"
                />
              </div>
            </div>
            <div className="text_desc_area">
              <Typography component="h1" variant="h5">
                Add more description of the incident (Optional)
              </Typography>
              <DescTemplate handleTemplate={handleTemplate} />
              <textarea
                rows="3"
                cols="10"
                name="text"
                className="form-control textArea my-2"
                placeholder="More of description of the incident..."
                value={details.text}
                onChange={(e) => handleChange(e)}
              ></textarea>
            </div>
          </div>

          {/* voice record */}
          <div className="voice_desc_area card my-3 p-2 border-0 shadow media_record">
            <h4 className="card-title">Use Voice Record</h4>
            <label htmlFor="">
              Use voice record for more description of the incident
            </label>
            <div>
              <AudioRecord getAudioRecorded={getAudioRecorded} />
            </div>
          </div>
          <div className="video_desc_area border-0 card my-3 p-2 shadow">
            <Typography component="h1" variant="h5">
              Add Video for more description
            </Typography>
            <div className="take_video">
              <label htmlFor="">
                Take video coverage for more description about the urgent
                incident:{" "}
              </label>
              <VideoRecord getVideoRecorded={getVideoRecorded} />
            </div>
          </div>

          <div className="submitContent">
            <button
              className="btn submitBtn btn-danger d-flex gap-2"
              onClick={() => submit()}
            >
              {
                <p className="my-auto">
                  <Loader loading={isSending} size={20} color={"white"} />
                </p>
              }
              Submit
            </button>
          </div>
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
            {resMsg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              setResponseDialog({ ...responseDialog, open: false })
            }
            autoFocus
          >
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
      <Footer />
    </>
  );
}
export default Emergency;
