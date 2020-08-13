import{
  RecoilRoot,
  atom,
  selector,
  useRecoilState, 
  useRecoilValue
} from "recoil";

const atoms = {};

atoms.newState = atom({
  key: "newAtomKey",
  default: {}
})


atoms.textState = atom({
  key: "textState", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});

atoms.differentState = atom({
  key: "differentStatesOfThings",
  default: "",
});

module.exports = atoms;
