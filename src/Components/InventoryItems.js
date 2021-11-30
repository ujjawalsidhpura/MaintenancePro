import {useViewport} from './useViewport';

export default function InventoryItems(props) {
	const { width } = useViewport();
	const breakpoint = 1024;

	const DesktopInventory = () => (
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

	const MobileInventory = () => (
		<div className="card workorder-item">
			<div className="workorder-content-mobile status-and-title">
				<div className="workorder-content-mobile">
					<p className="tag is-info is-light workorder-tag">Category:</p>
					<p>
						{props.category}
					</p>
				</div>
			</div>
			<hr className="divider"/>
			<div className="workorder-content-mobile">
				<p className="tag is-info is-light workorder-tag">Item:</p>
				<p>
					{props.item}
					</p>
			</div>
			<hr className="divider"/>
			<div className="workorder-content-mobile">
					<p className="tag is-info is-light workorder-tag">Price:</p>
					<p> 
						{props.price_item}
					</p>
			</div>
			<hr className="divider"/>
			<div className="workorder-content-mobile">
				<p className="tag is-info is-light workorder-tag">Quantity:</p>			
				<p>
					{props.quantity}
				</p>
			</div>	

    </div>
	)

  return (
    width < breakpoint ? <MobileInventory/> : <DesktopInventory/>
  )
}