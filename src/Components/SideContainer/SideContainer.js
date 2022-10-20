import React from 'react'
import {gql, useQuery} from '@apollo/client'
import { Link } from 'react-router-dom'
import Loading from '../Loading/Loading'
import "./SideContainer.css"

const SideContainer = ({search,restaurantInApp}) => {
  // const [user, setUser] = useState("1")

  const GET_USER = gql`
  query {
    user(id: "1") {
      id
      email
      username
    }
  }
  `;

  function UserFunction() {
    const { loading, error, data } = useQuery(GET_USER);
    if (loading) return <Loading />;
    if (error) return <p>Error :(</p>;
    console.log(data)
    // setUser(data)
    return data.user.username.toUpperCase()
  }
    //add conidtional rendering to not show restaurant button if search is not defined
  return (
    <div className='sideBar'>
      <h2>Welcome, <UserFunction/>! </h2>
        <button className='sideButton'><Link className="navigation" to={`/`}>Homepage</Link></button>
        {search && <button className='sideButton'><Link className="navigation" to={`/search/${search}`}>Restaurants</Link></button>}
        {restaurantInApp && <button className='sideButton'><Link className="navigation" to={`/restaurant/${restaurantInApp}`}>Last Restaurant</Link></button>}
    </div>
  )
}

export default SideContainer