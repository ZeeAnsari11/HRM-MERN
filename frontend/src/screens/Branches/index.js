import React, { useState } from 'react';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight, faEye } from '@fortawesome/free-solid-svg-icons';
import { Country, City } from 'country-state-city';
import Table from './src/Table'

const Branches = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    country: '',
    description: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateDesigination = () => {
    setShowModal(false);
    setFormData({
      name: '',
      city: '',
      country: '',
      description: '',
    });
  };

  const handleAction = (rowData) => {
    // Perform the desired action when an action button is clicked
    // ...
  };

  const cityOptions = City.getAllCities().map((city) => ({
    value: city.name,
    label: city.name,
  }));

  const countryOptions = Country.getAllCountries().map((country) => ({
    value: country.name,
    label: country.name,
  }));

  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'City',
      accessor: 'city',
    },
    {
      Header: 'Country',
      accessor: 'country',
    },
    {
      Header: 'Description',
      accessor: 'description',
    },
    {
      Header: 'Action',
      accessor: 'action',
      Cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <div className="pr-2">
            <button
              className="bg-transparent hover:bg-gray-200 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
              onClick={() => handleAction(row.original)}
            >
              <FontAwesomeIcon icon={faArrowAltCircleRight} />
            </button>
          </div>
          <button
            className="bg-transparent hover:bg-gray-200 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
            onClick={() => handleAction(row.original)}
          >
            <FontAwesomeIcon icon={faEye} />
          </button>
        </div>
      ),
    },
  ];

  const data = []

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setShowModal(!showModal)}
      >
        Create Branch
      </button>

      {showModal && (
        <div className="bg-opacity-50 absolute inset-0">
          <div className="bg-opacity-30 absolute inset-0"></div>
          <div className="bg-white rounded p-8 relative">
            <h2 className="text-lg font-bold mb-4">Create Branch</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-1">Name</label>
                <input
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-1">City</label>
                <Select
                  options={cityOptions}
                  value={formData.city}
                  onChange={(selectedOption) =>
                    setFormData({ ...formData, city: selectedOption })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-1">Country</label>
                <Select
                  options={countryOptions}
                  value={formData.country}
                  onChange={(selectedOption) =>
                    setFormData({ ...formData, country: selectedOption })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-1">
                  Description
                </label>
                <textarea
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <div className="mt-6">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
                  onClick={handleCreateDesigination}
                >
                  Create
                </button>
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Table columns={columns} data={data} />
    </div>
  );
};

export default Branches;
