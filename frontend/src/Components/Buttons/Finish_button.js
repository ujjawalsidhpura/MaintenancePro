import React from 'react';
import { Link } from 'react-router-dom';

const Finish_button = function(props){
  console.log("start button props", props);
  return(
    <Link 
    to="/finish-confirmation"   
    state={ {id: props.id} }
    >
    <button>Finish</button>
    </Link>
  )
}

export default Finish_button;