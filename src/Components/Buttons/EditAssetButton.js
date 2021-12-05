import React from 'react';
import { Link } from 'react-router-dom'

const EditAssetButton = function (props) {

  return (
    <Link
      to="/assets/edit"
      state={{ props: props }}
    >
      <button className="button is-success is-outlined">Edit</button>
    </Link>
  )
}

export default EditAssetButton;