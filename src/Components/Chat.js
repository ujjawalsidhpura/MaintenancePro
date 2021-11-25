import io from "socket.io-client";
import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from "react";
export default function Chat() {
  const { user } = useAuth0();

  const [message, setMessage] = useState({message: '', name: user && user.name});

  const [log, setLog] = useState([]);

  const ENDPOINT='http://localhost:3001';
  let socket = io(ENDPOINT, { 
    withCredentials: true,
    extraHeaders: {
      "my-custom-header": "abcd"
    }
  });;

  const renderChat = log.map(({ message, name }, index) => {
    return  <div key={index}>
        <h3>
          {name}: <span>{message}</span>
        </h3>
      </div>
    })
    

  console.log(log);


  const handleChange = (event) =>{
    setMessage({...message, [event.target.name]: event.target.value, name: user&&user.name})
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // setLog(prev => [...prev, message]);
    socket.emit('message', {message});
    setMessage({message: '', name: ''});
  }



  useEffect(() => {
    socket.on('message', ({ message }) => {
      setLog(prev => [...prev, message]);
    })
  },[])

  return(
    <div className='chat-container'>
    <div className='card'>
    {renderChat}
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
    </div>
    </div>
  )
}