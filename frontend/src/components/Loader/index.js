import React from 'react'
import ScaleLoader from 'react-spinners/ScaleLoader';

const Loader = ({color}) => {
  return (
    <div className='px-4'>
        <ScaleLoader height={'12px'} color={color}/>
    </div>
  )
}

export default Loader
