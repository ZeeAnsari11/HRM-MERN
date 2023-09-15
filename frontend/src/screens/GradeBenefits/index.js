import React, { useEffect, useState } from 'react';
import { createGradeBenefit, getgradeBenefitsByOrgId } from '../../api/gradeBenefits';
import { createLoanType, getLoanTypesByOrgId } from '../../api/LoanType';

import ComponentLoader from '../../components/Loader/ComponentLoader';
import GradeBenefitsForm from './GradeBenefitsForm';
import GradeBenefitsView from './GradeBenefitsView';
import LoanTypeView from './GradeBenefitsView';
import Modal from '../../components/Modal';
import Table from '../../components/Table';
import axios from 'axios';
import { commonStyles } from '../../styles/common';
import { organizationRoutes } from '../../api/configuration';
import { selectCurrentUserOrg } from '../../states/reducers/slices/backend/UserSlice';
// import { setOrganizationDesignation } from '../../states/reducers/slices/backend/Designation';
// import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const GradeBenefits = () => {
  // let dispatcher = useDispatch();
  let orgId = useSelector(selectCurrentUserOrg);
  const [toggleChange, setToggleChange] = useState(false);
  const [grades, setGrades] = useState([]);
  const [gradeBenefits, setGradeBenefits] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    organization: orgId,
  });
  const [validationErrors, setValidationErrors] = useState({
    name: '',
    grade: '',
    description: '',
  });
  console.log("======formData==========", formData);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    LoadData();
  }, [toggleChange]);

  const changeToggler = () => {
    setToggleChange(!toggleChange);
  };

  const loanLoader = () => {
    setLoader(false)
  }

  let LoadData = () => {
    axios
      .get(organizationRoutes.getGradesByOrgId + orgId)
      .then((rsp) => {
        // dispatcher(setOrganizationDesignation(rsp.data.response));
        setGrades(rsp.data.grades);
        getgradeBenefitsByOrgId(orgId, setGradeBenefits, loanLoader);
      })
      .catch((e) => console.log(e));
  };
  console.log("===", grades);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear validation error when user starts typing again
    setValidationErrors({
      ...validationErrors,
      [name]: "",
    });
  };


  const handleCreateGradeBenefit = (trigger) => {
    console.log("================111111=2222222=========");
    const newValidationErrors = {};
    if (formData.name.trim() === "") {
      newValidationErrors.name = "Name is required.";
    }
    if (formData.description.trim() === "") {
      newValidationErrors.description = "Description is required.";
    }
    if (formData.grade === "" || formData.grade == undefined || formData.grade.length <= 0) {
      newValidationErrors.grade = "Select at least one grade";
    }
    if (Object.keys(newValidationErrors).length > 0) {
      // Set validation errors and prevent closing the modal
      setValidationErrors(newValidationErrors);
      trigger();
      return;
    }
    createGradeBenefit(formData, changeToggler, trigger);
    setFormData({
      name: '',
      grade: '',
      description: '',
    });
  };

  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Description',
      accessor: 'description',
    },
    {
      Header: 'Grade(s)',
      accessor: 'grade',
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
        <GradeBenefitsView orgId={orgId} data={row.original} gradesList={grades} />
      ),
    },
  ];


  const data = gradeBenefits.map((obj) => {
    const gradesTitles = obj.grade.map((gradeId) => {
      const grade = grades.find((gradeVal) => gradeVal._id === gradeId);
      return grade ? grade.name : '';
    });
    return {
      id: obj._id,
      name: obj.name,
      description: obj.description,
      grade: gradesTitles,
    };
  });

  const btnConfig = [
    {
      title: 'Create',
      handler: handleCreateGradeBenefit,
    },
  ];
  if (!loader)
    return (
      <main className="mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="mt-6">
          <Table columns={columns} data={data} element={
            <Modal
              action="Create Grade Benefit"
              title="Create Grade Benefit"
              btnStyle={commonStyles.btnDark}
              Element={<GradeBenefitsForm formData={formData} handleInputChange={handleInputChange} gradesList={grades} validationErrors={validationErrors} />}
              btnConfig={btnConfig}
              validationErrors={validationErrors}
              check={(closeModal) => {
                if (!validationErrors?.name && !validationErrors?.grade && formData?.name.trim() && formData?.grade) {
                  closeModal()
                }
              }}
            />
          } />

        </div>
      </main>
    );
  else return <ComponentLoader color="black" />
};

export default GradeBenefits;
