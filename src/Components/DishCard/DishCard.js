import React from 'react'
import "./DishCard.css"

const DishCard = ({dishId, name, rating, description, setShowOldForm, setOldDishObject}) => {
    const oldFormSetUp = () => {
        setShowOldForm(true)
        setOldDishObject({
          dishId: dishId,
          name: name,
        })
      }
    return (
        <div className='dishCardInfo'>
            <div className='dishTopInfo'>
                <h2 className='dishName'>{name}</h2>
                <p>{rating}X🌶</p>
                <button className="reviewExistingDishButton" onClick={() => oldFormSetUp()}>Review Dish</button>
            </div>
            <p className='dishDescription'>{description}</p>
        </div>
    )
}

export default DishCard