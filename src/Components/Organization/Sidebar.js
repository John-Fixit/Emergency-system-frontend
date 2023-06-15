import React, { useState } from "react";
import "../../Styles/sidebar.css";
import { FaBars, FaBell} from "react-icons/fa";
import { TbSettings, TbMessages } from "react-icons/tb";
import { RiDashboardLine } from "react-icons/ri";
import { VscOrganization } from "react-icons/vsc";
import { BiLogOutCircle } from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { Badge, Tooltip, Zoom } from "@mui/material";
import { useSelector } from "react-redux";
import NotificationSlide from "../../Sub-Components/NotificationSlide";
import Logout from "./Logout";
import { BsFillReplyAllFill } from "react-icons/bs";
import logo from "../../assets/ENS Logo.png";
function Sidebar({ children }) {
  const userDetail = useSelector((state) => state.user.details);
  const newMessages = useSelector(state=>state.message.newMessages);
  const menus = [
    {
      name: "Dashboard",
      icon: <RiDashboardLine size={"3.5vh"} />,
      route: "/org/",
    },
    {
      name: "Messages",
      icon: <TbMessages size={"3.5vh"} />,
      route: `/org/category/${userDetail ? userDetail.category : "xxxxxx"}`,
    },
    {
      name: "Respond",
      icon: <BsFillReplyAllFill size={"3.5vh"} />,
      route: `/org/${userDetail ? userDetail.category : "xxxxxx"}/responded`,
    },
    {
      name: "Profile",
      icon: <VscOrganization size={"3.5vh"} />,
      route: `/org/profile/${userDetail ? userDetail._id : "xxxxxx"}/us`,
    },
    {
      name: "Settings",
      icon: <TbSettings size={"3.5vh"} />,
      route: `/org/profile/${userDetail ? userDetail._id : "xxxxxx"}/setting`,
    },
    {
      name: "Logout",
      icon: <BiLogOutCircle size={"3.5vh"} />,
      route: `/org/profile/${userDetail ? userDetail._id : "xxxxxx"}/logout`,
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const badgeStyle = {
    "& .MuiBadge-badge": {
      color: "white",
      backgroundColor: "red",
    },
  };

  const ENS = ()=>{
    return (
      <>
        <img src={logo} alt="ENS Logo" className="rounded"/>
      </>
    )
  }

  return (
    <>
      <div className="header">
        <div className="top_section">
          <Link to={"/org/"} className="d-flex gap-2">
        <Tooltip title={<ENS />} placement="right-start" arrow sx={{padding: '5px'}} TransitionComponent={Zoom}>
            <Avatar
              alt="logo"
              src={logo}
              sx={{ width: 50, height: 50 }}
              />
              </Tooltip>
            <h3
              className="logo my-auto"
              style={{ display: isOpen ? "block" : "none", transition: "0.5s" }}
            >
              Emergency System
            </h3>
          </Link>
          <div className={`bars ${isOpen ? "opened_bar" : "notOpened_bar"}`}>
            <FaBars
              size={"3vh"}
              color="white"
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>
        </div>
        <div className="icons_section gap-3 px-3">
          <p className="my-auto" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" style={{cursor: 'pointer'}}>
            <Badge badgeContent={newMessages.length} sx={badgeStyle}>
              <FaBell size={"3vh"} color="white" />
            </Badge>
          </p>
          <div className="my-auto d-flex gap-1">
            <p className="my-auto text-light fw-bold">
              {userDetail ? userDetail.name : "Name"}
            </p>
            <Link
              to={`/org/profile/${userDetail ? userDetail._id : "xxxxxx"}/us`}
            >
              <Avatar sx={{ bgcolor: "red" }}>
              {
                userDetail?.name?
                `${userDetail?.name?.split("")[0]}`:""
              }
              </Avatar>
            </Link>
          </div>
        </div>
      </div>
      <div className="sidebar_container">
        <div className={`sidebar ${isOpen ? "nav-open" : "nav-closed"}`}>
          <div>
            {menus.slice(0, -2).map((menu, index) => {
              return (
                <Tooltip title={menu.name} placement="right-start" arrow sx={{padding: '3px'}} TransitionComponent={Zoom} key={index}>
                <NavLink
                  to={menu.route}
                  className={`link`}
                  activeclassName="active"
                  onClick={() => {
                    if(isOpen){
                      setIsOpen(!isOpen)
                    }
                  }}
                >
                  <div className="icon">{menu.icon}</div>
                  <div
                    className={`link_text`}
                    style={{
                      display: isOpen ? "block" : "none",
                      transition: "0.5s",
                    }}
                  >
                    {menu.name}
                  </div>
                </NavLink>
                </Tooltip>
              );
            })}
          </div>
          <div className="">
            {menus.slice(-2).map((menu, index) => {
              return (
                <Tooltip title={menu.name} placement="right-start" arrow sx={{padding: '3px'}} TransitionComponent={Zoom} key={index}>
                  <NavLink
                    to={menu.route}
                    className={`link`}
                    activeclassName="active"
                    key={Math.random()}
                    onClick={() => {
                      if(isOpen){
                        setIsOpen(!isOpen)
                      }
                    }}
                    data-bs-toggle={menu.name=='Logout'? 'modal': ''} data-bs-target="#exampleModal"
                  >
                    <div className="icon">{menu.icon}</div>
                    <div
                      className="link_text"
                      style={{ display: isOpen ? "block" : "none" }}
                    >
                      {menu.name}
                    </div>
                  </NavLink>
                </Tooltip>
              );
            })}
          </div>
        </div>
        <main
          className={isOpen ? "shift-text" : "noShift-text"}
          style={{ transition: "all 0.5s", marginTop: "2vh" }}
        >
          {children}

        </main>
          <NotificationSlide />
          <Logout />
      </div>
    </>
  );
}

export default Sidebar;
