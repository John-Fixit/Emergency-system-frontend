import React, { Component, useRef } from "react";
import AudioReactRecorder, { RecordState } from "audio-react-recorder";
import "../Styles/emergency.css";
import {GiOldMicrophone} from "react-icons/gi"
import {BsPauseFill, BsStop, BsFillPlayFill} from "react-icons/bs"
import {RiUserVoiceLine} from "react-icons/ri"
function AudioRecord({getAudioRecorded}) {
  const [recordState, setrecordState] = React.useState(null);
  const [audioBlobUrl, setaudioBlobUrl] = React.useState(null)
  const start = () => {
    setrecordState(() => {
      return RecordState.START;
    });
  };

  const stop = () => {
    setrecordState(() => {
      return RecordState.STOP;
    });
  };
  const pause = () => {
    setrecordState(() => {
      return RecordState.PAUSE;
    });
  };
  const audioUrl = useRef()
  const onStop = (data) => {
    setaudioBlobUrl(()=>{return data})
    audioUrl.current = data.url
    getAudioRecorded(data.blob)
  };
  return (
    <div className="text-center bg-white border-0 shadow-sm rounded py-1">
      <label htmlFor="" className="fw-bold border-start border-primary border-3 text-danger">
              Voice record <sup><RiUserVoiceLine className="text-primary" size={20}/></sup>
      </label>
      {
        audioBlobUrl && recordState=="stop" &&
      <p>New Record</p>
      }
      <div className="row">
        <AudioReactRecorder state={recordState} onStop={onStop} canvasHeight={30} canvasWidth={340} foregroundColor="brown"/>
        <div>
          {
            audioBlobUrl && recordState=="stop" &&  <audio src={audioUrl.current} controls style={{height: '10px'}}/>
          }
        </div>
      </div>
      {
        recordState == "start"?
        <div >
          <button className="btn btn-warning rounded-circle" onClick={()=>pause()}>
            <BsPauseFill size={"4vh"} />
          </button>
          <button className="btn btn-danger rounded-circle" onClick={()=>stop()}>
            <BsStop size={"4vh"} />
          </button>
        </div>
        :
        recordState=="pause"?
        <div >
          <button className="btn btn-warning rounded-circle" onClick={()=>start()}>
           <BsFillPlayFill size={"4vh"} />
          </button>
          <button className="btn btn-danger rounded-circle" onClick={()=>stop()}>
            <BsStop size={"4vh"} />
          </button>
        </div>
       :
        recordState==null||recordState=="stop"?
        <div >
          <button className="btn btn-danger rounded-circle" onClick={()=>start()}>
            <GiOldMicrophone size={"4vh"} />
          </button>
          </div>:""
      }

    </div>
  );
}

export default AudioRecord;