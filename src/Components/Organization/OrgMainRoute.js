import React, { useContext, useRef } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { loginOrg } from "../../FunctionControllers/loginOrgFunc";
import Dashboard from "./Dashboard"
import Messages from "./Messages";
import { SocketContext, UserDetailContext } from "./StoreContext/UserContext";
function OrgMainRoute() {
  const [user, setUserDetail] = useContext(UserDetailContext)
  const socket = useContext(SocketContext)
  const navigate = useNavigate("");
  const msgRef = useRef();
  
  React.useEffect(()=>{
      socket.on("msgResponse", (data)=>{
        msgRef.current = data
        console.log(msgRef.current)
      })
  }, [socket])

  React.useEffect(()=>{
    if(localStorage.email){
        let email = JSON.parse(localStorage.getItem("email"));
        loginOrg({email}).then(async(res)=>{
          const {user_detail, success, message} = res;
            if(success){
                await setUserDetail(user_detail);
                socket.emit("signIn", {category: user_detail.category, id: socket.id})
            }else{
              navigate('/login');
           }
        })
    } else{
      navigate('/login');
   }

  }, [])

  return (
    <>
      <Routes>
        <Route path="/:id" element={<Dashboard />}/>
        <Route path="/:id/:cat" element={<Messages />}/>
      </Routes>
    </>
  );
}

export default OrgMainRoute;
