import { useContext } from "react"
import { StoreContext } from "../../context/StoreContext"

import "./Cart.css"

const Cart = () => {

  const { cartItems, food_list, removeFromCart} = useContext(StoreContext)

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((food,i) => {
          if (cartItems[food._id] > 0){
            return(
              <div className="cart-items-title cart-items-item" key={i}>
                <img src={food.image} alt="food image" />
                <p>{food.name}</p>
                <p>₹ {food.price}</p>
                <p>{cartItems[food._id]}</p>
                <p>{food.price*cartItems[food._id]}</p>
                <p>X</p>
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}

export default Cart