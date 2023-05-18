import React, { useRef } from 'react'
import { BsFillPlayFill, BsPauseFill, BsPlayBtn, BsRecordBtn, BsStop } from 'react-icons/bs';
import { GiOldMicrophone } from 'react-icons/gi';
import { useReactMediaRecorder } from 'react-media-recorder'
import "../Styles/emergency.css";
import VideoBasePreview from './VideoBasePreview';

function VideoRecord({getVideoRecorded}) {
    const videoRef = useRef(null);
    const {status, startRecording, stopRecording, pauseRecording, resumeRecording, previewStream, mediaBlobUrl} = useReactMediaRecorder({video: true})
    React.useEffect(()=>{
      if (videoRef.current && previewStream) {
        videoRef.current.srcObject = previewStream;
      }
    }, [previewStream])
    if(mediaBlobUrl && status=="stopped"){
      getVideoRecorded(mediaBlobUrl)
    }
    
  return (
    <div>
      <div className='text-center'>
        <video ref={videoRef} controls autoPlay className={`rounded ${status!="recording"? 'd-none': ''}`} style={{height: '10vh'}}/>
        <video src={mediaBlobUrl} controls className={`rounded ${status=="stopped"? '': 'd-none'}`}/>
        <VideoBasePreview status={status}/>
      </div>
    <div className='text-center'>
      {
        status == "recording"?
        <div className='btn-group'>
          <button className="btn btn-warning rounded">
            <BsPauseFill size={"4vh"} />
          </button>
          <button className="btn btn-danger rounded">
            <BsStop size={"4vh"}  onClick={stopRecording}/>
          </button>
        </div>
        :
        status=="paused"?
        <div >
          <button className="btn btn-warning rounded">
           <BsFillPlayFill size={"4vh"} />
          </button>
          <button className="btn btn-danger rounded" onClick={stopRecording}>
            <BsStop size={"4vh"} />
          </button>
        </div>
       :
        status=="idle"||status=="stopped"||status=="acquiring_media"?
        <div >
          <button className="btn btn-danger rounded" onClick={startRecording}>
            <BsRecordBtn size={"4vh"} />
      </button>
          </div>:""
      }
    </div>
    </div>
  )
}

export default VideoRecord