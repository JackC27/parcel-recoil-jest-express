import React from "react";
import{
  RecoilRoot,
  atom,
  selector,
  useRecoilState, 
  useRecoilValue
} from "recoil";


const editorStateAtom = atom({
  key: "editorStateAtom",
  default: ""
})

const updateEditorSelector = selector({
  key: 'editorStateSelector',
  get: ({get}) => ( get(editorStateAtom) ),
  set: ({set}, newValue) => { set(editorStateAtom, newValue) }
})

// /Components that need to read from and write to an atom should use useRecoilState() as shown below:
function EditorText() {
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

module.exports = EditorText