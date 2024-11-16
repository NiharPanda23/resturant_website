import NavBar from "./components/Navbar/NavBar"
import SIdebar from "./components/SIdebar/SIdebar"

const App = () => {
  return (
    <div>
      <NavBar/>
      <hr />
      <div className="app-container">
        <SIdebar/>
      </div>
    </div>
  )
}

export default App