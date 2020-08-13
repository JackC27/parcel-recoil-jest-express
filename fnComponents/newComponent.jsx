import React from "react";

  
//we want an atom to update the value of the button.
function Hello(props){
  console.log(" PROPS ", props);
  return ( 
    <div>
      <button onClick={ e => console.log( "Button click @ ", e.target.value) }>{props.thisText}</button>
    </div>    
  )
}


module.exports = Hello