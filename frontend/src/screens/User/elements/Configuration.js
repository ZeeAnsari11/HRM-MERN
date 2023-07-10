import React from 'react'
import { Toggler } from '../../../components/FormItems/Toggler'

const Configuration = ({ formData, changePageNumber, handleInputChange, showButton }) => {
  return (
    <div>
      <Toggler
        title="Is Line Manager"
        name="isLineManager"
        handleInputChange={handleInputChange}
        value={formData.isLineManager}
        defaultChecked={formData.isLineManager}
      />
      <Toggler
        title="Is Head Of Department"
        name="isHOD"
        handleInputChange={handleInputChange}
        value={formData.isHOD}
        defaultChecked={formData.isHOD}
      />
      <Toggler
        title="Is Team Lead"
        name="isTeamLead"
        handleInputChange={handleInputChange}
        value={formData.isTeamLead}
        defaultChecked={formData.isTeamLead}
      />

      <div className='py-4'>
        {showButton ? <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={changePageNumber}>Submit</button> : ""}
      </div>
    </div>
  )
}

export default Configuration
