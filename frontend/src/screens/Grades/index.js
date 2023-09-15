import React, { useEffect, useState } from 'react';
import { createAssetType, deleteAssetType, getAssetTypesByOrgId, updateAssetType } from '../../api/assetTypes';
import { createGrades, getGradesByOrgId, updateGrade } from '../../api/Grades';
import { faArrowAltCircleRight, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';

import ComponentLoader from '../../components/Loader/ComponentLoader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GradesForm from './GradesForm';
import Modal from '../../components/Modal';
import Table from '../../components/Table';
import { commonStyles } from '../../styles/common';
import { selectCurrentUserOrg } from '../../states/reducers/slices/backend/UserSlice';
import { useSelector } from 'react-redux';

const GradesViewForm = ({ data }) => {
  const [value, setValue] = useState(data.name);
  
  const [validationErrors, setValidationErrors] = useState({
    name: "",
  });
  const handleAssetTypeUpdate = (trigger) => {
    const newValidationErrors = {};
    if (value.trim() === "") {
      newValidationErrors.name = "Asset Type is required.";
    }
    if (Object.keys(newValidationErrors).length > 0) {
      // Set validation errors and prevent closing the modal
      setValidationErrors(newValidationErrors);
      trigger();
      return;
    }
    updateGrade(data.id, { name: value }, trigger)
  }
  const btnConfig = [
    {
      title: 'Update',
      handler: handleAssetTypeUpdate,
    }
  ]
  return (
    <div className="flex items-center space-x-2">
      <Modal
       action={<FontAwesomeIcon icon={faPencil} className="text-backgroundDark cursor-pointer hover:text-gray-600" />}
        title={'Update Asset Type'}
        Element={
          <form>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-1">Name</label>
            <input
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              type="text"
              name="name"
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
          if (!validationErrors?.name && value?.trim()) {
            closeModal()
          }
        }}
      />
      {
        //          DELETE BUTTON FUNCTIONALITY ALREADY IMPLEMENTED
      /* <button title='Delete'
        className="bg-transparent hover:bg-gray-200 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
        onClick={() => deleteAssetType(data.id)}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button> */}
    </div>
  )
}


const Grades = () => {
  let orgId;
  orgId = useSelector(selectCurrentUserOrg);
  const [toggleChange, setToggleChange] = useState(false);
  const [grades, setGrades] = useState([]);
  const [loader, setLoader] = useState(true)

  const [formData, setFormData] = useState({
    name: '',
    organization: orgId,
  });
  const [validationErrors, setValidationErrors] = useState({
    name: "",
  });
  useEffect(() => {
    getGradesByOrgId(orgId, setGrades)
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
  const handleCreateGrades = (trigger) => {
    const newValidationErrors = {};
    console.log("===formData=",formData);
    if (formData.name.trim() === "") {
      newValidationErrors.name = "Name is required.";
    }
    if (Object.keys(newValidationErrors).length > 0) {
      // Set validation errors and prevent closing the modal
      setValidationErrors(newValidationErrors);
      trigger();
      return;
    }
    createGrades(formData, changeToggler, trigger);
    setFormData({
      name: '',
      organization: orgId,
    });
  };
  const columns = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: ({ row }) => (
        <GradesViewForm data={row.original} />
      ),
    },
  ];
  const data = grades?.map(obj => ({
    id: obj._id,
    name: obj.name,
  }));
  const btnConfig = [
    {
      title: 'Create',
      handler: handleCreateGrades,
    }
  ]
  if(loader)
  return (
    <div className='my-4'>
       <Table data={data} columns={columns} element={
          <Modal
            action="Create Grade"
            title="Create Grade"
            Element={<GradesForm formData={formData} handleInputChange={handleInputChange} validationErrors={validationErrors}/>}
            btnConfig={btnConfig}
            btnStyle={commonStyles.btnDark}
            validationErrors={validationErrors}
        check={(closeModal) => {
          if (!validationErrors?.name && formData?.name.trim()) {
            closeModal()
          }
        }}
          />
       }/>
    </div>
  );
  else return <ComponentLoader color="black" />
};
export default Grades;