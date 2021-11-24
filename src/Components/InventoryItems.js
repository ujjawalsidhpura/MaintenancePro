export default function InventoryItems(props) {
  return (
    <div className="card inventory-item">
			<div className="inventory-field">
				<h2>{props.category}</h2>
			</div>
			<div className="inventory-field">
				<p>{props.item}</p>
			</div>
			<div className="inventory-field">
				<p>{props.price_item}</p>
			</div>
			<div className="inventory-field">
				<p>{props.quantity}</p>
			</div>
    </div>
  )
}