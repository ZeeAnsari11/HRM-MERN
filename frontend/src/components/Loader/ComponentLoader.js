import React from 'react';
import Loader from '.';

const ComponentLoader = ({color='white'}) => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
        <Loader color={color}/>
    </div>
  )
}

export default ComponentLoader;
