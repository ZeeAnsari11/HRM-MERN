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

  const handleCreateAssetType = () => {
    createAllowance(formData, changeToggler);
    setFormData({
      allowanceName: '',
      percrentageOfBaseSalary: '',
      organization: orgId,
    });
  };
  const handleAction = (rowData) => {
    console.log();
  };

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
        
      </div>
    </div>
  );
};

export default Allowances;