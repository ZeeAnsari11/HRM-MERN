import React from 'react'
import { Toggler } from '../../../components/FormItems/Toggler'

const Configuration = ({ formData, changePageNumber, handleInputChange,showButton }) => {
  return (
    <div>
      <Toggler title="Is Line Manager" name="isLineManager" handleInputChange={handleInputChange}/>
      <Toggler title="Is Head Of Department" name="isHOD" handleInputChange={handleInputChange}/>
      {showButton ? <button onClick={changePageNumber}>Submit</button> : ""}
    </div>
  )
}

export default Configuration
