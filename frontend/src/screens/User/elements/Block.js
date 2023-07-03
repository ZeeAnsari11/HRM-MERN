import React, { useState, useEffect } from 'react';
import { Toggler } from '../../../components/FormItems/Toggler';

function Block({ item, handleRestDays, selected }) {
  const [toggle, setToggler] = useState(selected);

  useEffect(() => {
    setToggler(selected);
  }, [selected]);

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <div
      key={item.index}
      onClick={() => {
        setToggler(!toggle);
        handleRestDays(item.index);
      }}
      className={classNames(
        toggle ? 'bg-gray-600 text-white' : 'bg-gray-100 text-black',
        'px-4 py-2 shadow-md text-center rounded-md cursor-pointer'
      )}
    >
      {item.name}
    </div>
  );
}

export default Block;
