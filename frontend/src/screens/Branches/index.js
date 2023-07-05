import React, { useEffect, useState } from 'react';
import { selectCurrentUserOrg } from '../../states/reducers/slices/backend/UserSlice';
import { useSelector } from 'react-redux';
import { useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Table from './src/Table'
import { faArrowAltCircleRight, faEye } from '@fortawesome/free-solid-svg-icons';
import Countries from '../User/elements/Countries';
import { createBranch } from '../../api/branches';
import { getBranchesByOrgId } from '../../api/branches';

const Branches = () => {
  let orgId;
  orgId = useSelector(selectCurrentUserOrg);
  const [showModal, setShowModal] = useState(false);
  const [toggleChange, setToggleChange] = useState(false);
  const [departments, setDepartment] = useState([]);
  const [branches, setBranches] = useState([]);


  const [formData, setFormData] = useState({
    name: '',
    city: '',
    organization: orgId,
    country: '',
    description: ''
  });

  useEffect(() => {
    LoadData()
  }, [toggleChange]);

  const changeToggler = () => {
    setToggleChange(!toggleChange);
  }

  let LoadData = () => {
    getBranchesByOrgId(orgId, setBranches)
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateBranch = () => {
    createBranch(formData, changeToggler);
    setShowModal(false);
    setFormData({
      name: '',
      city: '',
      country: '',
      description: '',
    });
  };
  const handleAction = (rowData) => {

  };
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

  const data = branches.map(obj => ({
    name: obj.name,
    city: obj.city,
    description: obj.description,
    country: obj.country
  }));

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
          <div className="bg-white rounded p-8 relative z-20 h-[480px]">
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

                <label className="block text-sm font-bold mb-1">Country</label>
                <div className="h-10  flex border border-gray-200 rounded items-center mt-1">
                  <select
                    name="country"
                    id="country"
                    value={formData.country}
                    placeholder="Country"
                    onChange={handleInputChange}
                    className="px-4 outline-none text-gray-800 w-full bg-transparent"
                    required
                  >
                    <option value=''>Select Country</option>
                    <Countries />
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-bold mb-1">City</label>
                <input
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  type="text"
                  name="city"
                  id="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
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
            </form>
            <div className="flex justify-end">
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleCreateBranch}
              >
                Submit
              </button>
            </div>
          </div>


        </div>
      )}

      <div className={showModal ? 'mt-96 bg-opacity-50 ' : ''}>
        <div className="min-h-screen bg-gray-100 text-gray-900">
          <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <div className="mt-6">
              {/* <Table columns={columns} data={data} /> */}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Branches;
