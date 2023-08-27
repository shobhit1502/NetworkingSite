import React from "react";
import "./header.css";
import HeaderOption from "./HeaderOption.js";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import ChatIcon from "@material-ui/icons/Chat";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Logo from "../images/linkedin.png";
import { useDispatch } from "react-redux";
import { logout } from "../features/userSlice";
import { auth } from "./Firebase";

export default function Header() {

  const dispatch = useDispatch();

  const logoutOfApp = () => {
    dispatch(logout());
    auth.signOut();
  };


  return (
    <div className="Header">
      <div className="header_left">
        <img src={Logo} alt="Logo" />
        
        <div className="header_search">
          <SearchIcon />
          <input placeholder="Search" type="text" />
        </div>
      </div>

      <div className="header_right">
          <HeaderOption Icon={HomeIcon} title='Home' />
          <HeaderOption Icon={SupervisorAccountIcon} title='My Network' />
          <HeaderOption Icon={BusinessCenterIcon} title='Jobs' />
          <HeaderOption Icon={ChatIcon} title='Messaging' />
          <HeaderOption Icon={NotificationsIcon} title='Notification' />
          <HeaderOption avatar={true} title='Me' onClick={logoutOfApp} />
      </div>
    </div>
  );
}
