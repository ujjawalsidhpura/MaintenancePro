import axios from "axios";
import { useLocation } from 'react-router-dom'
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom"

export default function InventoryDelete(props) {

  window.scrollTo(0, 0);
  const location = useLocation()
  const inventoryData = location.state?.props

  const { setApplicationData } = props;
  const inventory_id = inventoryData.props._id

  const [submit, setSubmit] = useState(false)

  const handleDelete = (event) => {
    event.preventDefault()

    axios.post('/inventory/delete',
      { inventory_id: inventory_id },
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
          className="card inventory-form start-confirmation"
          autoComplete="off"
        >
          <p className="title"> Are you sure you want to delete? </p>
					<div className="confirm-cancel">
          	<Link to="/inventory">
          	  <button className="button is-info is-outlined danger">
          	    Cancel
          	  </button>
          	</Link>

          	<button
          	  className="button is-danger is-outlined confirm"
          	  onClick={handleDelete}
          	>
          	  Delete
          	</button>
					</div>


        </form>

				
      }
    </>
  )
}