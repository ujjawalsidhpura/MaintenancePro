import Profile from "./Profile";
import WorkOrderContainer from "./WorkOrderContainer";
import { useAuth0 } from '@auth0/auth0-react';

export default function Container(props) {
  const { isAuthenticated, isLoading } = useAuth0();
  console.log(useAuth0());

  return (
    <div className="container is-three-quarters">
			{/* <WorkOrderContainer workorder={props.workorder}/> */}
      {/* {isAuthenticated && <Profile/>} */}
      
      {!isAuthenticated && <img id="landing-image" src="https://www.barrierbeachmanagement.com/wp-content/uploads/2014/12/buildingmanagement.jpg"></img>}
    </div>
  )
}