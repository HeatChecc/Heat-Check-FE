import React, { useState } from 'react'
import Modal from "react-modal"
import { gql, useLazyQuery} from '@apollo/client'
import './Login.css'

const Login = ({signIn, setSignIn, setUser}) => {
  const [isOpen, setIsOpen] = useState(false)
  const USER_CHECK = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      email
      username
    }
  }
  `;

  function LoginForm() {
    const [userIdInput, setUserIdInput] = useState('')
    const [getUser, { loading, error }] = useLazyQuery(USER_CHECK);
    // const [errorMessage, setErrorMessage] = useState('')

    const loginSubmit = (event) => {
      event.preventDefault()
      if (!userIdInput) {
        return
      }
      getUser({ variables: {
        id: parseInt(userIdInput)
      }}).then(res => { 
        console.log('res', res)
        if (res.error) {
          return // setErrorMessage(res.error)
        }
        setUser(res.data)
        setSignIn(true)
        setIsOpen(false)
      })
    }
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p className='errorText'> *error... please refresh page* </p>;
  
    return (
      <div>
        <form className='loginForm' >
        <input
            className='loginInput'
            placeholder='userId'
            value={userIdInput}
            onChange={(event) => setUserIdInput(event.target.value)}
            name='idInput'
          ></input>
        <button className="logInButton" onClick={(e) => loginSubmit(e)}>
          Login
        </button>
        </form>
      </div>
    );
  }

  const LogOut = () => {
    setUser({})
    setSignIn(false)
  }

  return (
  <div className='login'>
    {!signIn && <button className='signInButton' onClick={() => setIsOpen(true)}>Sign In</button>}
    {signIn && <button className='signOutButton' onClick={() => LogOut()}>Sign Out</button>}
    <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="My dialog"
        className="loginModal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
    >
      {LoginForm()}
    </Modal>
  </div>
  )
}

export default Login