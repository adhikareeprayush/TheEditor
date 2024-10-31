import EditorContainer from "./assets/Compoennts/Editor/EditorContainer"
import EditorNavigation from "./assets/Compoennts/EditorNavigation/EditorNavigation"
import Output from "./assets/Compoennts/Output/Output"
import { useState } from "react"

const App = () => {

  const [code, setCode] = useState("#some comment")
  const [output, setOutput] = useState("")

  return (
    <div className="App">
      <div className="header">
        <div className="sub-header">
          <h1>TheEditor</h1>
          <p>Online Python Compiler</p>
        </div>
        <a className="btn btn-secondary" href="#">View Repo</a>
      </div>
      <EditorNavigation setOutput={setOutput} code={code} />
      <div className="content">
        <EditorContainer setCode={setCode} code={code} />
        <Output output={output} />
      </div>
    </div>
  )
}

export default App
