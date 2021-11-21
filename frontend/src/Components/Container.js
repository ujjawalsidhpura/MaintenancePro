import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import WorkOrderContainer from "./WorkOrderContainer";
import WorkOrderForm from "./WorkOrderForm";

export default function Container(props) {

  return (
    <div className="container is-three-quarters">
				<Routes>
					<Route path="/workorders" element={<WorkOrderContainer workorder={props.workorder}/>} />
					<Route path="/workorders/create" element={<WorkOrderForm/>} />
				</Routes>
    </div>
  )
}