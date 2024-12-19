import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

import "./MyOrders.css";
import { assets } from "../../assets/assets";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.get(`${url}/api/orders/userorder`, {
      headers: { token },
    });
    setData(response.data.data);
    console.log(response.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my_orders">
      <h2>My Orders</h2>
      <div className="order-container">
        {data.map((order) => {
          return (
            <div className="my_orders-order" key={order._id}>
              <img src={assets.parcel_icon} alt="parcel_icon" />
              <p>
                {order.items.map((item, i) => {
                  if (i === order.items.length - 1) {
                    return item.name + "x" + item.quantity;
                  } else {
                    return item.name + "x" + item.quantity + ", ";
                  }
                })}
              </p>
              <p>₹{order.amount}</p>
              <p>Items: {order.items.length}</p>
              <p>
                 <b>{order.status}</b>
              </p>
              <button>Track Order</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
