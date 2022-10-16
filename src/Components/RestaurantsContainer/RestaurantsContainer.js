import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import "./RestaurantsContainer.css"
import { Link, useParams } from 'react-router-dom'

const RestaurantsContainer = ({setSearch}) => {
  let {id} = useParams();
  setSearch(id)
  const [restaurants, setRestaurants] = useState([])

  useEffect(() => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer dJEWPcptSi0S89Fq0IOr6VU9OSmNVpfAP-L4Xmr0U3fNtUty7b2PeRmQylJCH_QGk5dcq2lUdlIt-juVbw4De3V9dPToVlq_7lT3kal84w1b3PPz1ytGx1es6vlKY3Yx");

    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`https://arcane-hollows-12884.herokuapp.com/https://api.yelp.com/v3/businesses/search?term="spicy"&location="${id}"`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setRestaurants(result.businesses)
      })
      .catch(error => console.log('error', error));
  }, [id])

  const restaurantCards = restaurants.map(restaurant => {
    const {name, id, image_url, rating} = restaurant
    return <div key={id} className="restaurant">
              <img className='restaurantImage' src={image_url} alt={name}/>
              <div className='restaurantInfo'>
                <Link className="restName" to={`/restaurant/${id}`}> {name} </Link>
                <p className='restRating'> Rating: {rating}</p>
              </div>
           </div>
  })

  return (
    <div className='restaurantContainer'>
      <Header/>
      <div className='cardsContainer'>
        {restaurantCards}
      </div>
      <div className='emptySpace'></div>
    </div>
  )
}

export default RestaurantsContainer