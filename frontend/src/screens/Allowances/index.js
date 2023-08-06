import React, { useEffect, useState } from 'react';
import { createAllowance, getAllowancesByOrgId } from '../../api/allowances';

import AllowanceForm from './AllowanceForm';
import AllowanceView from './AllowanceView';
import Modal from '../../components/Modal';
import Table from '../../components/Table';
import { commonStyles } from '../../styles/common';
import { selectCurrentUserOrg } from '../../states/reducers/slices/backend/UserSlice';
import { useSelector } from 'react-redux';

const Allowances = () => {
  let orgId;
  orgId = useSelector(selectCurrentUserOrg);
  const [toggleChange, setToggleChange] = useState(false);
  const [allowances, setAllowances] = useState([]);
  const [formData, setFormData] = useState({
    allowanceName: '',
    percrentageOfBaseSalary: '',
    organization: orgId,
  });

  useEffect(() => {
    LoadData()
  }, [toggleChange]);

  const changeToggler = () => {
    setToggleChange(!toggleChange);
  }

  let LoadData = () => {
    getAllowancesByOrgId(orgId, setAllowances)
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateAssetType = (trigger) => {
    createAllowance(formData, changeToggler, trigger);
    setFormData({
      allowanceName: '',
      percrentageOfBaseSalary: '',
      organization: orgId,
    });
  };

  const columns = [
    {
      Header: "Name",
      accessor: "allowanceName",
    },
    {
      Header: "Percrentage Of Base Salary (%)",
      accessor: "percrentageOfBaseSalary",
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: ({ row }) => (
        <AllowanceView data={row.original} />
    ),
    },
  ];
  const data = allowances.map(obj => ({
    id: obj._id,
    allowanceName : obj.allowanceName,
    percrentageOfBaseSalary : obj.percrentageOfBaseSalary
  }));

  const btnConfig = [
    {
      title: 'Create',
      handler: handleCreateAssetType,
    }
  ]

  return (
      <main className="py-4">
          <Table columns={columns} data={data} element={
             <Modal
             action="Create Allowance"
             title="Create Allowance"
             btnStyle={commonStyles.btnDark}
             Element={<AllowanceForm formData={formData} handleInputChange={handleInputChange} />}
             btnConfig={btnConfig}
           />
          }/>
        </main>
  );
};

export default Allowances;