import { useState } from "react"
import InventoryItems from "./InventoryItems"

export default function WorkOrderContainer(props) {
	const [state, setState] = useState({
		category: "",
    item: ""    
	})

	const changeState = (key, value) => {
    setState({ ...state, [key]: value })
  }

	const handleSubmit = (event) => {
		event.preventDefault();
	}

	const parsedInventory = props.inventory.map(inventory => {
		return (<InventoryItems {...inventory} key={inventory._id}/>)
	}).reverse()

	const validState = () => {
		return state.category || state.item 
	}

	const handleQuery = (inventory) => {
		let query;
		if (state.category && !state.item ) {
			query = inventory.props.category.toLowerCase().includes(state.category.toLowerCase())
		}
		if (!state.category && state.item ) {
			query = inventory.props.item.toLowerCase().includes(state.item.toLowerCase())
		}
		if (state.category && state.item ) {
			query = inventory.props.item.toLowerCase().includes(state.item.toLowerCase()) &&
			inventory.props.category.toLowerCase().includes(state.category.toLowerCase())
		}
		return query;
	}

  const parsedInventoryByQuery = validState() && parsedInventory.filter(inventory => 
    handleQuery(inventory)
	);

  return (
    <div className="workorder-container">
			<form className="card workorder-filter" onSubmit={handleSubmit}>
				<div>
					<h2>Filter Workorders</h2>
				</div>
				<div>
					<label className="label">Category:</label>
					<input 
						class="input" 
						type="text" placeholder="Text input" 
						value={state.category}
	    	    onChange={(event) => changeState("category", event.target.value)}
					/>
				</div>
				<div>
					<label className="label">Item:</label>
					<input 
						class="input" 
						type="text" placeholder="Text input" 
						value={state.item}
	    	    onChange={(event) => changeState("item", event.target.value)}
					/>
				</div>
				
			</form>
			<h1>Inventory</h1>
			{ validState()? parsedInventoryByQuery : parsedInventory }
    </div>
  )
}