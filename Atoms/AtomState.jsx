import{
  RecoilRoot,
  atom,
  selector,
  useRecoilState, 
  useRecoilValue
} from "recoil";

const atoms = {};

atoms.editorStateAtom = atom({
  key: "editorState",
  default: ""
})

module.exports = atoms;
