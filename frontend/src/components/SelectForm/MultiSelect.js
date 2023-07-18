import { useEffect, useState } from 'react';
import { Listbox } from '@headlessui/react';
import { ChevronDown } from 'feather-icons-react';

export default function MultiSelect({handleInputChange, desiginations }) {
  const [selectedPeople, setSelectedPeople] = useState([]);
  console.log("=========desiginations========", desiginations);
  console.log("=========selectedPeople========", selectedPeople);
  useEffect(() => {
    handleInputChange({target: {name:"designations", value:selectedPeople}})
  }, [selectedPeople])
  return (
    <Listbox value={selectedPeople} onChange={setSelectedPeople} multiple>
      <Listbox.Button className="border border-gray-300 rounded-md px-3 py-2 w-full min-h-[42px] flex items-center justify-end focus:border-green-500 focus:border-2 justify-right">
        <div className="max-h-40 overflow-y-auto">
          {selectedPeople.map((id) => {
            const designation = desiginations.find((desig) => desig._id === id);
            return designation ? (
              <span className="inline-flex items-center bg-gray-200 text-gray-700 rounded-full text-sm font-medium px-2 py-1 mr-1 mb-1" key={id}>
                {designation.title}
                <span
                  className="ml-1 text-gray-500 hover:text-red-500 focus:outline-none"
                  onClick={() => {
                    const updatedSelection = selectedPeople.filter((sel) => sel !== id);
                    setSelectedPeople(updatedSelection);
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
      <Listbox.Options className="max-h-40 overflow-y-auto">
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
