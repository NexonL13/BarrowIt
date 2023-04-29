import React from 'react'

const TextError = (props) => {
  return (
    <>
    <p className="text-red-600 text-md italic capitalize">{`${props.children}.`}</p>
    </>
  )
}

export default TextError