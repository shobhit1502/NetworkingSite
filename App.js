import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import './App.css';
import Feed from './components/Feed.js';
import Header from './components/Header.js';
import Sidebar from './components/Sidebar.js';
import Login from './components/Login.js';
import { auth } from './components/Firebase';
import Widgets from './components/Widgets';

export default function App() {
  const user = useSelector(selectUser)

  const dispatch = useDispatch();
  
  useEffect(() => {
    auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        //user is logged in
        dispatch(login({
          email: userAuth.email,
          uid: userAuth.uid,
          displayName: userAuth.displayName,
          photoUrl: userAuth.photoURL,
        }));
      }
      else {
        //user is logged out
        dispatch(logout());
      }
    })
  }, [])

  return (
    <div className="app">
      <Header />

      {!user ? <Login /> :(             //If their is no user, render the login page otherwise the remaining app
        <div className="app_body">
          
          <Sidebar />
          <Feed />
          <Widgets />
        
        </div>
      )}

    </div>
  );
}
