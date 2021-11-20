import react, {useState} from 'react';
import AuthenticationButton from './Buttons/Auth-button';
import LoginButton from './Buttons/Login-button';
import Profile from './Profile';
import { useAuth0 } from '@auth0/auth0-react';

export default function MenuList(props) {
  const { user } = useAuth0();
  const { isAuthenticated, isLoading } = useAuth0();

  return (
    <aside className="menu is-one-quarter">
    <ul>
    { isLoading && <li className="menu-label"><a>Loading...</a></li>}
    {(!isAuthenticated && !isLoading) && <li className="menu-label"><a>Please Log IN</a></li>}
    {isAuthenticated && <Profile />}


    <li className="menu-list"><AuthenticationButton /></li>
      <ul>
        <li className="menu-list"><a>Glance at Today</a></li>
        <li className="menu-list"><a>Create Work Orders</a></li>
        <li className="menu-list"><a>Work Orders</a></li>
        <li className="menu-list"><a>Inventories</a></li>
        <li className="menu-list"><a>Summary</a></li>
      </ul>
    </ul>
    </aside>
  )
}