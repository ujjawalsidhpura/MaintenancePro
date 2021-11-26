import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from "react";
import axios from "axios";

export default function Chat(props) {
  const { messages, setApplicationData, socket } = props;
  const { user } = useAuth0();
  const [message, setMessage] = useState({ name: user && user.name, message: '' });

  useEffect(() => {

    socket.on('message', ({ message }) => {
      axios.get('/messages')
        .then((res) => {
          setApplicationData(prev => ({
            ...prev, messages: [...res.data]
          }))
        });
    })
  }, [setApplicationData, socket]);

  const renderHistoryChat = messages.map((message, index) => {
    return (
      <div key={index} className="chat-all-user">
        {user && user.name === message.name ?
          <div className="chat-user">
            <div className="bubble"><h3>{message.name}: <span>{message.message}</span></h3></div>
          </div>
          :
          <div className="chat-other-user">
            <div className="bubble"><h3>{message.name}: <span>{message.message}</span></h3></div>
          </div>}
      </div>
    )
  }).reverse()




  const handleChange = (event) => {
    user && setMessage({ ...message, [event.target.name]: event.target.value, name: user.name })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/messages', message,
      { headers: { "Content-Type": "application/json" } }
    ).then(res => {
      axios.get('/messages')
        .then((res) => {
          setApplicationData(prev => ({
            ...prev, messages: [...res.data]
          }))
          socket.emit('message', { message });
          user && setMessage({ message: '', name: user.name });
        })
    }).catch(err => {
      console.log("message err", err);
    })

  }



  return (
    <div className='chat-container'>
      <form className="card chat-form">
        <div className="form-content">

          <div className="field">
            <label className="label">{user && user.name}</label>
            <input
              className="input"
              placeholder="Lets chat"
              name="message"
              onChange={e => handleChange(e)}
              value={message.message}
            />
          </div>
          <button className="button is-link submit" type="submit" onClick={e => handleSubmit(e)}>Send</button>
        </div>
        <div className="form-image">
          <img src="https://image.freepik.com/free-vector/illustration-characters-fixing-cogwheel_53876-40796.jpg" alt="form" />
        </div>
      </form>
      <div className="chat-box">
        {renderHistoryChat}
      </div>
    </div>
  )
}