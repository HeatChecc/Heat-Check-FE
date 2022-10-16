import React from 'react'
import { Link } from 'react-router-dom'
import "./SideContainer.css"

const SideContainer = ({search,resturantInApp}) => {
    //add conidtional rendering to not show resturant button if search is not defined
  return (
    <div className='sideBar'>
        <button className='sideButton'><Link className="navigation" to={`/`}>Homepage</Link></button>
        <button className='sideButton'><Link className="navigation" to={`/search/${search}`}>Resturants</Link></button>
        <button className='sideButton'><Link className="navigation" to={`/resturant/${resturantInApp}`}>Last Resturant</Link></button>
    </div>
  )
}

export default SideContainer