import React, { useEffect, useState } from 'react';

import BranchesView from './BranchesView';
import CBForm from './CBForm';
import Modal from '../../components/Modal';
import Table from '../../components/Table';
import { createBranch } from '../../api/branches';
import { getBranchesByOrgId } from '../../api/branches';
import { selectCurrentUserOrg } from '../../states/reducers/slices/backend/UserSlice';
import { useSelector } from 'react-redux';

const Branches = () => {
  let orgId;
  orgId = useSelector(selectCurrentUserOrg);
  const [toggleChange, setToggleChange] = useState(false);
  const [branches, setBranches] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    organization: orgId,
    country: '',
    description: ''
  });
  const [validationErrors, setValidationErrors] = useState({
    name: '',
    city: '',
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
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear validation error when user starts typing again
    setValidationErrors({
      ...validationErrors,
      [name]: "",
    });
  };

  const handleCreateBranch = (trigger) => {
    const newValidationErrors = {};
    if (formData.name.trim() === "") {
      newValidationErrors.name = "Name is required.";
    }
    if (formData.city.trim() === "") {
      newValidationErrors.city = "City Name is required.";
    }
    if (formData.country.trim() === "") {
      newValidationErrors.country = "Country Name is required.";
    }
    if (formData.description.trim() === "") {
      newValidationErrors.description = "Description Name is required.";
    }

    if (Object.keys(newValidationErrors).length > 0) {
      // Set validation errors and prevent closing the modal
      setValidationErrors(newValidationErrors);
      trigger();
      return;
    }
    createBranch(formData, changeToggler, trigger);
    setFormData({
      name: '',
      city: '',
      country: '',
      description: '',
      organization: orgId,
    });
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
        <BranchesView data={row.original} />
      ),
    },
  ];

  const data = branches.map(obj => ({
    id: obj._id,
    name: obj.name,
    city: obj.city,
    description: obj.description,
    country: obj.country
  }));

  const btnConfig = [
    {
      title: 'Create',
      handler: handleCreateBranch,
    }
  ]

  return (
    <div className='my-4'>
      <Modal
        action="Create Branch"
        title="Create Branch"
        Element={<CBForm formData={formData} handleInputChange={handleInputChange} validationErrors={validationErrors} />}
        btnConfig={btnConfig}
        validationErrors={validationErrors}
        check={(closeModal) => {
          if (!validationErrors?.name && !validationErrors?.city && !validationErrors?.country && !validationErrors?.description && formData?.name.trim() && formData?.city.trim() && formData?.country.trim() && formData?.description.trim()) {
            closeModal()
          }
        }}
      />
      <div className="bg-gray-100 text-gray-900">
        <main className="mx-auto px-4 sm:px-6 pt-4">
          <Table columns={columns} data={data} />
        </main>
      </div>
    </div>
  );
};

export default Branches;
