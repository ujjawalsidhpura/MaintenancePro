import { useState, useCallback } from "react"
import axios from 'axios'
import { Navigate } from "react-router-dom";

export default function InventoryForm(props) {
  const [state, setState] = useState({
    category: "",
    item: "",
    price_item: "",
    quantity: ""
  })

  const [submit, setSubmit] = useState(false)


  const handleSubmit = (event) => {

    event.preventDefault()
    const inventory = {
      ...state
    }

    axios.post('/inventory', inventory,
      { headers: { "Content-Type": "application/json" } })
      .then((res) => {
        setSubmit(true)
      })
      .catch((e) => console.log(e))
  }

  const changeState = (key, value) => {
    setState({ ...state, [key]: value })
  }

  return (
    <>

      {submit && <Navigate to="/inventory" />}

      {!submit &&
        <form className="card workorder-form" autoComplete="off"
          onSubmit={handleSubmit}>
          <h1>Add Inventory Item</h1>

          <div class="field">
            <label class="label">Category</label>
            <input
              class="input"
              type="text"
              placeholder="Category"
              value={state.category}
              onChange={(event) => changeState("category", event.target.value)}
            />
          </div>

          <div class="field">
            <label class="label">Item</label>
            <input
              class="input"
              type="text"
              placeholder="Item"
              value={state.item}
              onChange={(event) => changeState("item", event.target.value)}
            />
          </div>

          <div class="field">
            <label class="label">Price</label>
            <input
              class="input"
              type="text"
							placeholder="Price"
							pattern="[0-9]*"
              value={state.price_item}
              onChange={(event) => {
								if (!isNaN(event.target.value)) {
									changeState("price_item", Number(event.target.value))
								}
							}}
            />
          </div>

          <div class="field">
            <label class="label">Quantity</label>
            <input
              class="input"
              type="text"
              placeholder="Quantity"
              value={state.quantity}
              onChange={(event) => {
								if (!isNaN(event.target.value)) {
									changeState("quantity", Number(event.target.value))
								}
							}}
            />
          </div>

          <button className="button is-link" type="submit">Submit</button>
        </form>
      }

    </>
  )
}