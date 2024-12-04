import NavBar from "./components/Navbar/NavBar";
import SIdebar from "./components/SIdebar/SIdebar";
import { Routes, Route } from "react-router-dom";
import Add from "./Pages/Add/Add";
import List from "./Pages/List/List";
import Orders from "./Pages/Orders/Orders";
import Update from "./Pages/UpdateItem/Update";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {

  const url = "http://localhost:3000"

  return (
    <div>
      <ToastContainer/>
      <NavBar />
      <hr />
      <div className="app-container">
        <SIdebar />
        <Routes>
          <Route path="/add" element={<Add  url={url}/>} />
          <Route path="/list" element={<List  url={url}/>} />
          <Route path="/update" element={<Update url={url}/>}/>
          <Route path="/order" element={<Orders  url={url}/>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
