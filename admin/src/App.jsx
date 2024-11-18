import NavBar from "./components/Navbar/NavBar"
import SIdebar from "./components/SIdebar/SIdebar"
import { Routes, Route } from "react-router-dom"
import Add from "./Pages/Add/Add"
import List from "./Pages/List/List"
import Orders from "./Pages/Orders/Orders"

const App = () => {
  return (
    <div>
      <NavBar/>
      <hr />
      <div className="app-container">
        <SIdebar/>
        <Routes>
          <Route path="/add" element={<Add/>}/>
          <Route path="/list" element={<List/>}/>
          <Route path="/order" element={<Orders/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App