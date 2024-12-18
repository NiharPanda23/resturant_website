import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";
import { assets } from "../../assets/assets";
import "./orders.css";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.get(`${url}/api/orders/list`);
    if (response.data.success) {
      setOrders(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const updateStatus = async (e, orderId) => {
    const response = await axios.post(`${url}/api/orders/update`,{
      orderId,
      status: e.target.value
    })
    if(response.data.success){
      await fetchOrders()
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order) => (
          <div key={order._id} className="order-item">
            <img src={assets.parcel_icon} alt="parcel_icon" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, i) => {
                  if (i === order.items.length - 1) {
                    return item.name + "x" + item.quantity;
                  } else {
                    return item.name + "x" + item.quantity + ", ";
                  }
                })}
              </p>
              <p className="order-item-name">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    "," +
                    order.address.state +
                    "," +
                    order.address.country +
                    "," +
                    order.address.pinCode +
                    ","}
                </p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>₹{order.amount}</p>
            <select onChange={(e)=>updateStatus(e, order._id)} value={order.status}>
              <option value="Order Processing">Order Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
