import react from "react";
import newComponentState from "../Atoms/newComponentState";
import{
  RecoilRoot,
  atom,
  selector,
  useRecoilState, 
  useRecoilValue
} from "recoil";
import { render } from "react-dom";

let starterPackComponents = {};

starterPackComponents.MyNewComponent = function(){
  const [text, textInput] = useRecoilState(newAtomKey)
  return (
    <div> 
      <p>find another career</p>
      <p>{textInput}</p>
      <button onClick={ (e) => {console.log( e.target.value) } }>Click</button>
      <p> I bet there is no text: {text}</p>
    </div>
  )
}

module.exports = MyNewComponent