import { useAuth0 } from '@auth0/auth0-react';
import { Routes, Route } from 'react-router-dom'
import WorkOrderContainer from "./WorkOrderContainer";
import WorkOrderForm from "./WorkOrderForm";
import Start_confirmation from "./Start_confirmation";
import Finish_confirmation from "./Finish_confirmation";
import Today from './Today';
import InventoryContainer from './InventoryContainer';
import InventoryForm from "./InventoryForm";
import Summary from "./Summary";
import Chat from "./Chat";
import welcomeLogo from '../images/welcomeLogo.jpeg';


export default function Container(props) {
	const { inventory, today, workorder, setApplicationData, messages, socket } = props
  const { isAuthenticated } = useAuth0();

  return (
    <div>
      {!isAuthenticated &&
        <div className="cover" >
          <img id="landing-image" src={welcomeLogo} alt="Building"></img>
        </div>
      }
				<Routes>
					<Route path="/workorders" element={<WorkOrderContainer workorder={workorder}/>} />
					<Route path="/workorders/create" element={<WorkOrderForm setApplicationData={setApplicationData} today={today} inventory={inventory}/>} />
          <Route path="/start-confirmation" element={<Start_confirmation setApplicationData={setApplicationData} today={today} inventory={inventory}/>} /> 
          <Route path="/finish-confirmation" element={<Finish_confirmation setApplicationData={setApplicationData} today={today} inventory={inventory}/>} /> 
          <Route path="/today" element={<Today today={today} />} />
          <Route path="/inventory" element={<InventoryContainer inventory={inventory} />} />
          <Route path="/inventory/create" element={<InventoryForm inventory={inventory} workorder={workorder} today={today} setApplicationData={setApplicationData} />} />
          <Route path="/summary" element={<Summary inventory={inventory} workorder={workorder} today={today} setApplicationData={setApplicationData} />} />
          <Route path="/chat" element={<Chat setApplicationData={setApplicationData} messages={messages} socket={socket}/>} />
				</Routes>
    </div>
  )
}