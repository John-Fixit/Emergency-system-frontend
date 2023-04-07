import React, { useState } from "react";
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
import { deepOrange, red } from "@mui/material/colors";
import { Badge } from "@mui/material";
function Sidebar({ children }) {
  const menus = [
    { name: "Dashboard", icon: <RiDashboardLine size={"3.5vh"} />, route: "/org/jdjdj" },
    {
      name: "Messages",
      icon: <TbMessages size={"3.5vh"} />,
      route: "/org/hdhfd/ke",
    },
    { name: "Profile", icon: <VscOrganization size={"3.5vh"} />, route: "/org/" },
    { name: "Settings", icon: <TbSettings size={"3.5vh"} />, route: "/org/jkhi8yu" },
    { name: "Logout", icon: <BiLogOutCircle size={"3.5vh"} />, route: "/org/kjhj" },
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
          <Link to={"/org/jfjj"} className="d-flex gap-2">
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
          <p className="my-auto d-flex gap-2">
            <p className="my-auto text-light ">Emergency System</p>
            <Avatar sx={{ bgcolor: deepOrange[500] }}>ES</Avatar>
          </p>
        </div>
      </div>
      <div className="sidebar_container">
        <div className="sidebar" style={{ width: isOpen ? "300px" : "70px" }}>
          <div >
            {menus.slice(0, -2).map((menu, index) => {
              return (
                <NavLink
                  to={menu.route}
                  className={`link`}
                  activeclassName="active"
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
        <main>{children}</main>
      </div>
    </>
  );
}

export default Sidebar;
