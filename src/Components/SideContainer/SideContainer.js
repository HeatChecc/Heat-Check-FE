import React from 'react'
import { Link } from 'react-router-dom'
import "./SideContainer.css"

const SideContainer = ({search,restaurantInApp}) => {
    //add conidtional rendering to not show restaurant button if search is not defined
  return (
    <div className='sideBar'>
        <button className='sideButton'><Link className="navigation" to={`/`}>Homepage</Link></button>
        {search && <button className='sideButton'><Link className="navigation" to={`/search/${search}`}>Restaurants</Link></button>}
        {restaurantInApp && <button className='sideButton'><Link className="navigation" to={`/restaurant/${restaurantInApp}`}>Last Restaurant</Link></button>}
    </div>
  )
}

export default SideContainer