import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {

  const { logout } = useAuth0();

  return (
    <button
      className="btn btn-block nav-list"
      onClick={() =>
        logout({
          returnTo: window.location.origin,
        })
      }
    >
			<div>
				<i className="fas fa-sign-out-alt"></i>
				Log Out
			</div>
    </button>
  );
};

export default LogoutButton;