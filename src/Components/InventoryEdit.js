import axios from "axios";
import { useLocation } from 'react-router-dom'
import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function InventoryEdit(props) {
  window.scrollTo(0, 0);
  const location = useLocation()
  const inventoryData = location.state?.props

  const { setApplicationData } = props;
  const [state, setState] = useState(inventoryData.props)

  const changeState = (key, value) => {
    setState({ ...state, [key]: value })
  }

  const [submit, setSubmit] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()

    const data = {
      ...state
    }

    axios.post('/inventory/edit',
      data,
      { headers: { "Content-Type": "application/json" } })
      .then((res) => {
        axios.get('/inventory')
          .then((res) => setApplicationData(prev => ({
            ...prev, inventory: [...res.data]
          })))
        setSubmit(true)
      })
      .catch((e) => console.log(e))
  }

  return (
    <>
      {submit && <Navigate to="/inventory" />}

      {!submit &&
        <form
          className="card inventory-form"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <div className="form-content">
            <h1 className="title">Add Inventory Item</h1>

            <div className="field">
              <label className="label">Category</label>
              <input
                className="input"
                type="text"
                placeholder="Category"
                value={state.category}
                onChange={(event) => changeState("category", event.target.value)}
              />
            </div>

            <div className="field">
              <label className="label">Item</label>
              <input
                className="input"
                type="text"
                placeholder="Item"
                value={state.item}
                onChange={(event) => changeState("item", event.target.value)}
              />
            </div>

            <div className="field">
              <label className="label">Price</label>
              <input
                className="input"
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

            <div className="field">
              <label className="label">Quantity</label>
              <input
                className="input"
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

            <button className="button is-link submit" type="submit">Submit</button>
          </div>
          <div className="form-image">
            <img src="https://image.freepik.com/free-vector/illustration-characters-fixing-cogwheel_53876-40796.jpg" alt="form" />
          </div>
        </form>
      }
    </>
  )
}