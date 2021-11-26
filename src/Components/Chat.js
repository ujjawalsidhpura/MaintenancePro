import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from "react";
import axios from "axios";
import ScrollToBottom from './ScrollToBottom';

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
      <div key={index} className="chat-all-user">
        {user && user.name == message.name ?
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
				window.scrollTo(100, 10000);
        socket.emit('message', {message});
        user && setMessage({message: '', name: user.name});
      })
    }).catch(err => {
      console.log("message err", err);
    })
    
  }

  return(
    <div className='chat-container'>
			<ScrollToBottom>
				<div className="chat-box">
					{renderHistoryChat}
				</div>
			</ScrollToBottom>
    	<form className="card chat-form" onSubmit={e=>handleSubmit(e)}>
    		<input 
    		  className="input"
    		  placeholder="Lets chat"
    		  name="message"
    		  onChange={e=>handleChange(e)}
    		  value={message.message}
    		/>
					<a className="send" type="submit" onClick={e=>handleSubmit(e)}>
						{/* Send */}
						<img src="https://img.icons8.com/external-kmg-design-flat-kmg-design/32/000000/external-send-user-interface-kmg-design-flat-kmg-design.png"/>
					</a>
    	</form>
    </div>
  )
}