import React, { useEffect, useState } from 'react';
import { createTaxRule, getTaxRulesByOrgId } from '../../api/taxRules';
import { selectCurrentUserOrg, selectCurrentUserRole } from '../../states/reducers/slices/backend/UserSlice';

import Modal from '../../components/Modal';
import TRForm from './TRForm';
import Table from '../../components/Table';
import TaxRulesView from './TaxRulesView';
import { commonStyles } from '../../styles/common';
import { useSelector } from 'react-redux';

const TaxRules = () => {
  let orgId = useSelector(selectCurrentUserOrg);
  let role = useSelector(selectCurrentUserRole);
  
  const [toggleChange, setToggleChange] = useState(false);
  const [taxRules, setTaxRules] = useState([]);
  const [formData, setFormData] = useState({
    ruleNo: '',
    fromAmount: '',
    organization: orgId,
    toAmount: '',
    fixRate: '',
    percentage: '',

  });
  
  const [validationErrors, setValidationErrors] = useState({
    ruleNo: '',
    fromAmount: '',
    toAmount: '',
    fixRate: '',
    percentage: '',
  });

  let LoadData = () => {
    getTaxRulesByOrgId(orgId, setTaxRules, role)
  }

  useEffect(() => {
    LoadData()
  }, []);

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

  const handleCreateTaxRule = (trigger) => {
    const newValidationErrors = {};
    if (formData.ruleNo.trim() === "") {
      newValidationErrors.ruleNo = "Rule No is required.";
    }
    if (formData.fromAmount.trim() === "") {
      newValidationErrors.fromAmount = "From Amount is required.";
    }
    if (formData.toAmount.trim() === "") {
      newValidationErrors.toAmount = "To Amount is required.";
    }
    if (formData.fixRate.trim() === "") {
      newValidationErrors.fixRate = "fixRate is required.";
    }

    if (formData.percentage.trim() === "") {
      newValidationErrors.percentage = "percentage is required.";
    }

    if (Object.keys(newValidationErrors).length > 0) {
      setValidationErrors(newValidationErrors);
      trigger();
      return;
    }
    createTaxRule(formData, changeToggler, trigger, orgId, role);
    setFormData({
      ruleNo: '',
      fromAmount: '',
      organization: orgId,
      toAmount: '',
      fixRate: '',
      percentage: '',
    });
  };

  const columns = [
    {
      Header: 'Rule #',
      accessor: 'ruleNo',
    },
    {
      Header: 'From Amount',
      accessor: 'fromAmount',
    },
    {
      Header: 'To Amoun',
      accessor: 'toAmount',
    },
    {
      Header: 'Fix Rate',
      accessor: 'fixRate',
    },
    {
      Header: 'Percentage',
      accessor: 'percentage',
    },
    {
      Header: 'Action',
      accessor: 'action',
      Cell: ({ row }) => (
        <TaxRulesView data={row.original} />
      ),
    },
  ];
  const data = taxRules.map(obj => ({
    id: obj._id,
    ruleNo: obj.ruleNo,
    fromAmount: obj.fromAmount,
    toAmount: obj.toAmount,
    fixRate: obj.fixRate,
    percentage: obj.percentage
  }));

  const btnConfig = [
    {
      title: 'Create',
      handler: handleCreateTaxRule,
    }
  ]

  return (
    <main className="mx-auto px-4 sm:px-6 pt-4">
      <Table columns={columns} data={data}
        element={
          <Modal
            action="Create Tax Rule"
            title="Create Tax Rule"
            btnStyle={commonStyles.btnDark}
            Element={<TRForm formData={formData} handleInputChange={handleInputChange} validationErrors={validationErrors} />}
            btnConfig={btnConfig}
            validationErrors={validationErrors}
            check={(closeModal) => {
              if (!validationErrors?.ruleNo && !validationErrors?.fromAmount && !validationErrors?.toAmount && !validationErrors?.percentage && !validationErrors?.fixRate && formData?.ruleNo.trim() && formData?.fromAmount.trim() && formData?.toAmount.trim() && formData?.percentage.trim() && formData?.fixRate.trim()) {
                closeModal()
              }
            }}
          />
        } />
    </main>
  );
};

export default TaxRules;