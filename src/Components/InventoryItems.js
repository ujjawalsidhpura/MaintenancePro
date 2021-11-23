export default function InventoryItems(props) {
  return (
    <div className="card workorder-item">
			<div>
				<h2>{props.category}</h2>
			</div>
			<div class="workorder-content">
				<p>{props.item}</p>
			</div>
			<div class="workorder-content">
				<p>{props.price_item}</p>
			</div>
			<div class="workorder-content">
				<p>{props.quantity}</p>
			</div>
    </div>
  )
}