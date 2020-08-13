import react from "react";
import MyNewComponent from "./newComponent.jsx";
import{
  RecoilRoot,
  atom,
  selector,
  useRecoilState, 
  useRecoilValue
} from "recoil"

function App() {
  return(
    <RecoilRoot>
      <MyNewComponent />
    </RecoilRoot>
  )
}