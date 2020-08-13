import{
  RecoilRoot,
  atom,
  selector,
  useRecoilState, 
  useRecoilValue
} from "recoil";

const atoms = {};

atoms.newStateAtom = atom({
  key: "newAtomKey",
  default: {}
})

atoms.textStateAtom = atom({
  key: "textState", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});

atoms.differentStateAtom = atom({
  key: "differentStatesOfThings",
  default: "",
});

atoms.editorStateAtom = atom({
  key: "editorState",
  default: ""
})

module.exports = atoms;
