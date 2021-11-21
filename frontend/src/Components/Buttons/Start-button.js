import React from 'react';

const Start_button = function(props){
  const { onClick } = props;
  return(
    <button onClick={onClick}>Start</button>
  )
}

export default Start_button;