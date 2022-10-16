import React, { useEffect, useState } from 'react'
import "./RestaurantsContainer.css"
import { useParams } from 'react-router-dom'
import RestaurantCard from '../RestaurantCard/RestaurantCard'
import Loading from '../Loading/Loading'

const RestaurantsContainer = ({setSearch}) => {
  let {id} = useParams();
  setSearch(id)
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
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
        setLoading(false)
        setRestaurants(result.businesses)
      })
      .catch(error => console.log('error', error));
  }, [id])

  const restaurantsCards = restaurants.map(restaurant => {
    return(<RestaurantCard restaurant={restaurant} />)
  })

  return (
    <div className='restaurantContainer'>
      {loading && <Loading />}
      <div className='cardsContainer'>
        {restaurantsCards}
      </div>
      <div className='emptySpace'></div>
    </div>
  )
}

export default RestaurantsContainer