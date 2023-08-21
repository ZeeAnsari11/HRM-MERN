import React from 'react'
import Theme from './sections/Theme'
import { defaultTheme } from '../../styles/theme'

const Settings = () => {
  return (
    <div>
      <Theme theme={defaultTheme}/>
    </div>
  )
}

export default Settings
