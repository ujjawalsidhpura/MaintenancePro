import React from 'react';
import { Link } from 'react-router-dom'

const EditInventoryButton = function (props) {

  return (
    <>
      <Link
        to="/inventory/edit"
        state={{ props: props }}
      >
        <button className="button is-success is-outlined">Edit</button>
      </Link>
      <Link
        to="/inventory/delete"
        state={{ props: props }}
      >
        <button className="button is-danger is-outlined">Delete</button>
      </Link>
    </>
  )
}

export default EditInventoryButton;