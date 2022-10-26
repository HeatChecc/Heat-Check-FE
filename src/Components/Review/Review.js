import React from 'react'
import "./Review.css"

const Review = ({description, overallRating}) => {

  const printPeppers = () => {
    if (overallRating === 1) {
      return <>🌶</>
    } else if (overallRating === 2) {
      return <>🌶🌶</>
    } else if (overallRating === 3) {
      return <>🌶🌶🌶</>
    } else if (overallRating === 4) {
      return <>🌶🌶🌶🌶</>
    }
    else if (overallRating === 5) {
      return <>🌶🌶🌶🌶🌶</>
    }
  }

  return (
  <div className='review'>
    <div className='reviewDetails'>
    <p className='reviewDescription'>{description}</p> <p>rating:{printPeppers()}</p>
    </div>
  </div>
  )
}

export default Review