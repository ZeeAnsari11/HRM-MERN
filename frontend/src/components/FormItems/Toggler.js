import React, { useEffect, useState } from 'react'
import { Switch } from '@headlessui/react'

export const Toggler = ({title, name, handleInputChange}) => {
    const [enabled, setEnabled] = useState(false)
    useEffect(()=>{
        handleInputChange({target:{name, value:enabled}});
    }, [enabled])
    return (
      <Switch.Group>
        <div className="flex items-center">
          <Switch.Label className="mr-4">{title}</Switch.Label>
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`${
              enabled ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none hover:shadow-md`}
          >
            <span
              className={`${
                enabled ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </Switch>
        </div>
      </Switch.Group>
    )
}
