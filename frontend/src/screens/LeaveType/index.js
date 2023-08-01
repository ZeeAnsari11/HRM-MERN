import React, { useEffect, useState } from 'react';
import { createLeaveType, getLeaveTypeByOrgId } from '../../api/leaveType';

import LTForm from './LTForm';
import LeaveTypeView from './LeaveTypeView';
import Modal from '../../components/Modal';
import Table from '../../components/Table';
import { selectCurrentUserOrg } from '../../states/reducers/slices/backend/UserSlice';
import { useSelector } from 'react-redux';

const LeaveType = () => {
  let orgId;
  orgId = useSelector(selectCurrentUserOrg);
  const [toggleChange, setToggleChange] = useState(false);
  const [leaveType, setLeaveType] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    shortName: '',
    organization: orgId,
    accumulativeCount: '',
  });

  useEffect(() => {
    LoadData()
  }, [toggleChange]);

  const changeToggler = () => {
    setToggleChange(!toggleChange);
  }

  let LoadData = () => {
    getLeaveTypeByOrgId(orgId, setLeaveType)
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleCreateLeaveType = (trigger) => {
    createLeaveType(formData, changeToggler, trigger);
    setFormData({
      name: '',
      shortName: '',
      organization: orgId,
      accumulativeCount: '',
    });
  };

  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Short Name',
      accessor: 'shortName',
    },
    {
      Header: 'Accumulative Count',
      accessor: 'accumulativeCount',
    },
    {
      Header: 'Action',
      accessor: 'action',
      Cell: ({ row }) => (
        <LeaveTypeView data={row.original}/>
      )
    },
  ];

  const data = leaveType.map(obj => ({
    id: obj._id,
    name : obj.name,
    shortName: obj.shortName,
    accumulativeCount: obj.accumulativeCount,
  }));

  const btnConfig = [
    {
      title: 'Create',
      handler: handleCreateLeaveType,
    }
  ]
  
  return (
    <div className='my-4'>
      <Modal
        action="Create Leave Type"
        title="Create Leave Type"
        Element={<LTForm formData={formData} handleInputChange={handleInputChange} />}
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

export default LeaveType;
