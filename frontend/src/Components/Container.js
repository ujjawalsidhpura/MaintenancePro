import { Routes, Route } from 'react-router-dom'
import WorkOrderContainer from "./WorkOrderContainer";
import WorkOrderForm from "./WorkOrderForm";
import Today from './Today';

export default function Container(props) {

  return (
    <div className="container is-three-quarters">
      <Routes>
        <Route path="/workorders" element={<WorkOrderContainer workorder={props.workorder} />} />
        <Route path="/today" element={<Today today={props.today} />} />
        <Route path="/workorders/create" element={<WorkOrderForm />} />
      </Routes>
    </div>
  )
}