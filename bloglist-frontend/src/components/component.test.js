/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { prettyDOM } from '@testing-library/dom'
import BlogToggle from './BlogToggle'
import BlogForm from './BlogForm'

describe('blog display', () => {
  test('displaying title and author alone', () => {
    const blog = {
      title: 'the miscreant in eye of governance',
      author: 'abdulwahab abbas',
      url: 'www.grassrootinformant.com/7926',
      likes: 57
    }

    const component = render(
      <BlogToggle blog={blog}/>
    )
    // expect(component.container).toHaveTextContent('the miscreant in eye of governance')
    expect(component.container).not.toHaveTextContent('www.grassrootinformant.com/7926')
  })

  test('after clicking view button, details shows', () => {
    const blog = {
        title: 'the miscreant in eye of governance',
        author: 'abdulwahab abbas',
        url: 'www.grassrootinformant.com/7926',
        likes: 57
      }
  
      const component = render(
        <BlogToggle blog={blog}/>
      )
      const button = component.getByText('show details')
      fireEvent.click(button)

      expect(component.container).toHaveTextContent('www.grassrootinformant.com/7926')
  })
  test('when like buton is clicked twice', () => {
    const blog = {
        title: 'the miscreant in eye of governance',
        author: 'abdulwahab abbas',
        url: 'www.grassrootinformant.com/7926',
        likes: 57
      }
      const mockHandler = jest.fn()
  
      const component = render(
        <BlogToggle blog={blog} handleBlogLike={mockHandler}/>
      )
      const details = component.getByText('show details')
      fireEvent.click(details)

      const button = component.container.querySelector('.buttonlike')
      
      fireEvent.click(button)
      fireEvent.click(button)
    

      expect(mockHandler.mock.calls).toHaveLength(2)
  })
})

describe('blog creation testing', () => {
test('verifying blog input after creation', () => {
    const mockHandler = jest.fn()

    const component = render(
        <BlogForm handleBlogCreate={mockHandler} 
        setAuthor={mockHandler} 
        setTitle={mockHandler}
        setUrl={mockHandler}/>
    )
    const titleInput = component.container.querySelector('#title')
    const authorInput = component.container.querySelector('#author')
    const urlInput = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(titleInput, {
       target: {
           value: 'furnishing a new developed edifice brings brilliance into practice'
       } 
    })

    fireEvent.change(authorInput, {
        target: {
            value: 'abdulwahab abbas'
        } 
     })

     fireEvent.change(urlInput, {
        target: {
            value: 'www.globalfinancing.com'
        } 
     })

     fireEvent.submit(form)

     expect(mockHandler.mock.calls).toHaveLength(4)
    //  expect(mockHandler.mock.calls[0][0].title).toHaveTextContent('furnishing a new developed edifice brings brilliance into practice')
})
})
