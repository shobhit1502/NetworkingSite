import React, { useEffect, useState } from "react";
import "./feed.css";
import InputOption from "./InputOption.js";
import Post from "./Post.js";
import { db } from "./Firebase.js";
import firebase from "firebase";
import CreateIcon from "@material-ui/icons/Create";
import ImageIcon from "@material-ui/icons/Image";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import EventNoteIcon from "@material-ui/icons/EventNote";
import CalendarViewDayIcon from "@material-ui/icons/CalendarViewDay";
import { selectUser } from '../features/userSlice';
import { useSelector } from 'react-redux';
import FlipMove from 'react-flip-move';

export default function Feed() {

  const user = useSelector(selectUser);

  const [inputData, setInput] = useState("");     //Again, we are using it as a variable to store the inputted data
  const [posts, setPosts] = useState([]);         
  //Used to store all the posts

  

  //This block of code:
  //     1. Fetches the posts from the firebase database
  //     2. Maps the docs in snapshot object forming an array having unique id and respective data
  
  
  
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot(                  //Real-Time listener to database
        (
          snapshot                  
        ) =>
          setPosts(
            snapshot.docs.map((doc) => ({   
              id: doc.id,          
              data: doc.data(),
            }))
          )
      );
  }, []); 
  
  
  
  //This block of code:
  //     1. Creates a function to send posts
  //     2. Adds a post in the form of an object{} containing data-value pairs



  const sendPost = (e) => {         //   e signifies an event
    e.preventDefault();

    db.collection("posts").add({        
      name: user.displayName,
      description: user.email,
      message: inputData,
      photoUrl: user.photoUrl || "",
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };


  

  
  
  
  
  return (
    <div className="feed">
      <div className="feed_inputContainer">
        
        <div className="feed_input">
          <CreateIcon />
          <form method="POST">
            {/* Since we want the written message to be posted somewhere */}
            <input
              value={inputData}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Start a post"
            />
            {/* Since we have already set input blank string, we have used onChange which captures anything written and updates input */}
            <button onClick={sendPost} type="submit">Send</button>
          </form>
        </div>
        
        {/* Notice how here we are sending the Icon name and rendering it in other component */}
        <div className="feed_inputOptions">
          <InputOption Icon={ImageIcon} title="Photo" color="#70B5F9" />
          <InputOption Icon={SubscriptionsIcon} title="Video" color="#E7A33E" />
          <InputOption Icon={EventNoteIcon} title="Event" color="#C0CBCD" />
          <InputOption Icon={CalendarViewDayIcon} title="Write Article"color="#7FC15E" />
        </div>
      
      </div>

     
      <FlipMove>
      {posts.map(({ id, data: { name, description, message, photoUrl } }) => (  //Destructuring of the object
        <Post
          key={id} //Here, we are using the id as a unique key
          name={name}
          description={description}
          message={message}
          photoUrl={photoUrl}
        />
      ))}
      </FlipMove>
      
    
    </div>
  );
}
