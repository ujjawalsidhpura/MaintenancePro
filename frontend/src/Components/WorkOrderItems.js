import { useAuth0 } from '@auth0/auth0-react';
import  Start_button from './Buttons/Start-button';
import Finish_button from './Buttons/Finish_button';


export default function WorkOrderItems(props) {
  const { user, isAuthenticated } = useAuth0();
	let parsedPhotos = [];
	for (let photo in props.photos) {
		props.photos[photo] && parsedPhotos.push(<img key={photo} src={props.photos[photo].path}/>)
	}

  return (
    <div className="card workorder-item">
			<div>
				<h2>{props.title}</h2>
			</div>
			<div class="workorder-content">
				<p>{props.description}</p>
				{/* {parsedPhotos} */}
				{/* <div>{props.files}</div> */}
			</div>
			<div className="workorder-item-footer">
				<div>
					<h2>Technician</h2>
					<h2>{props.technician}</h2>
				</div>

        {isAuthenticated && user.email !== 'ujay@gmail.com' 
        && !props.time_completed && props.time_started && <Finish_button id={props._id}/>
        }
        {isAuthenticated && user.email !== 'ujay@gmail.com' 
        && !props.time_completed && !props.time_started &&  <Start_button id={props._id}/>
        }
        {props.duration && <p>{(props.duration/1000/60).toFixed(2)} Mins</p>} 
				<div>
					<h2>Work Order Created:</h2>
					<h2>{props.created_on}</h2>
					{props.time_completed ? <h2>Finished</h2> :
           props.time_started ? <h2>Ongoing</h2> :
           <h2>Pending</h2>
          }
				</div>
			</div>
    </div>
  )
}