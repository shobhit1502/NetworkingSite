import React, { useState } from 'react';
import './login.css';
import Logo from '../images/linkedin_full.png';
import { auth } from './Firebase';
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';

export default function Login() {

    const [name, setName] = useState("");              //These states are declared so as to tell if anything is entered in the field or not
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profilePic, setProfile] = useState("");

    const dispatch = useDispatch();

    
    const loginToApp = (e) => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(email, password)
        .then(userAuth => {
            dispatch(login({                                //An object containing all the details will be dispatched which will be replaced by null value currently held by the user in userSlice
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: userAuth.user.displayName,
                profileUrl: userAuth.user.photoURL,
            }))
        }).catch(error => alert(error));    
    };
    
    
    
    const register = () => {
        if (!name) {
            return alert("PLEASE ENTER A VALID NAME!");
        }

        auth.createUserWithEmailAndPassword(email, password)
        .then((userAuth) => {
            userAuth.user.updateProfile({
                displayName: name,
                photoURL: profilePic,
            })
            .then(() => {
                dispatch(login({
                    email: userAuth.user.email,
                    uid: userAuth.user.uid,
                    displayName: name,
                    photoUrl: profilePic 
                }));
                //This whole object is been passed to the user
            });
        }).catch(error => alert(error));
    };

    

  return <div className='login'>
      <img src={Logo} alt="" />

      <form onSubmit={loginToApp}>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder='Full name (required if registering)' type="text" required/>
          
          <input value={profilePic} onChange={(e) => setProfile(e.target.value)} placeholder='Profile pic URL (optional)' type="text" />
      
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' type="email" required/>

          <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' type="password" required/>

          <input type="submit" value="Sign In" className='login_submit'/>
      </form>

      <p>Not a member?{" "}
          <span className='login_register' onClick={register}>Register Now</span>
      </p>
  </div>;
}
