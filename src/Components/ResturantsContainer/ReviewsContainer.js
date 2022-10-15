import React, { useEffect, useState } from 'react'
import SideContainer from '../SideContainer/SideContainer'
import "./ReviewsContainer.css"
import { Link, useParams } from 'react-router-dom'

const ReviewsContainer = ({setSearch}) => {
  let {id} = useParams();
  setSearch(id)
  const [resturants, setResturants] = useState([])

  const fetchResturants = () => {
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
        setResturants(result.businesses)
      })
      .catch(error => console.log('error', error));
  }

  useEffect(() => {
    fetchResturants()
  }, [])

  const resturantCards = resturants.map(resturant => {
    const {name, id, image_url, rating} = resturant
    return <div>
              <img src={image_url} alt="restaurant image"/>
              <Link to={`/resturant/${id}`}> {name} </Link>
              <p>{rating}</p>
           </div>
  })

  return (
    <div>
      <div className='sideBar'>
        {/* <SideContainer/> */}
      </div>
      {resturantCards}
    </div>
  )
}

export default ReviewsContainer