import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import BackgroundShifter from './sections/BackgroundShifter'
import LogoSetting from './sections/LogoSetting'
import Theme from './sections/Theme'
import axios from 'axios'
import { base } from '../../api/configuration'
import { defaultTheme } from '../../styles/theme'
import { getCurrentUser } from '../../api/user'
import { selectBackground } from '../../states/reducers/slices/backend/UserSlice'

const Settings = () => {
  const [imgAddresses, setImageAddresses] = useState([])
  const selectedBg = useSelector(selectBackground);
  const isExperimentEnabled = localStorage.getItem('experiment');
  const dispatcher = useDispatch();
  
  useEffect(() => {
    axios.get(base + 'api/v1/bg-shifters')
      .then((response) => {
        setImageAddresses(response.data.response.map((data) => data.imgAddress))
        getCurrentUser(dispatcher);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])
  
  return (
    <div>
      <Theme theme={defaultTheme} />
      {isExperimentEnabled === "true" && imgAddresses.length > 0 && <BackgroundShifter imgAddresses={['default',...imgAddresses]} selectedBg={selectedBg} />}
      <LogoSetting />
    </div>
  )
}

export default Settings
