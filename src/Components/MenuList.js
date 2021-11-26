import { useState } from 'react';
import AuthenticationButton from './Buttons/Auth-button';
import logo from '../images/1.png'
import Profile from './Profile';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

export default function MenuList() {
  const { user } = useAuth0();
  const { isAuthenticated, isLoading } = useAuth0();
  const [email, setEmail] = useState('');
  user && !email && setEmail(user.email)

  const LogInView =

    <aside className="menu">
      <img className="logo" alt="MaintenancePro" src={logo} />
      <ul className="links">
        {isLoading && <li className="menu-label"><a>Loading...</a></li>}
        {isAuthenticated &&
          <Profile nickname={user.nickname} email={email} picture={user.picture} />
        }
        {(!isAuthenticated && !isLoading) && <li className="nav-list"><AuthenticationButton /></li>}

      </ul>
    </aside>


  const adminView =
    <aside className="menu">
      <img className="logo" alt="MaintenancePro" src={logo} />
      {isLoading && <li className="menu-label"><a>Loading...</a></li>}
      {(!isAuthenticated && !isLoading) && <li className="menu-label"><a>Please Log IN</a></li>}
      {isAuthenticated && <Profile nickname={user.nickname} email={email} picture={user.picture} />}
      <hr />
      <ul className="links">
        <li className="nav-list">
          <Link to="/today" className="link">
            <div>
              <i className="far fa-eye"></i>
              Today at Glance
            </div>
          </Link>
        </li>

        <li className="nav-list">
          <div className="link">
            <Link to="/workorders">
              <i className="far fa-clipboard"></i>
              Work Orders
            </Link>
            <Link to="/workorders/create">
              <span>+</span>
            </Link>
          </div>
        </li>

        <li className="nav-list">
          <div className="link">
            <Link to="/inventory">
              <i className="fas fa-wrench"></i>
              Inventories
            </Link>
            <Link to="/inventory/create">
              <span>+</span>
            </Link>
          </div>
        </li>

        <li className="nav-list">
          <Link to="/summary" className="link">
            <div>
              <i className="far fa-list-alt"></i>
              Summary
            </div>
          </Link>
        </li>
        <li className="nav-list">
          <Link to="/chat" className="link">
            <div>
              <i className="fas fa-comment-alt"></i>
              Chat Platform
            </div>
          </Link>
        </li>
        <li className="nav-list logout">
          <AuthenticationButton />
        </li>
      </ul>
    </aside>;

  const technicianView =
    <aside className="menu">
      <img className="logo" alt="MaintenancePro" src={logo} />
      {isLoading && <li className="menu-label"><a>Loading...</a></li>}
      {(!isAuthenticated && !isLoading) && <li className="menu-label"><a>Please Log IN</a></li>}
      {isAuthenticated && <Profile nickname={user.nickname} email={email} picture={user.picture} />}
      <hr />
      <ul className="links">
        <li className="nav-list"><Link to="/workorders" className="link">My Work Orders</Link></li>
        <li className="nav-list">
          <Link to="/chat">
            <div>
              <i className="fas fa-comment-alt"></i>
              Chat Platform
            </div>
          </Link>
        </li>
        <li className="nav-list"><AuthenticationButton /></li>
      </ul>
    </aside>;

  return (
    (user && user.email === 'admin@gmail.com') ? adminView :
      (user && user.email !== 'admin@gmail.com') ? technicianView :
        LogInView
  )
}