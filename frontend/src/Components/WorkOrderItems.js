export default function WorkOrderItems(props) {
  return (
    <div class="card">
			<h2>{props.description}</h2>
			<h2>{props.name}</h2>
			<h2>{props.created_on}</h2>
    </div>
  )
}