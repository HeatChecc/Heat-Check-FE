import React from 'react'
import { Link, useParams } from 'react-router-dom'
import "./SideContainer.css"

const SideContainer = ({search,resturantInApp}) => {
    let {id} = useParams();
    //add conidtional rendering to not show resturant button if search is not defined
  return (
    <div>
        <button><Link to={`/`}>Homepage</Link></button>
        <button><Link to={`/search/${search}`}>Resturants</Link></button>
        <button><Link to={`/resturant/${resturantInApp}`}>Last Resturant</Link></button>
    </div>
  )
}

export default SideContainer