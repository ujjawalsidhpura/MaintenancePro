import React from 'react';
import { Link } from 'react-router-dom';

const FinishButton = function (props) {
  return (
    <Link
      to="/finish-confirmation"
      state={{ id: props.id }}
    >
      <button className="button is-danger is-outlined">
        Finish
      </button>
    </Link>
  )
}

export default FinishButton;