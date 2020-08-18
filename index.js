import React from 'react';
import ReactDOM from "react-dom";
//const { graphql, buildSchema } = require("graphql");
import testing from "./helpers/testingTests";
import atoms from "./Atoms/AtomState";
import {Hello, Test1} from "./fnComponents/newComponent"
//import schema from "./schema.js";

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

const editorStateAtom = atom({
  key: "editorStateAtom",
  default: ""
})

const updateEditorSelector = selector({
  key: 'editorStateSelector',
  get: ({get}) => ( get(editorStateAtom) ),
  set: ({set}, newValue) => { set(editorStateAtom, newValue) }
})

const wordCountAtom = atom({
  key: "wordCountAtom",
  default: 0,
})

const wordCountSelector = selector({
  key: "wordCountSelector", 
  get: ({get}) => ( get(wordCountAtom) ),
  set: ({set}, newValue) => { set(wordCountAtom, newValue) }
})

// /Components that need to read from and write to an atom should use useRecoilState() as shown below:
function EditorText(props) {
  const [copy, setEditorText] = useRecoilState(updateEditorSelector);
  const [counter, setCounterInt] = useRecoilState(wordCountSelector);
  
  const captureText = e => {
    setEditorText(e.target.value); 
    captureSpaces(e)
  }

  const captureSpaces = k => {
    let x = k.target.value.split(" ");
    let xLen = x.length;
    if(x [ xLen - 1 ].length < 1){
      xLen = xLen-1
    }
    setCounterInt(xLen);
  }

  return (
    <div className="container">
      <p id='title'>A simple text editor with word counting</p>      
      <div id='editor'>
        <textarea id="editorInput" onChange={captureText} value={copy}></textarea>
      </div>
    </div>
  )
}

function WordCount(){
  const [counter, setCounterInt] = useRecoilState(wordCountSelector);

  return (
    <div className="container">
      <p id='count'>Word Count: {counter}</p>
    </div>
  )
}

function Button(props){

  return (
    <button className={props.value} onClick={props.action}>{props.value}</button>
  )
}

function ButtonRow() {
  return(
    <div className="button-row">
      <Button action = { () => console.log(" SAVE ") } value = "Save" />
      <Button action = { () => console.log(" DELETE ") }value = "Delete" />
      <Button action = { () => console.log(" STASH ") }value = "Stash" /> 
    </div>
  )

}

function App() {
  return (
    <RecoilRoot>
      <EditorText />
      <WordCount />
      <ButtonRow />
    </RecoilRoot>
  );
}

ReactDOM.render(App(), document.getElementById("app"))