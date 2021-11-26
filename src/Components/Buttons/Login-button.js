// src/components/Buttons/Login-button.js

import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <a
      className="btn btn-primary btn-block"
      onClick={() => loginWithRedirect()}
    >
			<div>
				<i class="fas fa-sign-in-alt"></i>
				Log In
			</div>
    </a>
  );
};

export default LoginButton;