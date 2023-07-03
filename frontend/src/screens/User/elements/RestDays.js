import { useEffect, useState } from 'react'
import Block from './Block'

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
]

export default function RestDays({handleInputChange,}) {
    const [restDays, setRestDays] = useState([])

    useEffect(() => {
      handleInputChange({target: {name:'userRoster', value:{restDays:restDays, timeSlots:''}}});
    }, [restDays])

    const handleRestDays = (index) => {
        const actual_index = restDays.indexOf(index);
        if (actual_index !== -1) {
          let arr = restDays.map(e=>e);
          arr.splice(actual_index, 1)
          setRestDays(arr);
        }
        else setRestDays([...restDays, index])
    }
    return (
      <div className='grid grid-cols-5 mobile:grid-cols-2 tablet:grid-cols-3 mx-auto gap-4 py-2'>
        {
            plans.map((item) => {
                return (
                    <Block handleRestDays={handleRestDays} key={item.index} item={item}/>
                )
            })
        }
      </div>
  )
}