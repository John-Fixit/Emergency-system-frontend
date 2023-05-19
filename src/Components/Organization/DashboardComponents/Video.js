import React, {useRef, useState} from "react";
import {
  AiFillBackward,
  AiFillForward,
  AiFillPlayCircle,
  AiFillPauseCircle
} from "react-icons/ai";
import '../../../Styles/video.css'
function Video({url}) {
    const videoRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [videoTime, setVideoTime] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [progress, setProgress] = useState(0);
    const videoHandler = (control) => {
        if (control === "play") {
          videoRef.current.play();
          setPlaying(true);
          var vid = document.getElementById("video1");
          setVideoTime(vid.duration);
        } else if (control === "pause") {
          videoRef.current.pause();
          setPlaying(false);
        }
      };

      const fastForward = () => {
        videoRef.current.currentTime += 5;
      };
    
      const revert = () => {
        videoRef.current.currentTime -= 5;
      };


      window.setInterval(function () {
        setCurrentTime(videoRef.current?.currentTime);
        setProgress((videoRef.current?.currentTime / videoTime) * 100);

      }, 1000);
    
  return (
    <>
      <video
       id="video1"
    ref={videoRef}
    className="video"
    src={url}
 ></video>
      <div className="controlsContainer">
        <div className="controls">
          <AiFillBackward className="controlsIcon" size={"3vh"} color={'white'} onClick={revert}/>
          {
            playing?
            <AiFillPauseCircle className="controlsIcon--small" size={"3vh"} color={'white'} onClick={() => videoHandler("pause")}/>:
            <AiFillPlayCircle className="controlsIcon--small" size={"3vh"} color={'white'} onClick={() => videoHandler("play")}/>
          }
          <AiFillForward className="controlsIcon" size={"3vh"} color={'white'} onClick={fastForward}/>
        </div>
        <div className="timecontrols">
          <p className="controlsTime">{Math.floor(videoTime / 60) + ":" + ("0" + Math.floor(videoTime % 60)).slice(-2)}</p>
          <div className="time_progressbarContainer">
            <div style={{ width: "40%" }} className="time_progressBar"></div>
          </div>
          <p className="controlsTime">
            {Math.floor(currentTime / 60) + ":" + ("0" + Math.floor(currentTime % 60)).slice(-2)}
        </p>

        </div>
      </div>
    </>
  );
}

export default Video;
