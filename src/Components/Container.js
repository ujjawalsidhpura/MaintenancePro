// import { useAuth0 } from '@auth0/auth0-react';
import { Routes, Route } from 'react-router-dom'
import WorkOrderContainer from "./WorkOrderContainer";
import WorkOrderForm from "./WorkOrderForm";
import StartConfirmation from "./StartConfirmation";
import FinishConfirmation from "./FinishConfirmation";
import Today from './Today';
import InventoryContainer from './InventoryContainer';
import InventoryForm from "./InventoryForm";
import Summary from "./Summary";
import Chat from "./Chat";
import Home from './Home';
import AssetsContainer from './AssetsContainer'
import AssetsForm from './AssetsForm'
import AssetsEdit from './AssetsEdit'
import InventoryEdit from './InventoryEdit'
import InventoryDelete from './InventoryDelete'
import AssetDelete from './AssetDelete'

export default function Container(props) {
  const { inventory, today, workorder, setApplicationData, assets, messages, socket } = props

  return (
    <div className="view-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workorders" element={<WorkOrderContainer workorder={workorder} />} />
        <Route path="/workorders/create" element={<WorkOrderForm setApplicationData={setApplicationData} today={today} inventory={inventory} assets={assets} />} />
        <Route path="/start-confirmation" element={<StartConfirmation setApplicationData={setApplicationData} today={today} inventory={inventory} />} />
        <Route path="/finish-confirmation" element={<FinishConfirmation setApplicationData={setApplicationData} today={today} inventory={inventory} />} />
        <Route path="/today" element={<Today today={today} />} />

        <Route path="/inventory" element={<InventoryContainer inventory={inventory} />} />
        <Route path="/inventory/create" element={<InventoryForm inventory={inventory} workorder={workorder} today={today} setApplicationData={setApplicationData} assets={assets} />} />
        <Route path="/inventory/edit"
          element={<InventoryEdit setApplicationData={setApplicationData} />} />
        <Route path="/inventory/delete"
          element={<InventoryDelete setApplicationData={setApplicationData} />} />

        <Route path="/assets" element={<AssetsContainer assets={assets} />} />
        <Route path="/assets/create" element={<AssetsForm assets={assets}
          inventory={inventory} workorder={workorder} today={today} setApplicationData={setApplicationData} />} />
        <Route path="/assets/edit"
          element={<AssetsEdit setApplicationData={setApplicationData} />} />
        <Route path="/assets/delete"
          element={<AssetDelete setApplicationData={setApplicationData} />} />

        <Route path="/summary" element={<Summary inventory={inventory} workorder={workorder} today={today} setApplicationData={setApplicationData} />} />
        <Route path="/chat" element={<Chat setApplicationData={setApplicationData} messages={messages} socket={socket} />} />
      </Routes>
    </div>
  )
}