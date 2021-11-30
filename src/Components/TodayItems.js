import {useViewport} from './useViewport';

export default function TodayItems(props) {
	const { width } = useViewport();
	const breakpoint = 1024;

	const DesktopToday = () => (
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
				{props.created_on && <h2>{props.created_on.slice(0, 10)}</h2>}
			</div>

			<div className="today-field">
				{props.time_completed ? <span className="tag is-success">Finished</span> :
					props.time_started ? <span className="tag is-info">Ongoing</span> :
						<span className="tag is-warning">Pending</span>
				}
			</div>
		</div>
	)

	const MobileToday = () => (
		<div className="card workorder-item">
			<div className="workorder-content-mobile status-and-title">
				<div className="workorder-content-mobile">
					<p className="tag is-info is-light workorder-tag">Title:</p>
					<p>
						{props.title}
					</p>
				</div>
				<div className="">
      	  {props.time_completed ? <span className="tag is-success">Finished</span> :
      	    props.time_started ? <span className="tag is-info">Ongoing</span> :
      	      <span className="tag is-warning">Pending</span>
      	  }
      	</div>
			</div>
			<hr className="divider"/>
			<div className="workorder-content-mobile">
				<p className="tag is-info is-light workorder-tag">Technician:</p>
				<p>
					{props.technician}
					</p>
			</div>
			<hr className="divider"/>
			<div className="workorder-content-mobile">
					<p className="tag is-info is-light workorder-tag">Description:</p>
					<p> 
						{props.description}
					</p>
			</div>
			<hr className="divider"/>
			<div className="workorder-content-mobile">
				<p className="tag is-info is-light workorder-tag">Created:</p>			
				{props.created_on && <p>
					{props.created_on.slice(0, 10)}
				</p>}
			</div>
    </div>
	)


  return (
		width < breakpoint ? <MobileToday/> : <DesktopToday/>
  )
}