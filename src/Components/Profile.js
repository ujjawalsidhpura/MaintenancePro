import React from 'react';

const Profile = (props) => {
  const { nickname, picture } = props;
  return (
    <div>
      <div className="menu-header">
        <img
          id="admin-avatar"
          src={picture}
          alt="Profile"
          className="profile"
        />
        <h1 className="title profile-name">{nickname}</h1>
      </div>
    </div>
  );
};

export default Profile;