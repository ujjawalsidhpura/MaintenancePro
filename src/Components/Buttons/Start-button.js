import React from 'react';
import { Link } from 'react-router-dom'

const Start_button = function (props) {
  return (
    <Link
      to="/start-confirmation"
      state={{ id: props.id }}
    >
      <button className="button is-success is-outlined">Start</button>
    </Link>
  )
}

export default Start_button;