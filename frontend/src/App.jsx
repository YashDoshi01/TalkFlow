import Register from "./components/Register";
import {BrowserRouter , Routes , Route } from "react-router-dom";
function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element= {<Register/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
