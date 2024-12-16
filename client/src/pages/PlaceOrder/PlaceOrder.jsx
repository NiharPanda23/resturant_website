import { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { useLocation } from "react-router-dom";
import axios from "axios";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const location = useLocation();
  const deliveryCharge = location.state?.deliveryCharge || 0;
  const [data, setData] = useState({
    firstName:"", 
    lastName:"",
    email: "",
    street: "",
    city: "",
    state: "",
    pinCode:"",
    country: "",
    phone: ""
  })

  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setData(prvData => ({...prvData, [name]: value}))
    
  }

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if (cartItems[item._id]>0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount()+deliveryCharge,
      deliveryCharge,
    }
    console.log(orderData);
    let response = await axios.post(`${url}/api/orders/place`, orderData, {headers:{token}})
    if(response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url);
    }
    else{
      alert("Error");
    }
  }


  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name="firstName" value={data.firstName} onChange={onChangeHandler} type="text" placeholder="First Name" />
          <input required name="lastName" value={data.lastName} onChange={onChangeHandler} type="text" placeholder="Last Name" />
        </div>
        <input required name="email" value={data.email} onChange={onChangeHandler} type="email" placeholder="Email address" />
        <input required name="street" value={data.street} onChange={onChangeHandler} type="text" placeholder="Street" />
        <div className="multi-fields">
          <input required name="city" value={data.city} onChange={onChangeHandler} type="text" placeholder="City" />
          <input required name="state" value={data.state} onChange={onChangeHandler} type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input required name="pinCode" value={data.pinCode} onChange={onChangeHandler} type="text" placeholder="Pin code" />
          <input required name="country" value={data.country} onChange={onChangeHandler} type="text" placeholder="Country" />
        </div>
        <input required name="phone" value={data.phone} onChange={onChangeHandler} type="text" placeholder="Phone" />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹ {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>
                ₹{" "}
                {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() > 0 && getTotalCartAmount() < 500 ? deliveryCharge : "Free"}
              </p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ₹{" "}
                {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() > 0 && getTotalCartAmount() < 500 ? getTotalCartAmount() + deliveryCharge : getTotalCartAmount()}
              </b>
            </div>
          </div>
          <button type="submit">Proceed To Payment</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
