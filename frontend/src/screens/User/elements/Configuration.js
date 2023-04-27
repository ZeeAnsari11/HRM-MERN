import React from 'react'

const Configuration = ({ changePageNumber }) => {
  return (
    <div>
      Config
      <button onClick={changePageNumber}>Next</button>
    </div>
  )
}

export default Configuration
