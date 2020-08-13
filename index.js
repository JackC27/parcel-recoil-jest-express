import React from 'react';
import ReactDOM from "react-dom";
const { graphql, buildSchema } = require("graphql");
import testing from "./helpers/testingTests";
import atoms from "./Atoms/newComponentState";
import Hello from "./fnComponents/newComponent"
import schema from "./schema.js";

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

//graphQL
const root = { 
  hello : "WHAT IS GOING ON? ",
  say: "Something",
  love: "and happiness"
};

//graphQL
let gotQL = graphql(schema, `{say, love}`, root)

let blank = null;
//graphQL
gotQL.then( response => { 
  console.log( response );   
  return response;
})
.then( i => {
  console.log( " I ", i)
  blank = i.data.say;
  console.log("BLANK ", blank);
})



function CharacterCounter() {
  return (
    <div>
      <TextInput />
      <CharacterCount />
    </div>
  );
}

function TextInput() {
  const [text, setText] = useRecoilState(atoms.textState);

  const onChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={onChange} />
      <br />
      Echo: {text}
    </div>
  );
}

const charCountState = selector({
  key: 'charCountState', // unique ID (with respect to other atoms/selectors)
  get: ({get}) => {
    const text = get(atoms.textState);
    return text.length;
  },
});


const updateButtonText = selector({
  key: 'differentStatesOfThings',
  get: ({get}) => {
    const buttonTextVal = i.data;
    return buttonTextVal.text;
  }
})

function buttonUpdater(){
  const buttonVal = "JACK "; //useRecoilValue(updateButtonText); creates a circular dependency but
  //only because I'm not 100% clear on what I'm doing. 
  return <>Val: {buttonVal}</>
}

function CharacterCount() {
  const count = useRecoilValue(charCountState);

  return <>Character Count: {count}</>;
}


function App() {
  return (
    <RecoilRoot>
      <CharacterCounter />
      <Hello thisText = {buttonUpdater}/>
    </RecoilRoot>
  );
}

console.log(document.getElementById("app"));

ReactDOM.render(App(), document.getElementById("app"))