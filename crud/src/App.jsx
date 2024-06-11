import { BrowserRouter, Route, Routes } from "react-router-dom"
import Add from "./pages/add"
import View from "./pages/view"
import Edit from "./pages/edit"

function App() {
  return (
    <>
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Add/>}/>
            <Route path="/view" element={<View/>}/>
            <Route path="/edit" element={<Edit/>}/>
         </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
