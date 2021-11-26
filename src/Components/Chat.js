import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from "react";
import axios from "axios";

export default function Chat(props) {
  const { messages, setApplicationData, socket } = props;
  const { user } = useAuth0();
  user && console.log("user",user.name);
  const [message, setMessage] = useState({name: user && user.name, message: ''});

  useEffect(() => {

    socket.on('message', ({ message }) => {
      axios.get('/messages')
      .then((res) => {
        setApplicationData(prev => ({
          ...prev, messages:[...res.data]
        }))
      });
    })
  },[]);

    const renderHistoryChat = messages.map((message, index) => {
      return  (
      <div key={index}>
        {user && user.name == message.name ?
          <h3>
          I am typing  {message.name}: <span>{message.message}</span>
          </h3>
        :
        <h3>
          Others are typing  {message.name}: <span>{message.message}</span>
        </h3>}
        </div>
      )
      }).reverse()
    



  const handleChange = (event) =>{
    user && setMessage({...message, [event.target.name]: event.target.value, name: user.name})
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/messages', message,
      {headers:{ "Content-Type": "application/json" }}
    ).then(res => {
      axios.get('/messages')
      .then((res) => {
        setApplicationData(prev => ({
          ...prev, messages:[...res.data]
        }))
      })
    }).catch(err => {
      console.log("message err", err);
    })
    socket.emit('message', {message});
    user && setMessage({message: '', name: user.name});
  }



  return(
    <div className='chat-container'>
    <div className='card'>
    <form>
      <div className="name-field">
      <h1>{user && user.name}</h1>
       <input 
         name="message"
         onChange={e=>handleChange(e)}
         value={message.message}
       />
      </div>
      <button onClick={e=>handleSubmit(e)}>submit</button>
    </form>
    {renderHistoryChat}
    </div>
    </div>
  )
}