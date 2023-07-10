import { useState, useEffect } from 'react';
import Block from './Block';

const plans = [
  {
    index: 1,
    name: 'Monday',
  },
  {
    index: 2,
    name: 'Tuesday',
  },
  {
    index: 3,
    name: 'Wednesday',
  },
  {
    index: 4,
    name: 'Thursday',
  },
  {
    index: 5,
    name: 'Friday',
  },
  {
    index: 6,
    name: 'Saturday',
  },
  {
    index: 7,
    name: 'Sunday',
  },
];

export default function RestDays({ handleInputChange, value }) {
  const [restDays, setRestDays] = useState([]);

  useEffect(() => {
    // Set the preselected values when the component mounts or when the prop value changes
    setRestDays(value || []);
  }, [value]);

  const handleRestDays = (index) => {
    if (restDays.includes(index)) {
      const updatedRestDays = restDays.filter((day) => day !== index);
      setRestDays(updatedRestDays);

      handleInputChange({ target: { name: 'roaster', value: { restDays: updatedRestDays } } });
    } else {
      const updatedRestDays = [...restDays, index];
      setRestDays(updatedRestDays);

      handleInputChange({ target: { name: 'roaster', value: { restDays: updatedRestDays } } });
    }
  };

  return (
    <div className='grid grid-cols-5 mobile:grid-cols-2 tablet:grid-cols-3 mx-auto gap-4 py-2'>
      {plans.map((item) => (
        <Block
          handleRestDays={handleRestDays}
          key={item.index}
          item={item}
          selected={restDays.includes(item.index)}
        />
      ))}
    </div>
  );
}

