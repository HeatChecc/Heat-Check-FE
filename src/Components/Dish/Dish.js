import React from 'react'
import "./Dish.css"
import { useParams } from 'react-router-dom'

const Dish = ({name, toggleDishModal, setDishNameClicked}) => {
  let {id} = useParams()
  // Modal.setAppElement(el)
  // console.log('props', props)

  const setDefault = () => {
    toggleDishModal()
    setDishNameClicked(false)
  }
  
  return (
    <div className='dishDetails'>
      Dish page. This will one day do a call using the id: {id}
      <h2 className='dishName'>{name}</h2>
      <button className='backButton' onClick={() => setDefault()}>Go Back</button>
      <h2>Customer Reviews</h2>
      <div className='reviewsContainer'>

      </div>
    </div>
  )
}

export default Dish