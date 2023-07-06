import React from 'react'
import { Toggler } from '../../../components/FormItems/Toggler'

const Configuration = ({ formData, changePageNumber, handleInputChange,showButton }) => {
  return (
    <div>
      <Toggler title="Is Line Manager" name="isLineManager" handleInputChange={handleInputChange}/>
      <Toggler title="Is Head Of Department" name="isHOD" handleInputChange={handleInputChange}/>
      {showButton ? <button onClick={changePageNumber}>Submit</button> : ""}
      <Toggler title="Is Line Manager" name="isLineManager" handleInputChange={handleInputChange} />
      <div className='py-2'>
        <Toggler title="Is Team Lead" name="isTeamLead" handleInputChange={handleInputChange} />
      </div>
      <div className='py-4'>
        <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={changePageNumber}>Submit</button>
      </div>
    </div>
  )
}

export default Configuration
