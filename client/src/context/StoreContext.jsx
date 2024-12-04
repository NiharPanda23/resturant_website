import { createContext, useEffect, useState } from "react";
import axios from "axios"

export const StoreContext = createContext(null);

const storeContextProvider = (props) => {
  const url = "http://localhost:3000";
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFood_list] = useState([])


  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchFood = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    setFood_list(response.data)
    
  }


  useEffect(() => {
    const loadData = async() => {
      await fetchFood();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
      }
    }
    loadData()
  }, [token]);

  const contextValue = {
    url,
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default storeContextProvider;
