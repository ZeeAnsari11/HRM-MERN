import React from 'react'
import { Toggler } from '../../../components/FormItems/Toggler'
import { commonStyles } from '../../../styles/common'

const Configuration = ({ disabled, formData, changePageNumber, handleInputChange, showButton }) => {
  
  return (
    <div className='space-y-2'>
      <Toggler
        title="Is Line Manager"
        name="isLineManager"
        handleInputChange={handleInputChange}
        value={formData.isLineManager}
        defaultChecked={formData.isLineManager}
        disabled={disabled}
      />
      <Toggler
        title="Is Head Of Department"
        name="isHOD"
        handleInputChange={handleInputChange}
        value={formData.isHOD}
        defaultChecked={formData.isHOD}
        disabled={disabled}
      />
      <Toggler
        title="Is Team Lead"
        name="isTeamLead"
        handleInputChange={handleInputChange}
        value={formData.isTeamLead}
        defaultChecked={formData.isTeamLead}
        disabled={disabled}
      />

      <div className='py-4'>
        {showButton ? <button className={commonStyles.btnDark} disabled={disabled} onClick={changePageNumber}>Submit</button> : ""}
      </div>
    </div>
  )
}

export default Configuration
