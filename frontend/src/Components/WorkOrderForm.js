export default function WorkOrderForm(props) {

  return (
		<div class="workorder-form">

			<div class="field">
				<label class="label">Assign to</label>
				<div class="control">
					<div class="select">
						<select>
							<option selected disabled>Select Technician</option>
							<option>Ebuka Moneme</option>
							<option>Shuhao Zhang</option>
							<option>Ujjawal Sidhpura </option>
						</select>
					</div>
				</div>
			</div>
			{/* test */}

			<span class="star-rating">
			  <input type="radio" name="rating1" value="1"/><i></i>
			  <input type="radio" name="rating1" value="2"/><i></i>
			  <input type="radio" name="rating1" value="3"/><i></i>
			  <input type="radio" name="rating1" value="4"/><i></i>
			  <input type="radio" name="rating1" value="5"/><i></i>
			</span>

			{/* test */}

			<div class="field">
				<label class="label">Description</label>
				<div class="control">
					<textarea class="textarea" placeholder="Textarea"></textarea>
				</div>
			</div>

			<div class="field">
				<label class="label">Deadline</label>
				<div class="control">
					<input type="date"/>
				</div>
			</div>

			<div class="field">
				<label class="label">Name</label>
				<div class="control">
					<input class="input" type="text" placeholder="Text input"/>
				</div>
			</div>
			
			<div class="field">
				<label class="label">Username</label>
				<div class="control has-icons-left has-icons-right">
					<input class="input is-success" type="text" placeholder="Text input" value="bulma"/>
					<span class="icon is-small is-left">
						<i class="fas fa-user"></i>
					</span>
					<span class="icon is-small is-right">
						<i class="fas fa-check"></i>
					</span>
				</div>
				<p class="help is-success">This username is available</p>
			</div>
			
			<div class="field">
				<label class="label">Email</label>
				<div class="control has-icons-left has-icons-right">
					<input class="input is-danger" type="email" placeholder="Email input" value="hello@"/>
					<span class="icon is-small is-left">
						<i class="fas fa-envelope"></i>
					</span>
					<span class="icon is-small is-right">
						<i class="fas fa-exclamation-triangle"></i>
					</span>
				</div>
				<p class="help is-danger">This email is invalid</p>
			</div>
			
			<div class="field">
				<label class="label">Subject</label>
				<div class="control">
					<div class="select">
						<select>
							<option>Select dropdown</option>
							<option>With options</option>
						</select>
					</div>
				</div>
			</div>
			
			<div class="field">
				<label class="label">Message</label>
				<div class="control">
					<textarea class="textarea" placeholder="Textarea"></textarea>
				</div>
			</div>
			
			<div class="field">
				<div class="control">
					<label class="checkbox">
						<input type="checkbox"/>
						I agree to the <a href="#">terms and conditions</a>
					</label>
				</div>
			</div>
			
			<div class="field">
				<div class="control">
					<label class="radio">
						<input type="radio" name="question"/>
						Yes
					</label>
					<label class="radio">
						<input type="radio" name="question"/>
						No
					</label>
				</div>
			</div>
			
			<div class="field is-grouped">
				<div class="control">
					<button class="button is-link">Submit</button>
				</div>
				<div class="control">
					<button class="button is-link is-light">Cancel</button>
				</div>
			</div>
		</div>
  )
}