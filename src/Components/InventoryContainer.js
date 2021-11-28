import { useState } from "react"
import InventoryItems from "./InventoryItems"
import { useAuth0 } from '@auth0/auth0-react';

export default function WorkOrderContainer(props) {
  const { user } = useAuth0();

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
    return (<InventoryItems {...inventory} key={inventory._id} />)
  }).reverse()

  const validState = () => {
    return state.category || state.item
  }

  const handleQuery = (inventory) => {
    let query;
    if (state.category && !state.item) {
      query = inventory.props.category.toLowerCase().includes(state.category.toLowerCase())
    }
    if (!state.category && state.item) {
      query = inventory.props.item.toLowerCase().includes(state.item.toLowerCase())
    }
    if (state.category && state.item) {
      query = inventory.props.item.toLowerCase().includes(state.item.toLowerCase()) &&
        inventory.props.category.toLowerCase().includes(state.category.toLowerCase())
    }
    return query;
  }

  const parsedInventoryByQuery = validState() && parsedInventory.filter(inventory =>
    handleQuery(inventory)
  );

  return (
    (user && user.email === "admin@gmail.com") ?
    <>
      <form className="card inventory-filter" onSubmit={handleSubmit}>
        <h2 className="title">Inventory</h2>
        <div>
          <h2><strong>Filters</strong></h2>
        </div>
        <div className="filters">
          <div className="inventory-filter-input">
            <input
              className="input"
              type="text"
              placeholder="Category"
              value={state.category}
              onChange={(event) => changeState("category", event.target.value)}
            />
          </div>
          <div className="inventory-filter-input">
            <input
              className="input"
              type="text"
              placeholder="Item"
              value={state.item}
              onChange={(event) => changeState("item", event.target.value)}
            />
          </div>
        </div>
      </form>
      <div className="card inventory-labels">
        <span><strong>Category</strong></span>
        <span><strong>Item</strong></span>
        <span><strong>Price</strong></span>
        <span><strong>Quantity</strong></span>
      </div>
      <div className="inventory-container">
        {validState() ? parsedInventoryByQuery : parsedInventory}
      </div>
    </> : <></>
  )
}