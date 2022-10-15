import React, { useState } from 'react'
import heatLogo from "../Images/heat-check-2.png"
import "./Homepage.css"

const Homepage = () => {
  const [address, setAddress] = useState("")

  return (
    <div className='homepage'>
      <img className='heatCheckLogo' src={heatLogo} alt="heat check logo"/>
      <form className='addressForm'>
        <input
          name='address'
          value={address}
          placeholder="Input address"
          onChange={(event) => setAddress(event.target.value)}
        />
        <button className='searchButton'>Search</button>
      </form>
    </div>
  )
}

export default Homepage