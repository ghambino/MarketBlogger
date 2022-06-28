/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blog'
import Login from './components/Login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)


  useEffect(() => {
    const fetchData = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const loggedUserDetails = window.localStorage.getItem('loginUserDetails')
    if (loggedUserDetails){
      const user = JSON.parse(loggedUserDetails)
      console.log(user.token)
      setUser(user)
      blogService.generateToken(user.token)
    }
  }, [])

  const handleLogoutClick = event => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loginUserDetails')
  }


  return (
    <>
      {notification}

      {errorMessage}

      {user === null ?
        <div>
          <Login
            setUser={setUser}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            setNotification={setNotification}/>
        </div> :
        <div>
          <Blog
            blogs={blogs}
            setBlogs={setBlogs}
            user={user}
            setUser={setUser}
            handleLogout={handleLogoutClick}
            setErrorMessage={setErrorMessage}
            setNotification={setNotification}/>
        </div>

      }
    </>
  )
}

export default App