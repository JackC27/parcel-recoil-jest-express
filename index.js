import React from 'react';
import ReactDOM from "react-dom";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
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

const atomWithNoSelector = atom({
  key: "bigbadwilly",
  default: "Play on"
})

const wordCountSelector = selector({
  key: "wordCountSelector", 
  get: ({get}) => ( get(wordCountAtom) ),
  set: ({set}, newValue) => { set(wordCountAtom, newValue) }
})

//Components that need to read from and write to an atom should use useRecoilState() as shown below:
function EditorText(props) {
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

  return (
    <div className="container">
      <p id='title'>{props.heading}</p>      
      <div id='editor'>
        <textarea id="editorInput" onChange={captureText} value={copy}></textarea>
      </div>
    </div>
  )
}

function WordCount(){
  const counter = useRecoilValue(wordCountAtom);

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

function ButtonRow(props) {
  let save = useRecoilValue(editorStateAtom);
  console.log( save );
  return(
    <div className={props.className}>
      <Button action = { () => console.log(save) } value = "Save" />
      <Button action = { () => console.log(" DELETE ") }value = "Delete" />
      <Button action = { () => console.log(" STASH ") }value = "Stash" /> 
    </div>
  )

}

function CallHook(props){
  let playing = useRecoilState(atomWithNoSelector);
  return(
    <>
      <p>{playing}</p> {/*Throws an because: "Functions are not valid as React child*/}
      <p>{props.what}</p>
    </>
  )
}

function App() {
  return (
    <RecoilRoot>      
      <EditorText heading = "Simple text editing with word count" />
      <WordCount />
      <ButtonRow className="buttons-container" />
      <CallHook what="tamborine" />
    </RecoilRoot>
  );
}

ReactDOM.render(App(), document.getElementById("app"))

module.exports(EditorText);