import Profile from "./Profile";
import WorkOrderContainer from "./WorkOrderContainer";
import { useAuth0 } from '@auth0/auth0-react';

export default function Container(props) {
  const { user } = useAuth0();

  return (
    <div className="container is-three-quarters">
			{/* <WorkOrderContainer workorder={props.workorder}/> */}
      {user && <Profile/>}
    </div>
  )
}