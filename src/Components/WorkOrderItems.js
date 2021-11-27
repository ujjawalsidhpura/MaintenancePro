import { useAuth0 } from '@auth0/auth0-react';
import StartButton from './Buttons/StartButton';
import FinishButton from './Buttons/FinishButton';


export default function WorkOrderItems(props) {
  const { user, isAuthenticated } = useAuth0();
  let parsedPhotos = [];
  for (let photo in props.photos) {
    props.photos[photo] && parsedPhotos.push(<img key={photo} src={props.photos[photo].path} alt="user" />)
  }

  return (
    <div className="card workorder-item">
      <div className="workorder-field">
        <h2>{props.title}</h2>
      </div>
      <div className="workorder-field">
        <h2>{props.technician}</h2>
      </div>
      <div className="workorder-field">
        <p>{props.description}</p>
      </div>


      <div className="workorder-field">
        {props.created_on && <h2>{props.created_on.slice(0, 10)}</h2>}
      </div>

      <div className="workorder-field">
        {isAuthenticated && user.email !== 'admin@gmail.com'
          && !props.time_completed && props.time_started && <FinishButton id={props._id} />
        }
        {isAuthenticated && user.email !== 'admin@gmail.com'
          && !props.time_completed && !props.time_started && <StartButton id={props._id} />
        }
        {props.duration &&
          <p>{(props.duration / 1000 / 60).toFixed(2)} mins</p>
        }
      </div>
      <div className="workorder-field">
        {props.time_completed ? <span className="tag is-success">Finished</span> :
          props.time_started ? <span className="tag is-info">Ongoing</span> :
            <span className="tag is-warning">Pending</span>
        }
      </div>
    </div>
  )
}