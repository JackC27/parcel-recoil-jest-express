import React from 'react';
import ReactDOM from "react-dom";
const { graphql, buildSchema } = require("graphql");
import testing from "./helpers/testingTests"

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

const schema = buildSchema(`
  type Query { 
    hello: String
    say: String
    love: String
  }
`);


const root = { 
  hello : "WHAT IN THE FUCK? ",
  say: "Something",
  love: "and happiness"
};


let x = graphql(schema, `{say, love}`, root)

x.then( response => { 
  console.log( response );   
  return response;
})




const textState = atom({
  key: 'textState', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});

function CharacterCounter() {
  return (
    <div>
      <TextInput />
      <CharacterCount />
    </div>
  );
}

function TextInput() {
  const [text, setText] = useRecoilState(textState);

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
    const text = get(textState);

    return text.length;
  },
});

function CharacterCount() {
  const count = useRecoilValue(charCountState);

  return <>Character Count: {count}</>;
}


function App() {
  return (
    <RecoilRoot>
      <CharacterCounter />
    </RecoilRoot>
  );
}

console.log(document.getElementById("app"));

ReactDOM.render(App(), document.getElementById("app"))