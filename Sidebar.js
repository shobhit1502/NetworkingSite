import React from 'react';
import "./sidebar.css";
import { Avatar } from "@material-ui/core";
import Wall from "../images/wallpaper.jpg";
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

export default function Sidebar() {

    const user = useSelector(selectUser);


    //Here, we are not using a reusable component since we just want to return JSX
    const recentItem = (topic) => (
        <div className="sidebar_recentItem">
            <span className='sidebar_hash'>#</span>
            <p>{topic}</p>
        </div>
    )

    return (
        <div className='sidebar'>
            <div className="sidebar_top">
                <img src={Wall} alt="" className='sidebar_top_image'/>
                <Avatar src={user.photourl} className='sidebar_avatar'>{user.displayName[0]}</Avatar>
                <h2>{user.displayName}</h2>
                <h4>{user.email}</h4>
            </div>

            <div className="sidebar_stats">
                <div className="sidebar_stat">
                    <p>Who viewed you</p>
                    <p className="sidebar_statNumber">2,543</p> 
                </div>
                <div className="sidebar_stat">
                    <p>Views on post</p>
                    <p className="sidebar_statNumber">2,448</p>
                </div>
            </div>

            <div className="sidebar_bottom">
                <p>Recent</p>
                {recentItem('reactjs')}
                {recentItem('programming')}
                {recentItem('software engineering')}
                {recentItem('design')}
                {recentItem('developer')}
            </div>
        </div>
    )
}


