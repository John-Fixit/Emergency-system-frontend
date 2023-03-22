import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../URL";
import Navbar from "./Navbar";
import useSWR from "swr";
import Loader from "react-spinners/PropagateLoader"
import TimeAgo from "timeago-react";
import "../../Styles/messages.css"
function Messages({newMsg}) {
  const route = useParams("");
  const allMsg = useRef({});
useEffect(()=>{
  if(newMsg.current){
    allMsg.current = [...allMsg.current, newMsg.current]
  }
}, [newMsg]);

  const { cat } = route;
  const { data, error, isLoading } = useSWR(`${baseUrl}/org/${cat}`, {refreshInterval: 1000}); 
  allMsg.current = data?.data.allMessage

  if(isLoading){
    return <>
     <Navbar />
     <div className="mx-auto text-center">
        <Loader cssOverride={{margin: "auto"}} color="red"/>
     </div>
    </>
  }

  if(error){
    return <>
    <h1>Error</h1>
    </>
  }



  return (
    <React.Fragment>
      <Navbar />
      <div className="msg_section_container">
        <div
          className={`message_section col-lg-8 col-md-11 col-sm-12 mx-auto shadow p-2`}
        >
          <div className={`message_header`}>
            <h1>Messages</h1>
          </div>
          <div className={`message_body`}>
            {[...allMsg.current].reverse().map((msg, index) => {
              return (
                <div
                  className="rounded my-2 w-lg-25 w-md-50 w-sm-199 p-2 text-light bg-danger"
                  key={index}
                >
                  <p>message: {msg.message.text}</p>
                  <div className={`${!!(msg.message.audio)?"": "d-none"}`}>
                     <audio src={msg.message.audio} controls />
                  </div>
                  <div className={`${!!(msg.message.video)?"": "d-none"}`}>
                      <video width="270px" height="200px" src={msg.message.video} controls />
                    </div>
                  <p>Location: {msg.location}</p>
                  <p>Time: 
                    {
                      msg.dateCreated
                  + " "}
                  <TimeAgo datetime={msg.createdAt} locale="en-US"/>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Messages;
