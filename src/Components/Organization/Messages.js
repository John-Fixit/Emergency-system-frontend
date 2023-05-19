import React, { useRef } from "react";
import Loader from "react-spinners/PropagateLoader"
import TimeAgo from "react-timeago";
import "../../Styles/messages.css"
import { useSelector } from "react-redux";
function Messages() {
  const allMsg = useRef({});
  const {data, error, isLoading} = useSelector(state=>state.message.fetchMessages)
  allMsg.current = data
  if(isLoading){
    return <>
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
      <div className="msg_section_container">
        <div
          className={`message_section col-lg-8 col-md-11 col-sm-12 mx-auto shadow p-2`}
        >
          <div className={`message_header`}>
            <h2 className="card-header rounded text-light text-center p-2" style={{backgroundColor: 'red'}}>All Alert Messages</h2>
          </div>
          <div className={`message_body`}>
            {[...allMsg.current].reverse().map((msg, index) => {
              return (
                <div
                  className="rounded my-2 w-lg-25 w-md-50 p-2 bg-light shadow"
                  key={index}
                >
                   <div className="d-flex gap-2">
                      <p className="fw-bold">message: </p>
                      <p className="">{msg.message.text}</p>
                      </div>
                  <div className={`${!!(msg.message.audio)?"": "d-none"}`}>
                     <audio src={msg.message.audio} controls />
                  </div>
                  <div className={`${!!(msg.message.video)?"": "d-none"}`}>
                      <video width="270px" height="200px" src={msg.message.video} controls />
                    </div>
                    <div className="d-flex gap-2">
                      <p className="fw-bold">Location: </p>
                      <p className="">{msg.location}</p>
                      </div>
                      <div className="d-flex gap-2">
                        <p className="fw-bold">Time: </p>
                        <p className="">
                          {
                            msg.dateCreated
                        + " "}
                        <TimeAgo date={msg.createdAt}/>
                        </p>
                      </div>
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
