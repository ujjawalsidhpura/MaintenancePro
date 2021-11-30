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
	const [isActive, setisActive] = useState(false);
  user && !email && setEmail(user.email)

	const toggleNav = () => {
		setisActive(!isActive)
	}

  const LogInView =
	<nav className="navbar" role="navigation" aria-label="main navigation">
		  <div className="navbar-brand">
				<img alt="MaintenancePro" className="logo" src={logo}/>
			
		    <button 
					onClick={toggleNav}
					className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
					aria-label="menu" 
					aria-expanded="false" 
					data-target="navbarBasicExample"
					id='burger'
				>
		      <span aria-hidden="true"></span>
		      <span aria-hidden="true"></span>
		      <span aria-hidden="true"></span>
		    </button>
		  </div>
			
			
		  <div 
				id="navbarBasicExample" 
				className={`navbar-menu ${isActive ? "is-active" : ""}`}
			>
				<div className="menu-label">
					{isLoading && <li className="tag">Loading...</li>}
      	  {(!isAuthenticated && !isLoading) && <li className="tag">Please Log IN</li>}
      	  {isAuthenticated && <Profile nickname={user.nickname} email={email} picture={user.picture} />}
				</div>
		    <div className="navbar-start">
					
		    </div>
			
		    <div className="navbar-end">
		      <div className="nav-list">
						{(!isAuthenticated && !isLoading) &&  <AuthenticationButton onClick={toggleNav}/>}
            {/* <AuthenticationButton onClick={toggleNav}/> */}
		      </div>
		    </div>
		  </div>
		</nav>

  const adminView = (
		<nav className="navbar" role="navigation" aria-label="main navigation">
		  <div className="navbar-brand">
				<img alt="MaintenancePro" className="logo" src={logo}/>
			
		    <button 
					onClick={toggleNav}
					className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
					aria-label="menu" 
					aria-expanded="false" 
					data-target="navbarBasicExample"
					id='burger'
				>
		      <span aria-hidden="true"></span>
		      <span aria-hidden="true"></span>
		      <span aria-hidden="true"></span>
		    </button>
		  </div>
			
			
		  <div 
				id="navbarBasicExample" 
				className={`navbar-menu ${isActive ? "is-active" : ""}`}
			>
				<div className="menu-label">
					{isLoading && <li className="tag">Loading...</li>}
      	  {(!isAuthenticated && !isLoading) && <li className="tag">Please Log IN</li>}
      	  {isAuthenticated && <Profile nickname={user.nickname} email={email} picture={user.picture} />}
				</div>
				<hr className="underline"/>
		    <div className="navbar-start">
					<div className="nav-list">
						<Link to="/today" onClick={toggleNav} className="link">
							<div>
								<i className="far fa-eye"></i>
								Today at Glance
							</div>
						</Link>
					</div>
					<div className="nav-list">
						<div className="link">
							<Link to="/workorders" onClick={toggleNav}>
								<i className="far fa-clipboard"></i>
								Work Orders
							</Link>
							<Link to="/workorders/create" className="add" onClick={toggleNav}>
								<span>+</span>
							</Link>
						</div>
          </div>
					<div className="nav-list">
						<div className="link">
							<Link to="/inventory" onClick={toggleNav}>
								<i className="fas fa-wrench"></i>
								Inventories
							</Link>
							<Link to="/inventory/create" className="add" onClick={toggleNav}>
								<span>+</span>
							</Link>
						</div>
          </div>
					<div className="nav-list">
						<div className="link">
							<Link to="/assets" onClick={toggleNav}>
								<i className="far fa-building"></i>
								Assets
							</Link>
							<Link to="/assets/create" className="add" onClick={toggleNav}>
								<span>+</span>
							</Link>
						</div>
          </div>
					<div className="nav-list">
						<Link to="/summary" className="link" onClick={toggleNav}>
							<div>
								<i className="far fa-list-alt"></i>
								Summary
							</div>
						</Link>
					</div>
					<div className="nav-list">
						<Link to="/chat" className="link" onClick={toggleNav}>
							<div>
								<i className="fas fa-comment-alt"></i>
								Chat Platform
							</div>
						</Link>
					</div>
		    </div>
			
		    <div className="navbar-end">
		      <div className="nav-list">
            <AuthenticationButton onClick={toggleNav}/>
		      </div>
		    </div>
		  </div>
		</nav>
	)

  const technicianView = (
		<nav className="navbar" role="navigation" aria-label="main navigation">
		  <div className="navbar-brand">
				<img alt="MaintenancePro" className="logo" src={logo}/>
			
		    <button 
					onClick={toggleNav}
					className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
					aria-label="menu" 
					aria-expanded="false" 
					data-target="navbarBasicExample"
					id='burger'
				>
		      <span aria-hidden="true"></span>
		      <span aria-hidden="true"></span>
		      <span aria-hidden="true"></span>
		    </button>
		  </div>
			
			
		  <div 
				id="navbarBasicExample" 
				className={`navbar-menu ${isActive ? "is-active" : ""}`}
			>
				<div className="menu-label">
					{isLoading && <li className="tag">Loading...</li>}
      	  {(!isAuthenticated && !isLoading) && <li className="tag">Please Log IN</li>}
      	  {isAuthenticated && <Profile nickname={user.nickname} email={email} picture={user.picture} />}
				</div>
				<hr className="underline"/>
		    <div className="navbar-start">
					<div className="nav-list">
							<Link to="/workorders" onClick={toggleNav} className="link">
							<div >
								<i className="far fa-clipboard"></i>
								Work Orders
							</div>
							</Link>
          </div>
					<div className="nav-list">
						<Link to="/chat" className="link" onClick={toggleNav}>
							<div>
								<i className="fas fa-comment-alt"></i>
								Chat Platform
							</div>
						</Link>
					</div>
		    </div>
			
		    <div className="navbar-end">
		      <div className="nav-list">
            <AuthenticationButton onClick={toggleNav}/>
		      </div>
		    </div>
		  </div>
		</nav>
	)

  return (
    (user && user.email === 'admin@gmail.com') ? adminView :
      (user && user.email !== 'admin@gmail.com') ? technicianView :
        LogInView
  )
}