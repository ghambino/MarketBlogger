/* eslint-disable linebreak-style */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

function BlogToggle({ blog, handleBlogLike, handleBlogRemove }) {
  const [blogDetail, setBlogDetail] = useState(false)

  const blogDetailsToggle = () => {
    setBlogDetail(!blogDetail)
  }

  const removeButton = {
    backgroundColor: 'blue'
  }

  const containerStyle = {
    border: 'solid',
    paddingTop: 5,
    marginBottom: 5,
    padddingLeft: 3,
    borderWidth: 2,
    width: '50%'
  }
  return (
    <>
      {blogDetail === true ?
        <div key={blog.id} style={containerStyle} className='details'>
          <b>Title:</b> {blog.title} <button onClick={blogDetailsToggle}>hide</button><br />

          <b>Author:</b> {blog.author} <br />
          <b>Url:</b> {blog.url} <br />
          <b>likes:</b>{blog.likes} <button onClick={() => handleBlogLike(blog.id)}  className='buttonlike'>like</button>
          <br /> <br />
          <button style={removeButton} onClick={() => handleBlogRemove(blog.id)}>Remove</button>
        </div>
        :
        <div key={blog.id} style={containerStyle} className='default'>
          <b>Title:</b> {blog.title}
          <br />
          <b>Author:</b> {blog.author}
          <br />
          <button onClick={blogDetailsToggle}>show details</button>
        </div>
      }
    </>
  )
}

BlogToggle.propTypes = {
  handleBlogLike: PropTypes.func,
  handleBlogRemove: PropTypes.func,
  blog: PropTypes.object
}


export default BlogToggle
