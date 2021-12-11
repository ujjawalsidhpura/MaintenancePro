import React from 'react';
import { Link } from 'react-router-dom'

const EditInventoryButton = function (props) {

  return (
    <div className="option-wrapper">
      <Link
        to="/inventory/edit"
        state={{ props: props }}
      >
        <button className="button is-success is-outlined options">Edit</button>
      </Link>
      <Link
        to="/inventory/delete"
        state={{ props: props }}
      >
        <button className="button is-danger is-outlined options">Delete</button>
      </Link>
    </div>
  )
}

export default EditInventoryButton;