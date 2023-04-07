import React, { Component } from "react";
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

  const onStop = (data) => {
    setaudioBlobUrl(()=>{return data})
    getAudioRecorded(data.blob)
  };
  return (
    <div>

      <p>New Record</p>
      <div className="row">
        <AudioReactRecorder state={recordState} onStop={onStop} canvasHeight={200} canvasWidth={340} foregroundColor="brown"/>
        <div>
          <audio src="blob:http://localhost:3000/4e5deb22-7c54-4ac9-aa02-923595dbc6f0" controls />
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