import React, { useEffect, useState } from 'react';
import { createAssetType, deleteAssetType, getAssetTypesByOrgId, updateAssetType } from '../../api/assetTypes';
import { faArrowAltCircleRight, faTrash } from '@fortawesome/free-solid-svg-icons';

import ATForm from './ATForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '../../components/Modal';
import Table from '../../components/Table';
import { commonStyles } from '../../styles/common';
import { selectCurrentUserOrg } from '../../states/reducers/slices/backend/UserSlice';
import { useSelector } from 'react-redux';

const AssetTypeForm = ({ data }) => {
  const [value, setValue] = useState(data.type);
  const [validationErrors, setValidationErrors] = useState({
    type: "",
  });
  const handleAssetTypeUpdate = (trigger) => {
    const newValidationErrors = {};
    if (value.trim() === "") {
      newValidationErrors.name = "Asset Type is required.";
    }
    if (Object.keys(newValidationErrors).length > 0) {
      console.log("=========",newValidationErrors);
      // Set validation errors and prevent closing the modal
      setValidationErrors(newValidationErrors);
      trigger();
      return;
    }
    updateAssetType(data.id, { type: value }, trigger)
  }
  const btnConfig = [
    {
      title: 'Update',
      handler: handleAssetTypeUpdate,
    }
  ]
  return (
    <div className="flex items-center justify-center space-x-2">
      <Modal
        action={<FontAwesomeIcon icon={faArrowAltCircleRight} />}
        title={'Update Asset Type'}
        Element={
          <form>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-1">Type</label>
            <input
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              type="text"
              name="type"
              value={value}
             onChange={(e) => setValue(e.target.value)}
              required
            />
            {validationErrors.name && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.name}</p>
                )}
          </div>
        </form>}
        btnConfig={btnConfig}
        check={(closeModal) => {
          if (!validationErrors?.type && value?.trim()) {
            closeModal()
          }
        }}
      />
      <button title='Delete'
        className="bg-transparent hover:bg-gray-200 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
        onClick={() => deleteAssetType(data.id)}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  )
}


const AssetTypes = () => {
  let orgId;
  orgId = useSelector(selectCurrentUserOrg);
  const [toggleChange, setToggleChange] = useState(false);
  const [assetTypes, setAssetTypes] = useState([]);
  const [formData, setFormData] = useState({
    type: '',
    organization: orgId,
  });
  const [validationErrors, setValidationErrors] = useState({
    type: "",
  });
  useEffect(() => {
    getAssetTypesByOrgId(orgId, setAssetTypes)
  }, [toggleChange]);
  const changeToggler = () => {
    setToggleChange(!toggleChange);
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
  const handleCreateAssetType = (trigger) => {
    const newValidationErrors = {};
    if (formData.type.trim() === "") {
      newValidationErrors.name = "Asset Type is required.";
    }
    if (Object.keys(newValidationErrors).length > 0) {
      // Set validation errors and prevent closing the modal
      setValidationErrors(newValidationErrors);
      trigger();
      return;
    }
    createAssetType(formData, changeToggler, trigger);
    setFormData({
      type: '',
      organization: orgId,
    });
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
        <AssetTypeForm data={row.original} />
      ),
    },
  ];
  const data = assetTypes?.map(obj => ({
    id: obj._id,
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
       <Table data={data} columns={columns} element={
          <Modal
            action="Create Asset Type"
            title="Create Asset Type"
            Element={<ATForm formData={formData} handleInputChange={handleInputChange} validationErrors={validationErrors}/>}
            btnConfig={btnConfig}
            btnStyle={commonStyles.btnDark}
            validationErrors={validationErrors}
        check={(closeModal) => {
          if (!validationErrors?.type && formData?.type.trim()) {
            closeModal()
          }
        }}
          />
       }/>
    </div>
  );
};
export default AssetTypes;