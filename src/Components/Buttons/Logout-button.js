// src/components/logout-button.js

import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <a
      className="btn btn-danger btn-block"
      onClick={() =>
        logout({
          returnTo: window.location.origin,
        })
      }
    >
			<div>
				<i class="fas fa-sign-out-alt"></i>
				Log Out
			</div>
    </a>
  );
};

export default LogoutButton;