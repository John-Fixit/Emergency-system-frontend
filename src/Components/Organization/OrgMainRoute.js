import React, { useContext, useRef } from "react";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { authorize, loginOrg } from "../../FunctionControllers/loginOrgFunc";
import Dashboard from "./Dashboard";
import Messages from "./Messages";
import { SocketContext, UserDetailContext } from "./StoreContext/UserContext";
import addNotification from "react-push-notification";
import logo from "../../logo.svg";
import ShowMessage from "./ShowMessage";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
function OrgMainRoute() {
  const [user, setUserDetail] = useContext(UserDetailContext);
  const socket = useContext(SocketContext);
  const navigate = useNavigate("");
  const msgRef = useRef();

  React.useEffect(() => {
    socket.on("msgResponse", async (data) => {
      msgRef.current = await data;
      const { category, text, location } = await msgRef.current;
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
        const { user_detail, success, message } = res;
        if (success) {
          await setUserDetail(user_detail);
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
      {/* <Navbar /> */}
      <Routes>
        <Route path="/:id" element={<Outlet />}>
          <Route path="" element={<Dashboard />} />
          <Route path=":cat" element={<Outlet />} >
            <Route path="" element={<Messages newMsg={msgRef} />} />
            <Route path=":msgId" element={<ShowMessage />}/>
          </Route>
        </Route>
        <Route path="/:id/:cat" element={<Messages newMsg={msgRef} />} />
      </Routes>
      </Sidebar>
    </>
  );
}

export default OrgMainRoute;
