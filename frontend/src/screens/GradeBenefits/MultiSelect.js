import { useEffect, useState } from 'react';

import { ChevronDown } from 'feather-icons-react';
import { Listbox } from '@headlessui/react';

export default function MultiSelect({ handleInputChange, grades, formData }) {

  const [selectedPeople, setSelectedPeople] = useState([]);
  
  useEffect(() => {
    if (formData.grade) {
      const initialSelected = grades.filter((grade) => formData.grade.includes(grade.name)).map((grade) => grade._id);
      setSelectedPeople(initialSelected);
      formData.grade = initialSelected
    }
    else {
      setSelectedPeople([]);
    }
  },[]);
  
  const handleChange = (newSelectedPeople) => {
    setSelectedPeople(newSelectedPeople);
    handleInputChange({ target: { name: "grade", value: newSelectedPeople } });
  };


  return (
    <Listbox value={selectedPeople} onChange={handleChange} multiple>
      <Listbox.Button className="border border-gray-300 rounded-md px-3 py-2 w-full min-h-[42px] flex items-center justify-end focus:border-green-500 focus:border-2 justify-right">
        <div className="max-h-40 overflow-y-auto">
          {selectedPeople.map((id, index) => {
            const grade = grades.find((desig) => desig._id === id);
            return grade ? (
              <span key={index} className="inline-flex items-center bg-gray-200 text-gray-700 rounded-full text-sm font-medium px-2 py-1 mr-1 mb-1">
                {grade.name}
                <span
                  className="ml-1 text-gray-500 hover:text-red-500 focus:outline-none"
                  onClick={() => {
                    const updatedSelection = selectedPeople.filter((sel) => sel !== id);
                    setSelectedPeople(updatedSelection);
                    handleInputChange({ target: { name: "grade", value: updatedSelection } });
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
        {grades.map((grade) => (
          <Listbox.Option
            key={grade._id}
            value={grade._id}
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            {grade.name}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}
