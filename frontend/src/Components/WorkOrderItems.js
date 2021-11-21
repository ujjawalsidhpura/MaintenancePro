import { useAuth0 } from '@auth0/auth0-react';
import  Start_button from './Buttons/Start-button'
import axios from 'axios';

export default function WorkOrderItems(props) {
  const { user, isAuthenticated } = useAuth0();
	let parsedPhotos = [];
	for (let photo in props.photos) {
		props.photos[photo] && parsedPhotos.push(<img key={photo} src={props.photos[photo].path}/>)
	}
	// const parsedPhotos = props.photos && props.photos.map(photo => console.log(photo))

  const start_click = (workorder_id) => {
      axios.post('/workorder/started',
      workorder_id,
    { headers: { "Content-Type": "application/json" } })
    .then((res) => {
      console.log(res)
    })
    .catch((e) => console.log(e))
  }


  return (
    <div className="card workorder-item">
			<div>
				<h2>{props.title}</h2>
			</div>
			<div class="workorder-content">
				<p>{props.description}</p>
				{parsedPhotos}
				{/* <div>{props.files}</div> */}
			</div>
			<div className="workorder-item-footer">
				<div>
					<h2>Technician</h2>
					<h2>{props.technician}</h2>
				</div>
        {isAuthenticated && user.email !== 'ujay@gmail.com' 
        && <Start_button onClick = {()=>{start_click({workorder_id: props._id})}}/>}
				<div>
					<h2>Work Order Created:</h2>
					<h2>{props.created_on}</h2>
					<h2>STATUS</h2>
				</div>
			</div>
    </div>
  )
}