import React, { useState } from 'react';

import { Switch } from '@headlessui/react';

export const Toggler = ({ title, name, handleInputChange, value }) => {
  const [enabled, setEnabled] = useState(value || false);

  const handleToggle = () => {
    const updatedValue = !enabled;
    setEnabled(updatedValue);
    handleInputChange({ target: { name, value: updatedValue } });
  };

  return (
    <Switch.Group>
      <div className="flex items-center space-x-3">
        <Switch
          checked={enabled}
          onChange={handleToggle}
          className={`${
            enabled ? 'bg-primaryColorLight' : 'bg-gray-200'
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none hover:shadow-md`}
        >
          <span
            className={`${
              enabled ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
          />
        </Switch>
        <Switch.Label className="mr-4">{title}</Switch.Label>
      </div>
    </Switch.Group>
  );
};
