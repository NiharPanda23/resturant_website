import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "https://resturant-website-server.onrender.com";
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFood_list] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const addToCart = async (itemId) => {
    try {
      if (!cartItems[itemId]) {
        setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
      } else {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
      }

      if (token) {
        await axios.post(
          `${url}/api/cart/add`,
          { itemId },
          { headers: { token } }
        );
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      if (cartItems[itemId] > 1) {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
      } else {
        const updatedCart = { ...cartItems };
        delete updatedCart[itemId];
        setCartItems(updatedCart);
      }

      if (token) {
        await axios.delete(`${url}/api/cart/remove`, {
          data: { itemId },
          headers: { token },
        });
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      const quantity = cartItems[itemId];
      if (quantity > 0) {
        const itemInfo = food_list.find((product) => product._id === itemId);
        if (itemInfo) {
          totalAmount += itemInfo.price * quantity;
        }
      }
    }
    return totalAmount;
  };

  const fetchFood = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setFood_list(response.data);
    } catch (error) {
      console.error("Error fetching food data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadCartData = async (userToken) => {
    try {
      const response = await axios.get(`${url}/api/cart/list`, {
        headers: { token: userToken },
      });
      setCartItems(response.data.cartData);
    } catch (error) {
      console.error("Error loading cart data:", error);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);

      try {
        await fetchFood();

        const storedToken = localStorage.getItem("token");
        if (storedToken) {
          setToken(storedToken);
          await loadCartData(storedToken);
        }
      } catch (error) {
        console.error("Error initializing data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, []);

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
    isLoading,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
