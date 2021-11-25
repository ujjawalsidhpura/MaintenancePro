export default function TodayItems(props) {
  return (
    <div className="card workorder-item">
			<div className="today-field">
				<h2>{props.title}</h2>
			</div>
			<div className="today-field">
				<h2>{props.technician}</h2>
			</div>
			<div className="today-field">
				<p>{props.description}</p>
			</div>

			<div className="today-field">
				<h2>{props.created_on.slice(0, 10)}</h2>	
			</div>
			
			<div className="today-field">
				{props.time_completed ? <span class="tag is-success">Finished</span>:
    		 props.time_started ? <span class="tag is-info">Ongoing</span>:
    		 <span class="tag is-warning">Pending</span>
    		}
			</div>
    </div>
  )
}