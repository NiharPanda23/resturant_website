import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import "./List.css";

const List = () => {
  const [list, setList] = useState([]);

  const allFood = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/food/list`);
      if (response.data) {
        setList(response.data);
        console.log(response.data);
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  useEffect(() => {
    allFood();
  }, []);

  return (
    <div className="list add flex-col">
      <p>Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {
          list.map((food)=>{
            return(
              <div key={food._id} className="list-table-format">
                <img src={`http://localhost:3000/images/`+ food.image} alt={food.name} />
                <p>{food.name}</p>
                <p>{food.category}</p>
                <p>{food.price}</p>
                <div className="action">
                  <img src={assets.Add} alt="Add" />
                  <img src={assets.update} alt="update" />
                  <img src={assets.deleteButton} alt="deleteButton" />
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default List;
