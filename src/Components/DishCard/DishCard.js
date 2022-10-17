import React, { useState } from 'react'
import "./DishCard.css"
// import { Link } from "react-router-dom";
import Modal from "react-modal";
import Dish from '../Dish/Dish';
Modal.setAppElement("#root")

const DishCard = ({dishId, name, rating, description, setShowOldForm, setOldDishObject, setShowForm, toggleModal}) => {
    const [dishNameClicked, setDishNameClicked] = useState(false)
    const [isOpen, setIsOpen] = useState(false);

    const oldFormSetUp = () => {
        setShowOldForm(true)
        setOldDishObject({
          dishId: dishId,
          name: name,
        })
        toggleModal()
        setShowForm(false)
      }

      const toggleDishModal = () => {
        setDishNameClicked(true)
        setIsOpen(!isOpen);
      }

    // console.log('clicked?', dishNameClicked)

    return (
        <div className='dishCardInfo'>
        <Modal
            isOpen={isOpen}
            onRequestClose={toggleDishModal}
            contentLabel="My dialog"
            className="mymodal"
            overlayClassName="myoverlay"
            closeTimeoutMS={500}
          >
            {dishNameClicked && <Dish name={name} toggleDishModal={toggleDishModal} setDishNameClicked={setDishNameClicked}/>}
        </Modal>
            <div className='dishTopInfo'>
                <h2 className='dishName' onClick={() => toggleDishModal()}>{name}</h2>
                <p>{rating}X🌶</p>
                <button className="reviewExistingDishButton" onClick={() => oldFormSetUp()}>Review Dish</button>
            </div>
            <p className='dishDescription'>{description}</p>
        </div>
    )
}

export default DishCard