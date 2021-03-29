
import './App.css';
import React, { useEffect, useState } from 'react'
import { Button , FormControl, InputLabel , Input } from '@material-ui/core';
import Message from './Components/Message';
import db from './Components/firebase';
import firebase from 'firebase';
import {FiSend} from 'react-icons/fi';
import {MdWbSunny} from 'react-icons/md';
import {BsMoon} from 'react-icons/bs';
import { IconButton } from '@material-ui/core'

function App() {

  const [input, setInput] = useState('');
  const [msgs, setmsg] = useState([]);
  const [username, setUsername] = useState('');
  const [bg, setBg] = useState("dark");
  const [iconcol, seticoncol] = useState("lighticon");

  useEffect(() => {
    db.collection("messages").orderBy("timestamp","desc").onSnapshot(snapshot => {
      setmsg((snapshot.docs.map(doc => ({
        id: doc.id , 
        data: doc.data()
      }))))
    })
  }, [])

  //listener
  useEffect(() => {
    setUsername(prompt("Please enter your name"));
  }, []);

  const changeInput = (e) => {
    setInput(e.target.value);
  }

  const onButtonClick = (e) => {
    e.preventDefault();

    db.collection("messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('');
  }

  const handlelightColor = () => {
    setBg("light"); 
    seticoncol("darkicon");
  }

  const handledarkColor = () => {
    setBg("dark"); 
    seticoncol("lighticon");
  }

  return (
    <div className={`${bg}`}>
      <div className="App">
        <h1 className={`${iconcol}`}>Welcome {`${username || "Unknown User"}`}</h1>
        <MdWbSunny className={`${iconcol}`} onClick={handlelightColor} />
        <BsMoon className={`${iconcol}`} onClick={handledarkColor} />
        <form className="app__form">
          <FormControl className="app__formControl">
            {/* input field */}
            <Input className="app__input" value={input} placeholder="Enter a message..." onChange={changeInput} />

            {/* button */}
            <IconButton className="icon__btn" disabled={!input} variant="contained" color="primary" onClick={onButtonClick}>
              <FiSend />
            </IconButton>
          </FormControl>
        </form>

        {/* messages - jsx(html + js) */}
        {
          msgs.map(({id , data}) => {
            return <Message key={id} username={username} text={data}/>
          })
        }

      </div>
    </div>
  );
}

export default App;
