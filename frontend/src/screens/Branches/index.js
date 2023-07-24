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

  const handleCreateBranch = (trigger) => {
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
        <BranchesView data={row.original}/>
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
        Element={<CBForm formData={formData} handleInputChange={handleInputChange} />}
        btnConfig={btnConfig}
      />
      <div className="bg-gray-100 text-gray-900">
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <Table columns={columns} data={data} />
        </main>
      </div>
    </div>
  );
};

export default Branches;
