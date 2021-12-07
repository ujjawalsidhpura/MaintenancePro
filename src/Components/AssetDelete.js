import axios from "axios";
import { useLocation } from 'react-router-dom'
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom"

export default function AssetDelete(props) {

  window.scrollTo(0, 0);
  const location = useLocation()
  const assetData = location.state?.props

  const { setApplicationData } = props;
  const asset_id = assetData.props._id

  const [submit, setSubmit] = useState(false)

  const handleDelete = (event) => {
    event.preventDefault()

    axios.post('/assets/delete',
      { asset_id: asset_id },
      { headers: { "Content-Type": "application/json" } })
      .then((res) => {
        axios.get('/assets')
          .then((res) => setApplicationData(prev => ({
            ...prev, assets: [...res.data]
          })))
        setSubmit(true)
      })
      .catch((e) => console.log(e))
  }

  return (
    <>
      {submit && <Navigate to="/assets" />}

      {!submit &&
        <form
          className="card inventory-form start-confirmation"
          autoComplete="off"
        >
          <p className="title"> Are you sure you want to delete? </p>
					<div className="confirm-cancel">
						<Link to="/assets">
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