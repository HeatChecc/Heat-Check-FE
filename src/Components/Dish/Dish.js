import React from 'react'
import "./Dish.css"
import { useParams } from 'react-router-dom'

const Dish = () => {
  let {id} = useParams()
  return (
    <div>Dish page. This will one day do a call using the id: {id}</div>
  )
}

export default Dish