// src/views/profile.js

import React, {useState} from 'react';

import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
  const { user } = useAuth0();
  const { nickname, picture, email } = user;
  useState(email);

  return (
    <div>
      <div className="row align-items-center profile-header">
        <div className="col-md-2 mb-3">
        <h1 className="menu-label">Welcome {nickname}</h1>
          <img
            id="admin-avatar"
            src={picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
        </div>
        <div className="col-md text-center text-md-left">
          <p className="lead text-muted">{email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;