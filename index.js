import React from 'react';
import ReactDOM from "react-dom";
const { graphql, buildSchema } = require("graphql");
import testing from "./helpers/testingTests";
import atoms from "./Atoms/AtomState";
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
  test1: "Jack",
  test2: "Jetta",
  test3: {
    name: "Jack",
    address: {
      city: "Nowhere",
      state: "Somewhere",
      zip: 88899
    }, 
    age: 30
  },
  test4: [
    {name: "test 4-1"}, {name: "test 4-2"}, {name: "test 4-3"}
  ]
}


//graphQL
let gotQL = graphql(schema, `{test1, test3, test4}`, root)

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
    const text = get(atoms.textStateAtom);
    return text.length;
  },
});


const updateEditorText = selector({
  key: 'editorState',
  get: ({get}) => {
    //const buttonTextVal = i.data;
    //return buttonTextVal.text;
  }
})

function buttonUpdater(){
  const buttonVal = "PRESS ME"; //useRecoilValue(updateButtonText); creates a circular dependency but
  //only because I'm not 100% clear on what I'm doing. 
  return <>{buttonVal}</>
}

function CharacterCount() {
  const count = useRecoilValue(charCountState);

  return <>Character Count: {count}</>;
}


function App() {
  return (
    <RecoilRoot>
      <CharacterCounter />
      <Hello thisText = {blank}/>
    </RecoilRoot>
  );
}

console.log(document.getElementById("app"));

ReactDOM.render(App(), document.getElementById("app"))