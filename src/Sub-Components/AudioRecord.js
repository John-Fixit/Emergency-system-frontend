import React, { Component, useRef } from "react";
import AudioReactRecorder, { RecordState } from "audio-react-recorder";
import "../Styles/emergency.css";
import {GiOldMicrophone} from "react-icons/gi"
import {BsPauseFill, BsStop, BsFillPlayFill} from "react-icons/bs"
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
    <div className="text-center border rounded">
      <p>New Record</p>
      <div className="row">
        
        <AudioReactRecorder state={recordState} onStop={onStop} canvasHeight={200} canvasWidth={340} foregroundColor="brown"/>
        <div>
          {
            !audioBlobUrl||recordState=="recording"?"":
            <audio src={audioUrl.current} controls />
          }
        </div>
      </div>
      {
        recordState == "start"?
        <div >
          <button className="btn btn-warning rounded" onClick={()=>pause()}>
            <BsPauseFill size={"4vh"} />
          </button>
          <button className="btn btn-danger rounded" onClick={()=>stop()}>
            <BsStop size={"4vh"} />
          </button>
        </div>
        :
        recordState=="pause"?
        <div >
          <button className="btn btn-warning rounded" onClick={()=>start()}>
           <BsFillPlayFill size={"4vh"} />
          </button>
          <button className="btn btn-danger rounded" onClick={()=>stop()}>
            <BsStop size={"4vh"} />
          </button>
        </div>
       :
        recordState==null||recordState=="stop"?
        <div >
          <button className="btn btn-danger rounded" onClick={()=>start()}>
            <GiOldMicrophone size={"5vh"} />
          </button>
          </div>:""
      }

    </div>
  );
}

export default AudioRecord;