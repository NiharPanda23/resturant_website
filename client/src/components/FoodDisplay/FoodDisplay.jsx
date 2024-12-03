import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import './FoodDisplay.css';


const FoodDisplay = ({category}) => {

  const {food_list} = useContext(StoreContext)

  return (
    <div className='food-list' id='food-list'>
      <h2>Popular Picks Nearby</h2>
      <div className="food-display-list">
        {
          food_list.map((food, index)=>{
            if (category === "All" || category === food.category) {
              return <FoodItem key={index} id={food._id} name={food.name} description={food.description} price={food.price} image={`http://localhost:3000/images/`+food.image}/>
            }
          })
        }
      </div>
    </div>
  )
}

export default FoodDisplay