import React, { useRef } from 'react'
import { BsRecordBtn, BsStop } from 'react-icons/bs';
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
    if(mediaBlobUrl && status==="stopped"){
      getVideoRecorded(mediaBlobUrl)
    }
  return (
    <div className="py-3">
    <label htmlFor="" className="fw-bold ens_text-danger mb-2 ps-2" style={{
      // borderLeft: "3px solid #11113D"
    }}>
              Video record <span><BiVideoRecording className="ens_text-primary" size={20}/></span>
      </label>
      <div className='text-center mx-auto'>
        <video ref={videoRef} autoPlay className={`video mx-auto rounded ${status!=="recording"? 'd-none': ''}`} />
        <video src={mediaBlobUrl} controls className={`rounded video mx-auto ${status==="stopped"? '': 'd-none'}`}/>
        <VideoBasePreview status={status}/>
      </div>
    <div className='text-center mt-2'>
      {
        status === "recording"?
        <div className='btn-group'>
          <button className="btn ens_bg-danger text-white rounded">
            <BsStop size={"4vh"}  onClick={stopRecording} />
          </button>
        </div>
       :
        status==="idle"||status==="stopped"||status==="acquiring_media"?
        <div >
          <button className="btn ens_bg-danger text-white rounded" onClick={startRecording}>
            <BsRecordBtn size={"4vh"} />
      </button>
          </div>:""
      }
    </div>
    </div>
  )
}

export default VideoRecord