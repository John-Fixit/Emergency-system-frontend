import React, { useContext, useState } from "react";
import "../../Styles/sidebar.css";
import {
  FaBars,
  FaBell,
  FaEnvelope,
} from "react-icons/fa";
import {TbSettings, TbMessages} from "react-icons/tb"
import {RiDashboardLine} from "react-icons/ri"
import {VscOrganization} from "react-icons/vsc"
import {BiLogOutCircle} from "react-icons/bi"
import { Link, NavLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { Badge } from "@mui/material";
import { UserDetailContext } from "./StoreContext/UserContext";
function Sidebar({ children }) {
    const [userDetail, setUserDetail] = useContext(UserDetailContext);
  const menus = [
    { name: "Dashboard", icon: <RiDashboardLine size={"3.5vh"} />, route: "/org/" },
    {
      name: "Messages",
      icon: <TbMessages size={"3.5vh"} />,
      route: `/org/category/${userDetail? userDetail.category: "xxxxxx"}`,
    },
    { name: "Profile", icon: <VscOrganization size={"3.5vh"} />, route: `/org/profile/${userDetail? userDetail._id: "xxxxxx"}/me`},
    { name: "Settings", icon: <TbSettings size={"3.5vh"} />, route: `/org/profile/${userDetail? userDetail._id: "xxxxxx"}/setting`},
    { name: "Logout", icon: <BiLogOutCircle size={"3.5vh"} />, route: `/org/profile/${userDetail? userDetail._id: "xxxxxx"}/logout` },
  ];
  
  const [isOpen, setIsOpen] = useState(false);
  const badgeStyle = {
    "& .MuiBadge-badge": {
        color: 'white',
    backgroundColor: 'red',
    }
  }


  return (
    <>
      <div className="header">
        <div className="top_section">
          <Link to={"/org/"} className="d-flex gap-2">
            <Avatar
              alt="Remy Sharp"
              src={require("../../assets/logo.png")}
              sx={{ width: 50, height: 50 }}
            />
            <h3
              className="logo my-auto"
              style={{ display: isOpen ? "block" : "none", transition: "0.5s" }}
            >
              Emergency System
            </h3>
          </Link>
          <div className={`bars ${isOpen ? "opened_bar" : "notOpened_bar"}`}>
            <FaBars size={"3vh"} color="white" onClick={() => setIsOpen(!isOpen)} />
          </div>
        </div>
        <div className="icons_section gap-3 px-3">
          <p className="my-auto">
            <Badge badgeContent={4} sx={badgeStyle} >
                <FaEnvelope size={"3vh"} color="white"/>
            </Badge>
          </p>
          <p className="my-auto">
            <Badge badgeContent={6} sx={badgeStyle}>
              <FaBell size={"3vh"} color="white" />
            </Badge>
          </p>
          <div className="my-auto d-flex gap-1">
            <p className="my-auto text-light fw-bold">{userDetail? userDetail.name: "Name"}</p>
            <Link to={`/org/profile/${userDetail? userDetail._id: "xxxxxx"}/me`}>
              <Avatar sx={{ bgcolor: "red" }}></Avatar>
            </Link>
          </div>
        </div>
      </div>
      <div className="sidebar_container">
        <div className={`sidebar ${isOpen?"nav-open":"nav-closed"}`} >
          <div >
            {menus.slice(0, -2).map((menu, index) => {
              return (
                <NavLink
                  to={menu.route}
                  className={`link`}
                  activeclassName="active"
                  key={index}
                >
                  <div className="icon">{menu.icon}</div>
                  <div
                    className={`link_text`}
                    style={{ display: isOpen ? "block" : "none", transition: "0.5s" }}
                  >
                    {menu.name}
                  </div>
                </NavLink>
              );
            })}
          </div>
          <div className="">
          {menus.slice(-2).map((menu, index) => {
              return (
                <NavLink
                  to={menu.route}
                  className={`link`}
                  activeclassName="active"
                  key={Math.random()}
                >
                  <div className="icon">{menu.icon}</div>
                  <div
                    className="link_text"
                    style={{ display: isOpen ? "block" : "none" }}
                  >
                    {menu.name}
                  </div>
                </NavLink>
              );
            })}
          </div>
        </div>
        <main className={isOpen? 'shift-text': 'noShift-text'} style={{transition: "all 0.5s", marginTop: "2vh"}}>
          {children}
        </main>
      </div>
    </>
  );
}

export default Sidebar;
