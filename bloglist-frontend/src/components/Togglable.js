/* eslint-disable linebreak-style */
import React, { useState, useImperativeHandle } from 'react'

const Togglable= React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const hideWhenVisible = { display: visible ? 'none' : '' }

  const visibilityToggle = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      visibilityToggle
    }
  })

  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={visibilityToggle}>{props.label}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={visibilityToggle}>cancel</button>
      </div>
    </>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable
