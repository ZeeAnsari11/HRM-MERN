import React from 'react'
import { Toggler } from '../../../components/FormItems/Toggler'

const Configuration = ({ changePageNumber, handleInputChange }) => {
  return (
    <div>
      <Toggler title="Is Line Manager" name="isLineManager" handleInputChange={handleInputChange}/>
      <Toggler title="Is Head Of Department" name="isHOD" handleInputChange={handleInputChange}/>
      <button onClick={changePageNumber}>Submit</button>
    </div>
  )
}

export default Configuration
