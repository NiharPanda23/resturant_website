import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./index.css";
import LoginPopup from "./components/LoginPopup/LoginPopup";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin? <LoginPopup setShowLogin={setShowLogin}/>: <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;
