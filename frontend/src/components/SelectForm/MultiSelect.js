import { useEffect, useState } from 'react';
import { Listbox } from '@headlessui/react';
import { ChevronDown } from 'feather-icons-react';

export default function MultiSelect({ handleInputChange, desiginations, formData }) {

  const [selectedPeople, setSelectedPeople] = useState([]);

  useEffect(() => {
    if (formData.designations) {
      const initialSelected = desiginations
        .filter((designation) => formData.designations.includes(designation.title))
        .map((designation) => designation._id);
      setSelectedPeople(initialSelected);
    }
    else {
      setSelectedPeople([]);
    }
  },[]);
  const handleChange = (newSelectedPeople) => {
    setSelectedPeople(newSelectedPeople);
    handleInputChange({ target: { name: "designations", value: newSelectedPeople } });
  };


  return (
    <Listbox value={selectedPeople} onChange={handleChange} multiple>
      <Listbox.Button className="border border-gray-300 rounded-md px-3 py-2 w-full min-h-[42px] flex items-center justify-end focus:border-green-500 focus:border-2 justify-right">
        <div className="max-h-40 overflow-y-auto">
          {selectedPeople.map((id, index) => {
            const designation = desiginations.find((desig) => desig._id === id);
            return designation ? (
              <span key={index} className="inline-flex items-center bg-gray-200 text-gray-700 rounded-full text-sm font-medium px-2 py-1 mr-1 mb-1">
                {designation.title}
                <span
                  className="ml-1 text-gray-500 hover:text-red-500 focus:outline-none"
                  onClick={() => {
                    const updatedSelection = selectedPeople.filter((sel) => sel !== id);
                    setSelectedPeople(updatedSelection);
                    handleInputChange({ target: { name: "designations", value: updatedSelection } });
                  }}
                >
                  &#x2716;
                </span>
              </span>
            ) : null;
          })}
        </div>
        <ChevronDown size={20} className="" />
      </Listbox.Button>
      <Listbox.Options className="max-h-40 overflow-y-auto border">
        {desiginations.map((designation) => (
          <Listbox.Option
            key={designation._id}
            value={designation._id}
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            {designation.title}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}
