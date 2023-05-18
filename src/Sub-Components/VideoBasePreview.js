import React, { useRef } from 'react'
import { BsFillCameraVideoFill } from 'react-icons/bs'
import Loader from "react-spinners/DotLoader"
function VideoBasePreview({status}) {

  return (
    <div className={`video mx-auto rounded ${status=="idle"|| status=='acquiring_media'? "": "d-none"}`}>
        {
            status=="idle"?
            <BsFillCameraVideoFill size={"5vh"} color="white"/>: status==="acquiring_media"&&
            <Loader color="white" cssOverride={{width: "15%"}}/>
        }
    </div>
  )
}

export default VideoBasePreview