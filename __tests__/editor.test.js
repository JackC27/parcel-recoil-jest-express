import EditorText from "./components/Editor"

console.log("TEST EDITOR TEXT ", EditorText)

describe("testing main component value to be empty", () => {
  test(EditorText).toBeInstanceOf(Function);
})