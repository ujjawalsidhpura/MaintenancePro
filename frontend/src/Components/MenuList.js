import react, {useState, useEffect} from 'react';
import AuthenticationButton from './Buttons/Auth-button';
import LoginButton from './Buttons/Login-button';
import Profile from './Profile';
import { useAuth0 } from '@auth0/auth0-react';

export default function MenuList(props) {
  const { user } = useAuth0();
  const { isAuthenticated, isLoading } = useAuth0();
  const [email, setEmail] = useState('');

  user && !email && setEmail(user.email)

  console.log('email',email)
  const LogInView = 
  <aside className="menu is-one-quarter">
    <ul>
    { isLoading && <li className="menu-label"><a>Loading...</a></li>}
    {(!isAuthenticated && !isLoading) && <li className="menu-label"><a>Please Log IN</a></li>}
    {isAuthenticated && <Profile nickname={user.nickname} email={email} picture={user.picture}/>}


    <li className="menu-list"><AuthenticationButton /></li>
      <ul>
        <li className="menu-list"><a>Log In as Admin</a></li>
        <li className="menu-list"><a>Log In as Technician</a></li>
      </ul>
    </ul>
    </aside>;

  const adminView =  
  <aside className="menu is-one-quarter">
    <ul>
    { isLoading && <li className="menu-label"><a>Loading...</a></li>}
    {(!isAuthenticated && !isLoading) && <li className="menu-label"><a>Please Log IN</a></li>}
    {isAuthenticated && <Profile nickname={user.nickname} email={email} picture={user.picture}/>}


    <li className="menu-list"><AuthenticationButton /></li>
      <ul>
        <li className="menu-list"><a>Glance at Today</a></li>
        <li className="menu-list"><a>Create Work Orders</a></li>
        <li className="menu-list"><a>Work Orders</a></li>
        <li className="menu-list"><a>Inventories</a></li>
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
        <li className="menu-list"><a>Check my Workorders</a></li>
      </ul>
    </ul>
    </aside>;

  return (
     (user && user.email === 'zsh@gmail.com') ? adminView :
     (user && user.email !== 'zsh@gmail.com') ? technicianView :
     LogInView
  )
}