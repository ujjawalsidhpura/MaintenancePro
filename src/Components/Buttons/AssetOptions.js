import { useState, useRef, useEffect } from 'react';
import listenForOutsideClicks from '../listenForOutsideClicks';
import { Link } from 'react-router-dom'

export default function Options(props) {
	const menuRef = useRef(null);
	const [listening, setListening] = useState(false);
	const [isActive, setisActive] = useState(false);
	const toggleOptions = () => {
		setisActive(!isActive)
	}
	useEffect(() => listenForOutsideClicks(
    listening,
    setListening,
    menuRef,
    setisActive,
  ), [setListening, listening, menuRef, isActive]);

	return (
		<div 
				ref={menuRef}
				className={`dropdown edit-delete ${isActive ? "is-active" : ""}`}
				onClick={toggleOptions}
				onBlur={toggleOptions}
				onFocus={toggleOptions}
			>

				<img 
					className="edit-delete dropdown-trigger" 
					src="https://img.icons8.com/material-rounded/96/000000/menu-2.png"
					aria-controls="dropdown-menu"
					alt="options"
				/>

				<div className={`dropdown-menu ${isActive ? "is-active" : ""}`} id="dropdown-menu" role="menu">
  			  <div className="dropdown-content">
						<div className="option-wrapper">
    				  <Link
    				    to="/assets/edit"
    				    state={{ props: props }}
    				  >
    				    <button className="button is-success is-outlined options">Edit</button>
    				  </Link>
    				  <Link
    				    to="/assets/delete"
    				    state={{ props: props }}
    				  >
    				    <button className="button is-danger is-outlined options">Delete</button>
    				  </Link>
    				</div>
  			  </div>
  			</div>
			</div>
	)
}
