import React from 'react'
import "./Resturant.css"
import { useParams } from 'react-router-dom'

const Resturant = () => {
  let {id} = useParams();
  return (
    <div>Resturant page. This will one day do a call using the id: {id}</div>
  )
}

export default Resturant