import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {

  const { loginWithRedirect } = useAuth0();
  return (
    <button
      className="btn btn-primary btn-block"
      onClick={() => loginWithRedirect()}
    >
			<div>
				<i className="fas fa-sign-in-alt"></i>
				Log In
			</div>
    </button>
  );
};

export default LoginButton;