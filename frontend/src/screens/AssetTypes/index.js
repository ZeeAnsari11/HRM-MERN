import React, { useEffect, useState } from 'react';
import { selectCurrentUserOrg } from '../../states/reducers/slices/backend/UserSlice';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Table from '../../components/Table';
import { faArrowAltCircleRight, faEye } from '@fortawesome/free-solid-svg-icons';
import Modal from '../../components/Modal';
import ATForm from './ATForm';
import { createAssetType, getAssetTypesByOrgId } from '../../api/assetTypes';

const AssetTypes = () => {
  let orgId;
  orgId = useSelector(selectCurrentUserOrg);
  const [toggleChange, setToggleChange] = useState(false);
  const [assetTypes, setAssetTypes] = useState([]);
  const [formData, setFormData] = useState({
    type: '',
    organization: orgId,
  });

  useEffect(() => {
    LoadData()
  }, [toggleChange]);

  const changeToggler = () => {
    setToggleChange(!toggleChange);
  }

  let LoadData = () => {
    getAssetTypesByOrgId(orgId, setAssetTypes)
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateAssetType = (trigger) => {
    createAssetType(formData, changeToggler, trigger);
    setFormData({
      type: '',
      organization: orgId,
    });
  };
  const handleAction = (rowData) => {
    console.log();
  };

  const columns = [
    {
      Header: "Type",
      accessor: "type",
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

  const data = assetTypes.map(obj => ({
    type: obj.type,
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
        action="Create Asset Type"
        title="Create Asset Type"
        Element={<ATForm formData={formData} handleInputChange={handleInputChange} />}
        btnConfig={btnConfig}
      />
      <div className="bg-gray-100 text-gray-900">
      </div>
    </div>
  );
};

export default AssetTypes;
