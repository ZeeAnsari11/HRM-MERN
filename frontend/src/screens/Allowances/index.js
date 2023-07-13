import React, { useEffect, useState } from 'react';
import { selectCurrentUserOrg } from '../../states/reducers/slices/backend/UserSlice';
import { useSelector } from 'react-redux';
import Table from '../../components/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight, faEye } from '@fortawesome/free-solid-svg-icons';
import Modal from '../../components/Modal';
import AllowanceForm from './AllowanceForm';
import { createAllowance, getAllowancesByOrgId } from '../../api/allowances';

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
  const handleAction = (rowData) => {
    console.log();
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
        <div className="flex items-center">
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
  const data = allowances.map(obj => ({
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
    <div className='my-4'>
      <Modal
        action="Create Allowance"
        title="Create Allowance"
        Element={<AllowanceForm formData={formData} handleInputChange={handleInputChange} />}
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

export default Allowances;