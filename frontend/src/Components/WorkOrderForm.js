import { useState } from "react"

export default function WorkOrderForm(props) {
	const [state, setState] = useState({
		technician: "",
		description: "",
		importance: 0,
		photos: null,
		files: null,
	})

	const ratings = [1, 2, 3, 4, 5]

	const changeState = (key, value) => {
		setState({...state, [key]: value})
	}
  return (
		<form className="card workorder-form" autoComplete="off" onSubmit={event => {
			event.preventDefault()
			console.log(state)
		}}>
			<h1>Create Work Order</h1>
			<div className="field">
				<label className="label">Assign to</label>
					<div className="select">
						<select value={state.technician} onChange={(event) => changeState("technician", event.target.value)}>
							<option disabled value="">Select Technician</option>
							<option>Ebuka Moneme</option>
							<option>Shuhao Zhang</option>
							<option>Ujjawal Sidhpura </option>
						</select>
					</div>
			</div>
			
			<div className="field">
				<label className="label">Description</label>
				<textarea 
					className="textarea" 
					placeholder="Textarea" 
					value={state.description}
					onChange={(event) => changeState("description", event.target.value)}
				></textarea>
			</div>

			<div className="field">
				<label className="label">Importance</label>
				<span className="star-rating">
					{ratings.map(rating => 
						(<><input 
							key={rating}
							type="radio" 
							name="rating1" 
							value={rating}
							onClick={() => changeState("importance", rating)}
						/><i></i></>)
						)}
				</span>
			</div>

			<div className="field">
				<label className="label">Photo</label>
				<input type="file" id="imageFile" accept="image/*"/>
			</div>

			<div className="field">
				<label className="label">Files</label>
					<input type="file" id="docpicker" accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" multiple/>
			</div>
			
			<button className="button is-link" type="submit">Submit</button>
		</form>
  )
}