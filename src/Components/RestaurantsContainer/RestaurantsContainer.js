import React, {useState} from 'react'
import {gql, useQuery} from '@apollo/client'
import "./RestaurantsContainer.css"
import { useParams } from 'react-router-dom'
import RestaurantCard from '../RestaurantCard/RestaurantCard'
import Loading from '../Loading/Loading'
import MapContainer from '../MapContainer/MapContainer'

const RestaurantsContainer = ({ setSearch }) => {
  const [mapView, setMapView] = useState(false)
  let { id } = useParams();
  setSearch(id)

  const GET_RESTAURANTS = gql`
    query Restaurants($location: String! ) {
      restaurants(location: $location) {
        id
        imageUrl
        name
        rating
        address
        lat
        lon
        city
      }
    }
    `;

  function DisplayRestaurants() {
    const { loading, error, data } = useQuery(GET_RESTAURANTS, {variables: {location: id}});
  
    if (loading) return <Loading />;
    if (error) return <p>Error :(</p>;

    if (!mapView) {
      return data.restaurants.map((restaurant) => (
        <RestaurantCard restaurant={restaurant} />
      ));
    } else {
      return <MapContainer restaurants={data.restaurants} />
    }

  }


  return (
    <div className='restaurantContainer'>
      <button classname='mapButton' onClick={() => setMapView(true)}>Map View</button>
      <button classname='listButton' onClick={() => setMapView(false)}>List View</button>
      <div className='cardsContainer'><DisplayRestaurants /></div>
      <div className='emptySpace'></div>
    </div>
  )
}

export default RestaurantsContainer