import WorkOrderContainer from "./WorkOrderContainer";

export default function Container(props) {

  return (
    <div className="container is-three-quarters">
			<WorkOrderContainer workorder={props.workorder}/>
    </div>
  )
}