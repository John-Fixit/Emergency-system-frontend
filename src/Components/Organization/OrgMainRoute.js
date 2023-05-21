import React, { useContext, useRef, useState } from "react";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { authorize } from "../../FunctionControllers/loginOrgFunc";
import Dashboard from "./Dashboard";
import Messages from "./Messages";
import addNotification from "react-push-notification";
import logo from "../../logo.svg";
import ShowMessage from "./ShowMessage";
import Sidebar from "./Sidebar";
import Profile from "./Profile";
import Settings from "./Settings";
import Logout from "./Logout";
import { useDispatch, useSelector } from "react-redux";
import { usersActions } from "../../store/userSlice";
import { messageActions } from "../../store/messageSlice";
import { ContextForSocket} from "./StoreContext/SocketContext";
import useSWR from 'swr';
import { baseUrl } from "../../URL";
import RespondedMessages from "./RespondedMessages";
import tone from '../../assets/alarm1.mp3';

const audio = new Audio(tone);
// audio.loop
function OrgMainRoute() {
  const socket = useContext(ContextForSocket);
  const navigate = useNavigate("");
  const msgRef = useRef();
  const audioRef = useRef();
  const dispatch = useDispatch();
  //getting all messages from the ser
  const category = useSelector(state=>state.user.details.category)
  const {data, error, isLoading} = useSWR(`${baseUrl}/msg/${category}`, {refreshInterval: 1000});
  const [arrived, setarrived] = useState(false)
  dispatch(messageActions.setTotalMessage({data: data?.data.allMessage, error, isLoading}))
  const startAlart=()=>{
    audio.loop = true
    audio.play()
    // return audioRef.current.play()
    // audio.currentTime = 0;
    // document.getElementById('myAudio')
  }
  const stopAlert =()=>{
    // audio.current.pause()
    setarrived(false)
    audioRef.current.pause()
    // audio.currentTime = 0;
  }
  React.useEffect(() => {
    socket.on("msgResponse", async (data) => {
      msgRef.current = await data;
      setarrived(true)
      startAlart();
      const { message: {text}, location } = await msgRef.current;
      dispatch(messageActions.addNewMessage(msgRef.current));
      if (!!text) {
        addNotification({
          title: "Emergency system",
          message: `Message: ${text} Location: ${location}`,
          duration: 4000,
          icon: logo,
          native: true,
        });
      }
    });
  }, [socket]);

  React.useEffect(() => {
    if (localStorage.org_token) {
      let token = JSON.parse(localStorage.getItem("org_token"));
      authorize({ token }).then(async (res) => {
        const { user_detail, success } = res;
        if (success) {
          await dispatch(usersActions.updateDetail(user_detail))
          socket.emit("signIn", {
            category: user_detail.category,
            id: socket.id,
          });
        } else {
          // navigate("/login");
        }
      });
    } else {
      // navigate("/login");
    }
  }, []);


  return (
    <>
     <Sidebar >
      {/* <button onClick={startAlart}></button> */}
      {/* <audio loop={true} ref={audioRef} src={tone}/> */}
      {
        !audio.paused&& arrived&&
        <button className="btn btn-danger float-end" onClick={()=>stopAlert()}>Stop Alert</button>
      }
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route path="" element={<Dashboard />} />
          <Route path="category" element={<Outlet />} >
            <Route path=":category" element={<Outlet />} >
              <Route path="" element={<Messages newMsg={msgRef} />} />
              <Route path=":msgId" element={<ShowMessage />}/>
            </Route>
          </Route>
          <Route path=":category/responded" element={<RespondedMessages />} />
          <Route path="profile" element={<Outlet />}>
            <Route path=":id" element={<Outlet />}>
              <Route path="me" element={<Profile />}/>
              <Route path="setting" element={<Settings />}/>
              <Route path="logout" element={<Logout />}/>
            </Route>
          </Route>
        </Route>
      </Routes>
      </Sidebar>
    </>
  );
}

export default OrgMainRoute;

