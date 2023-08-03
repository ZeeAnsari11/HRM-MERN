import React, { useEffect, useState } from 'react';
import { createEmployeementType, getEmployementTypesByOrgId } from '../../api/employeementType';

import EmployeementTypeForm from './EmployeementTypeForm';
import EmployeementTypeView from './EmployeementTypeView';
import Modal from '../../components/Modal';
import Table from '../../components/Table';
import { selectCurrentUserOrg } from '../../states/reducers/slices/backend/UserSlice';
import { useSelector } from 'react-redux';

const EmployeementType = () => {
  let orgId;
  orgId = useSelector(selectCurrentUserOrg);
  const [toggleChange, setToggleChange] = useState(false);
  const [employmentTypes, setEmploymentTypes] = useState([]);
  const [formData, setFormData] = useState({
    employmentType: '',
    organization: orgId,
  });

  useEffect(() => {
    LoadData()
  }, [toggleChange]);

  const changeToggler = () => {
    setToggleChange(!toggleChange);
  }

  let LoadData = () => {
    getEmployementTypesByOrgId(orgId, setEmploymentTypes)
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateEmployeementType = (trigger) => {
    createEmployeementType(formData, changeToggler, trigger);
    setFormData({
      employmentType: '',
      organization: orgId,
    });
  };

  const columns = [
    {
      Header: 'Employment Type',
      accessor: 'employmentType',
    },
    {
      Header: 'Action',
      accessor: 'action',
      Cell: ({ row }) => (
        <EmployeementTypeView data={row.original}/>
      ),
    },
  ];
console.log("=======employmentTypes====",employmentTypes);
  const data = employmentTypes.map(obj => ({
    id: obj?._id,
    employmentType: obj?.employmentType,
  }));

  const btnConfig = [
    {
      title: 'Create',
      handler: handleCreateEmployeementType,
    }
  ]

  return (
    <div className='my-4'>
      <Modal
        action="Create Employeement Type"
        title="Create Employeement Type"
        Element={<EmployeementTypeForm formData={formData} handleInputChange={handleInputChange} />}
        btnConfig={btnConfig}
      />
      <div className="bg-gray-100 text-gray-900">
        <main className="mx-auto px-4 sm:px-6 pt-4">
          <Table columns={columns} data={data} />
        </main>
      </div>
    </div>
  );
};

export default EmployeementType;
