import React, { useEffect, useState } from 'react';
import { selectCurrentUserOrg } from '../../states/reducers/slices/backend/UserSlice';
import { useSelector } from 'react-redux';
import Table from '../../components/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight, faEye } from '@fortawesome/free-solid-svg-icons';
import Modal from '../../components/Modal';
import LoanTypeForm from './LoanTypeForm';
import { createLoanType, getLoanTypesByOrgId } from '../../api/LoanType';
import { organizationRoutes } from '../../api/configuration';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setOrganizationDesignation } from '../../states/reducers/slices/backend/Designation';

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateAssetType = (trigger) => {
    createLoanType(formData, changeToggler, trigger);
    setFormData({
      type: '',
      organization: orgId,
    });
  };

  const handleAction = (rowData) => {
    console.log("======rowData======",rowData);
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

  const data = loanTypes.map((obj) => {
    const designationTitles = obj.designations.map((desigId) => {
      const designation = desiginations.find((desig) => desig._id === desigId);
      return designation ? designation.title : '';
    });

    return {
      type: obj.type,
      designations: designationTitles,
    };
  });

  const btnConfig = [
    {
      title: 'Create',
      handler: handleCreateAssetType,
    },
  ];

  return (
    <div className="my-4">
      <Modal
        action="Create Loan Type"
        title="Create Loan Type"
        Element={<LoanTypeForm formData={formData} handleInputChange={handleInputChange} desiginations={desiginations} />}
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

export default LoanType;
