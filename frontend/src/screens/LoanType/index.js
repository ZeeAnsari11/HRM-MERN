import React, { useEffect, useState } from 'react';
import { createLoanType, getLoanTypesByOrgId } from '../../api/LoanType';

import LoanTypeForm from './LoanTypeForm';
import LoanTypeView from './LoanTypeView';
import Modal from '../../components/Modal';
import Table from '../../components/Table';
import axios from 'axios';
import { commonStyles } from '../../styles/common';
import { organizationRoutes } from '../../api/configuration';
import { selectCurrentUserOrg } from '../../states/reducers/slices/backend/UserSlice';
import { setOrganizationDesignation } from '../../states/reducers/slices/backend/Designation';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const LoanType = () => {
  let dispatcher = useDispatch();
  let orgId = useSelector(selectCurrentUserOrg);
  const [toggleChange, setToggleChange] = useState(false);
  const [desiginations, setDesiginations] = useState([]);
  const [loanTypes, setLoanTypes] = useState([]);
  const [formData, setFormData] = useState({
    type: '',
    organization: orgId,
  });
  const [validationErrors, setValidationErrors] = useState({
    type: "",
    designations: "",
});
  useEffect(() => {
    LoadData();
  }, [toggleChange]);

  const changeToggler = () => {
    setToggleChange(!toggleChange);
  };

  let LoadData = () => {
    axios
      .get(organizationRoutes.getDesignationsByOrgId + orgId)
      .then((rsp) => {
        dispatcher(setOrganizationDesignation(rsp.data.response));
        setDesiginations(rsp.data.response);
        getLoanTypesByOrgId(orgId, setLoanTypes);
      })
      .catch((e) => console.log(e));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear validation error when user starts typing again
    setValidationErrors({
        ...validationErrors,
        [name]: "",
    });
};


  const handleUpdateLoanType = (trigger) => {
    const newValidationErrors = {};
        if (formData.type.trim() === "") {
            newValidationErrors.type = "Type is required.";
        }
        if (formData.designations === "" || formData.designations == undefined || formData.designations.length <=0) {
            newValidationErrors.designations = "Select at least one designation";
        }

        if (Object.keys(newValidationErrors).length > 0) {
            // Set validation errors and prevent closing the modal
            setValidationErrors(newValidationErrors);
            trigger();
            return;
        }
        
    createLoanType(formData, changeToggler, trigger);
    setFormData({
      type: '',
      designations: '',
      organization: orgId,
    });
  };

  const columns = [
    {
      Header: 'Loan Type',
      accessor: 'type',
    },
    {
      Header: 'Designation(s)',
      accessor: 'designations',
      Cell: ({ value }) => {
        return (
          <div className='overflow-x-auto max-w-sm no-scrollbar cursor-all-scroll'>
            {
              value.map((val, index) => {
                return <div key={index} className="inline-flex items-center bg-gray-200 text-gray-700 rounded-full text-sm font-medium px-2 py-1 mr-1 mb-1">{val}</div>
              })
            }
          </div>
        )
      },
    },
    {
      Header: 'Action',
      accessor: 'action',
      Cell: ({ row }) => (
        <LoanTypeView orgId={orgId} data={row.original} desiginationsList={desiginations} />
      ),
    },
  ];

  const data = loanTypes.map((obj) => {
    const designationTitles = obj.designations.map((desigId) => {
      const designation = desiginations.find((desig) => desig._id === desigId);
      return designation ? designation.title : '';
    });

    return {
      id: obj._id,
      type: obj.type,
      designations: designationTitles,
    };
  });

  const btnConfig = [
    {
      title: 'Create',
      handler: handleUpdateLoanType,
    },
  ];
  return (
         <main className="mx-auto px-4 sm:px-6 lg:px-8 pt-4">
         <div className="mt-6">
             <Table columns={columns} data={data} element={
                 <Modal
                     action="Create Loan Type"
                     title="Create Loan Type"
                     btnStyle={commonStyles.btnDark}
                     Element={<LoanTypeForm formData={formData} handleInputChange={handleInputChange} desiginationsList={desiginations.filter((designation)=>designation.title!="")} validationErrors={validationErrors} />}
                     btnConfig={btnConfig}
                     validationErrors={validationErrors}
                     check={(closeModal) => {
                         if (!validationErrors?.type && !validationErrors?.designations && formData?.type.trim()) {
                             closeModal()
                         }
                     }}
                 />
             } />

         </div>
     </main>
  );
};

export default LoanType;
