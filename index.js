var mixpanel = require("mixpanel-browser");
mixpanel.init("12fa2800ccbf44a5c36c37bc9776e4c0");

import save from "./helpers/helpers"

import React from 'react';
import ReactDOM from "react-dom";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
  constSelector,
} from 'recoil';

//current state of text editor
//receives updates onChange

/** Editor State Atom */
const editorStateAtom = atom({
  key: "editorStateAtom",
  default: ""
})

//Editor state updater selector.
//I guess we can use this to update state as well? 

/** Editor State Selector */
const updateEditorSelector = selector({
  key: 'editorStateSelector',
  get: ({get}) => ( get(editorStateAtom) ),
  set: ({set}, newValue) => { set(editorStateAtom, newValue) }
})

const wordCountAtom = atom({
  key: "wordCountAtom",
  default: 0,
})

const updatePagesCount = atom({
  key: "updatePagesCount",
  default: 1,
});


const updatePagesCountSelector = selector({
  key: "updatePagesCountSelector",
  get: ({ get }) => get(updatePagesCount),
  set: ({ set }, newValue) => { set(updatePagesCount, newValue); },
});

const wordCountSelector = selector({
  key: "wordCountSelector", 
  get: ({get}) => ( get(wordCountAtom) ),
  set: ({set}, newValue) => {
    set(wordCountAtom, newValue) 
  }
})

//Components that need to read from and write to an atom should use useRecoilState() as shown below:
function EditorText(props) {

  let pages = useRecoilValue(updatePagesCountSelector);
  const [copy, setEditorText] = useRecoilState(updateEditorSelector);
  const setCounterInt = useSetRecoilState(wordCountSelector);  
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

  let editorArr = [];
   
  for( let i = 0; i<=pages; i++){
      editorArr.push(
        <div className="container">
          <h1 id='title'></h1>      
          <div id='editor'>
            <textarea id="editorInput" onChange={captureText} value={copy}></textarea>
          </div>
        </div>
      )
    }
  
  console.log("EditorText -> editorArr", editorArr)

  return editorArr;
}


function WordCount(props){
  const counter = useRecoilValue(wordCountAtom);
  return (
    <div className="container">
      <p id='count'>Word Count: {counter}</p>
      <p id='must'></p>
    </div>
  )
}

function Button(props){
  return (
    <button className={props.value} onClick={props.action}>{props.value}</button>
  )
}

function ButtonRow(props) {
  let [pagenum, setPageNumber] = useRecoilState(updatePagesCount);
  return(
    <div className={props.className}>
      <Button action = { () => { save } } value = "Save" />
      <Button action = { () => console.log(" DELETE ") } value = "Delete" />
      <Button action = { () => console.log(" STASH ") } value = "Stash" /> 
      <Button action = { () => { setPageNumber(pagenum + 1) } } value = "+" /> 
      <Button action = { () => { setPageNumber(pagenum - 1) } } value = "-" /> 
    </div>
  )

}

function App() {

  return (
    <RecoilRoot>      
      { <EditorText heading = "Type:" /> }
      <WordCount mustBe = "Must Be here to Render on Map" />
      <ButtonRow className="buttons-container" />
    </RecoilRoot>
  );
}

ReactDOM.render(App(), document.getElementById("app"))