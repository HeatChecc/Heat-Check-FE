import React from 'react'
import "./ReviewsContainer.css"
import { useParams } from 'react-router-dom'

const ReviewsContainer = () => {
  let {lat, long} = useParams();
  return (
    <div>ReviewsContainer. This will one day do a call utilizing the latitude: {lat} and longitude: {long}</div>
  )
}

export default ReviewsContainer