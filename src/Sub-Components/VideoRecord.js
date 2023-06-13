import React, { useRef } from 'react'
import { BsFillPlayFill, BsPauseFill, BsPlayBtn, BsRecordBtn, BsStop } from 'react-icons/bs';
import { GiOldMicrophone } from 'react-icons/gi';
import { BiVideoRecording } from 'react-icons/bi';
import { useReactMediaRecorder } from 'react-media-recorder'
import "../Styles/emergency.css";
import VideoBasePreview from './VideoBasePreview';

function VideoRecord({getVideoRecorded}) {
    const videoRef = useRef(null);
    const {status, startRecording, stopRecording, previewStream, mediaBlobUrl} = useReactMediaRecorder({video: true})
    React.useEffect(()=>{
      if (videoRef.current && previewStream) {
        console.log(videoRef.current)
        videoRef.current.srcObject = previewStream;
      }
    }, [previewStream])
    if(mediaBlobUrl && status=="stopped"){
      getVideoRecorded(mediaBlobUrl)
    }
  return (
    <div className="py-3">
    <label htmlFor="" className="fw-bold border-start border-primary border-3 text-danger">
              Video record <sup><BiVideoRecording className="text-primary" size={20}/></sup>
      </label>
      <div className='text-center mx-auto'>
        <video ref={videoRef} autoPlay className={`video mx-auto rounded ${status!="recording"? 'd-none': ''}`} />
        <video src={mediaBlobUrl} controls className={`rounded video mx-auto ${status=="stopped"? '': 'd-none'}`}/>
        <VideoBasePreview status={status}/>
      </div>
    <div className='text-center'>
      {
        status == "recording"?
        <div className='btn-group'>
          <button className="btn btn-danger rounded">
            <BsStop size={"4vh"}  onClick={stopRecording} />
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