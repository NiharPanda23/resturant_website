
import { menu_list } from '../../assets/assets'
import './ExploreMenu.css'

const ExploreMenu = ({category, setCategory}) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Check Out Our Menu</h1>
      <p className="explore-menu-text">Explore our menu and discover a world of flavors! From savory starters to delicious mains and desserts, each dish is crafted with fresh, high quality ingredients. Find your next favorite meal!</p>
      <div className="explore-menu-list">
        {menu_list.map((menu) => {
          return(
            <div onClick={()=>setCategory(prev => prev === menu.menu_name ? "All" : menu.menu_name)} key={menu.menu_name} className="explore-menu-list-item">
              <img className={category===menu.menu_name ? "active":""} src={menu.menu_image} alt={menu.menu_name} />
              <p className={category===menu.menu_name ? "active":""}>{menu.menu_name}</p>
            </div>
          )
        })}
      </div>
      <hr />
    </div>
  )
}

export default ExploreMenu