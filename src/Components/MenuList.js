import react, {useState } from 'react';
import AuthenticationButton from './Buttons/Auth-button';
import Profile from './Profile';
import { useAuth0 } from '@auth0/auth0-react';

// import LoginButton from './Buttons/Login-button';
// import SignupButton from './Buttons/Signup-button';
import { Link } from 'react-router-dom';
export default function MenuList(props) {
  const { user } = useAuth0();
  const { isAuthenticated, isLoading } = useAuth0();
  const [email, setEmail] = useState('');
  user && !email && setEmail(user.email)

  const LogInView = 

  <aside className="menu is-one-quarter">
    <ul>
    { isLoading && <li className="menu-label"><a>Loading...</a></li>}
    {(!isAuthenticated && !isLoading) && <li className="menu-label"><a>Please Log IN</a></li>}
    {isAuthenticated && <Profile nickname={user.nickname} email={email} picture={user.picture}/>}
      <ul>
       <li className="menu-list"><AuthenticationButton /></li>
      </ul>
    </ul>
  </aside>


  const adminView =  
  <aside className="menu is-one-quarter">
    <ul>
    { isLoading && <li className="menu-label"><a>Loading...</a></li>}
    {(!isAuthenticated && !isLoading) && <li className="menu-label"><a>Please Log IN</a></li>}
    {isAuthenticated && <Profile nickname={user.nickname} email={email} picture={user.picture}/>}


    <li className="menu-list"><AuthenticationButton /></li>
        <ul>
          <li className="menu-list"><Link to="/today">Today at Glance</Link></li>
					<div className="new-menu-list">
						<li className="menu-list"><Link to="/workorders">Work Orders</Link></li>
						<li className="add menu-list"><Link to="/workorders/create">+</Link></li>
					</div>
					<div className="new-menu-list">
						<li className="menu-list"><Link to="/inventory">Inventories</Link></li>
						<li className="add menu-list"><Link to="/inventory/create">+</Link></li>
					</div>
          <li className="menu-list"><a>Summary</a></li>
       </ul>
    </ul>
    </aside>;

    const technicianView = 
    <aside className="menu is-one-quarter">
    <ul>
    { isLoading && <li className="menu-label"><a>Loading...</a></li>}
    {(!isAuthenticated && !isLoading) && <li className="menu-label"><a>Please Log IN</a></li>}
    {isAuthenticated && <Profile nickname={user.nickname} email={email} picture={user.picture}/>}


    <li className="menu-list"><AuthenticationButton /></li>
      <ul>
        <li className="menu-list"><Link to="/workorders">Check my Workorders</Link></li>
      </ul>
    </ul>
    </aside>;

  return (
     (user && user.email === 'admin@gmail.com') ? adminView :
     (user && user.email !== 'admin@gmail.com') ? technicianView :
     LogInView
  )
}