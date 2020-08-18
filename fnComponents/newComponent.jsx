import React from "react";

let Components = {};

//we want an atom to update the value of the button.
Components.Hello = function(props){
  return ( 
    <div>
      <button onClick={ e => console.log( "Button click @ ", e.target.value) }>{props.thisText}</button>
    </div>    
  )
}


module.exports = Components