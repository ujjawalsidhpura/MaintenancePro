import WorkOrders from "./WorkOrders";

export default function Container(props) {

  return (
    <div className="container is-three-quarters">
			<WorkOrders workorder={props.workorder}/>
    </div>
  )
}