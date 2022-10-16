import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import "./Resturant.css"
import { useParams } from 'react-router-dom'

const Resturant = ({search, setResturantInApp}) => {
  let {id} = useParams();
  setResturantInApp(id)
  const [resturant, setResturant] = useState("")
  const [location, setLocation] = useState("")

  useEffect(() => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer dJEWPcptSi0S89Fq0IOr6VU9OSmNVpfAP-L4Xmr0U3fNtUty7b2PeRmQylJCH_QGk5dcq2lUdlIt-juVbw4De3V9dPToVlq_7lT3kal84w1b3PPz1ytGx1es6vlKY3Yx");

    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`https://arcane-hollows-12884.herokuapp.com/https://api.yelp.com/v3/businesses/${id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        setResturant(result)
        setLocation(result.location.display_address[2])
      })
      .catch(error => console.log('error', error));
  }, [id])

  return (
    <div className='resturantPage'>
      <Header />
      <h2 className='cityName'>{location}</h2> 
      <h1>{resturant.name}</h1>
      <div className='menuList'>
        <div className='menuHeader'>
          <h2 className='menuTitle'>Hot Menu</h2>
          <button className='addNewDishButton'>Add New Dish Review</button>
        </div>
        <div className='dishList'>

        </div>
      </div>
    </div>
  )
}

export default Resturant