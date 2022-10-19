import {gql, useQuery} from '@apollo/client'
import "./RestaurantsContainer.css"
import { useParams } from 'react-router-dom'
import RestaurantCard from '../RestaurantCard/RestaurantCard'
import Loading from '../Loading/Loading'

const RestaurantsContainer = ({ setSearch }) => {
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
  
    return data.restaurants.map((restaurant) => (
      <RestaurantCard restaurant={restaurant} />
    ));
  }


  return (
    <div className='restaurantContainer'>
      <div className='cardsContainer'>
        <DisplayRestaurants />
      </div>
      <div className='emptySpace'></div>
    </div>
  )
}

export default RestaurantsContainer