import{
  RecoilRoot,
  atom,
  selector,
  useRecoilState, 
  useRecoilValue
} from "recoil";

const newState = atom({
  key: "newAtomKey",
  default: "",
  value: 1096
})

module.exports = newState;
