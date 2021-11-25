import react, {useState } from 'react';
import AuthenticationButton from './Buttons/Auth-button';
import logo from '../images/1.png'
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

  <aside className="menu">
		<img className="logo" alt="MaintenancePro" src={logo}/>
    <ul>
    { isLoading && <li className="menu-label"><a>Loading...</a></li>}
    {/* {(!isAuthenticated && !isLoading) && <li className="menu-label"><a>Please Log IN</a></li>} */}
    {isAuthenticated && <Profile nickname={user.nickname} email={email} picture={user.picture}/>}
    <li className="nav-list"><AuthenticationButton /></li>
    </ul>
  </aside>


  const adminView =  
  <aside className="menu">
		{/* <div class="dropdown ">
		  <div class="dropdown-trigger">
		    <button class="button" aria-haspopup="true" aria-controls="dropdown-menu2">
				{isAuthenticated && <Profile nickname={user.nickname} email={email} picture={user.picture}/>}
		      <span class="icon is-small">
		        <i class="fas fa-angle-down" aria-hidden="true"></i>
		      </span>
		    </button>
		  </div>
		  <div class="dropdown-menu" id="dropdown-menu2" role="menu">
		    <div class="dropdown-content">
		      <div class="dropdown-item">
		        <p>You can insert <strong>any type of content</strong> within the dropdown menu.</p>
		      </div>
		      <hr class="dropdown-divider"/>
		      <div class="dropdown-item">
		        <p>You simply need to use a <code>&lt;div&gt;</code> instead.</p>
		      </div>
		      <hr class="dropdown-divider"/>
		      <a href="#" class="dropdown-item">
		        This is a link
		      </a>
		    </div>
		  </div>
		</div> */}
		<img className="logo" alt="MaintenancePro" src={logo}/>
    { isLoading && <li className="menu-label"><a>Loading...</a></li>}
    {(!isAuthenticated && !isLoading) && <li className="menu-label"><a>Please Log IN</a></li>}
    {isAuthenticated && <Profile nickname={user.nickname} email={email} picture={user.picture}/>}
		<hr/>
    	<ul className="links">
    	  <li className="nav-list">
					<Link to="/today">
						<div>
							<i class="far fa-eye"></i>
							Today at Glance
						</div>
					</Link>
				</li>
				<li className="nav-list">
					<Link to="/workorders">
						<div>
							<i class="far fa-clipboard"></i>
							Work Orders
						</div>
						<Link to="/workorders/create"><span>+</span></Link>
					</Link>
					
				</li>
				<li className="nav-list">
					<Link to="/inventory">
						<div>
							<i class="fas fa-wrench"></i>
							Inventories
						</div>
						<Link to="/inventory/create"><span>+</span></Link>
					</Link>
				</li>
    	  <li className="nav-list">
					<Link to="">
						<div>
							<i class="far fa-list-alt"></i>
							Summary
						</div>
					</Link>
				</li>
				<li className="nav-list logout">
					<AuthenticationButton />
				</li>
    	</ul>
  
    </aside>;

    const technicianView = 
    <aside className="menu is-one-quarter">
    <ul>
    { isLoading && <li className="menu-label"><a>Loading...</a></li>}
    {(!isAuthenticated && !isLoading) && <li className="menu-label"><a>Please Log IN</a></li>}
    {isAuthenticated && <Profile nickname={user.nickname} email={email} picture={user.picture}/>}


    <li className="nav-list"><AuthenticationButton /></li>
      <ul>
        <li className="nav-list"><Link to="/workorders">Check my Workorders</Link></li>
      </ul>
    </ul>
    </aside>;

  return (
     (user && user.email === 'admin@gmail.com') ? adminView :
     (user && user.email !== 'admin@gmail.com') ? technicianView :
     LogInView
  )
}