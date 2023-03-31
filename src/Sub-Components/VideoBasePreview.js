import React, { useRef } from 'react'
import { BsFillCameraVideoFill } from 'react-icons/bs'
import Loader from "react-spinners/DotLoader"
function VideoBasePreview({status}) {
    const loading = useRef(null);
    console.log(status);

  return (
    <div className='video mx-auto rounded'>
        {
            loading.current?
            <BsFillCameraVideoFill size={"5vh"} color="white"/>:
            <Loader loading={true} color="white" cssOverride={{width: "15%"}}/>
        }
    </div>
  )
}

export default VideoBasePreview