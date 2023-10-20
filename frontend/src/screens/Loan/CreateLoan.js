import 'tailwindcss/tailwind.css';

import { createLoan, getLoanType, setCancel } from '../../api/loan';
import { selectCurrentUserOrg, selectCurrentUserRole, selectOrgId, selectUID } from '../../states/reducers/slices/backend/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Import React and Tailwind CSS
import React from 'react';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { selectLoanTypes } from '../../states/reducers/slices/backend/Loan';
import { useDropzone } from "react-dropzone";

const CreateLoanRequest = ({ formData, handleInputChange, validationErrors }) => {

  let orgId = useSelector(selectCurrentUserOrg);
  let role = useSelector(selectCurrentUserRole);

  // Use state to store the form values
  const [loanType, setLoanType] = React.useState(formData ? formData?.loan_type._id : '');
  const [loancCategory, setLoanCategory] = useState('');
  const [amount, setAmount] = useState(formData ? formData?.loan_amount : '');
  const [date, setDate] = useState(formData ? formData?.date : '');
  const [reason, setReason] = useState(formData ? formData?.reason : '');
  const [assetImage, setAssetImage] = useState(null);
  const [assetPreview, setAssetPreview] = useState(null);
  const [isRequestCreated, setRequestCreated] = useState(false);

  const dispatcher = useDispatch();
  const userId = useSelector(selectUID)
  const handleDrop = (acceptedFiles) => {
    setAssetImage(acceptedFiles[0]);
    setAssetPreview(URL.createObjectURL(acceptedFiles[0]));
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleDrop });
  const initialSchedules = [
    {
      rePaymentDate: '',
      rePaymentAmount: 50,
    },
    {
      rePaymentDate: '',
      rePaymentAmount: 50,
    },
    // Add the remaining objects from the repaymentSchedules data
  ];

  const [formFields, setFormFields] = useState(initialSchedules);

  const handleFormChange = (event, index) => {
    const { name, value } = event.target;
    setFormFields(prevFormFields => {
      const updatedFormFields = [...prevFormFields];
      updatedFormFields[index] = { ...updatedFormFields[index], [name]: value };
      return updatedFormFields;
    });
  };

  const addFields = () => {
    setFormFields(prevFormFields => [
      ...prevFormFields,
      {
        rePaymentDate: '',
        rePaymentAmount: '',
      },
    ]);
  };

  const removeFields = index => {
    setFormFields(prevFormFields => {
      const updatedFormFields = [...prevFormFields];
      updatedFormFields.splice(index, 1);
      return updatedFormFields;
    });
  };


  const handleSaveRequest = () => {
    let formData = {
      loan_type: loanType,
      loan_amount: amount,
      required_Date: date,
      attachment: assetImage,
      reason: reason,
      user: userId,
      organization: organization,
      repaymentSchedules: formFields
    };

    setRequestCreated(true);
    setTimeout(() => {
      setRequestCreated(false);
    }, 3000);

    createLoan(formData, orgId, role)
  };

  // Define a function to handle the form submission
  const handleSubmit = (e) => {
    // Prevent the default browser behavior
    e.preventDefault();

    // Create a new asset object with the form values
    // const newAsset = {
    //   organization,
    //   name,
    //   condition,
    //   ManufacturedBy:manufacturedBy,
    //   Model:model,
    //   isTaxable,
    //   price,
    //   assetImage,
    //   description,
    //   type,
    // };
  };
  const handleCancel = () => {
    const flag = false
    setCancel(flag, dispatcher)
  }

  const organization = useSelector(selectOrgId)
  useEffect(() => {
    getLoanType(organization, dispatcher, orgId, role)
  }, []);

  const loanTypes = useSelector(selectLoanTypes)

  // Return the JSX for the add asset form
  return (
    <div className="container mx-auto p-4">
      {formData ? '' : <h1 className="text-2xl block text-gray-700 font-bold mb-2 pl-1 pr-4 py-2" >Loan & Advances Request Create</h1>}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/* Name field */}
        <div className="mb-4">

          <label htmlFor="name" className="block text-gray-700 text-sm pl-1 pr-4 py-2 font-bold mb-2">
            Loan & Advances Type *
          </label>
          <select
            type="text"
            id="loan_type"
            name="loan_type"
            value={loanType} // Remove or set it to an empty string
            onChange={(e) => {
              if (formData) {
                handleInputChange(e)
              }
              setLoanType(e.target.value)
            }}
            className="shadow appearance-none border border-backgroundDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter Loan Type"
            required
          >
            <option value="">Select Loan & Advances Type</option>
            {loanTypes.map((type) => (
              <option key={type._id} value={type._id}>
                {type.type}
              </option>
            ))}
          </select>
          {validationErrors?.loan_type && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.loan_type}</p>
          )}
        </div>
        <div className='flex fle-items items-center'>

        </div>


        {/* Condition field */}

        {/* Manufactured by field */}
        <div className="mb-4">
          <label htmlFor="manufacturedBy" className="block font-bold text-gray-700 text-sm pl-1 pr-4 py-2">
            Required Loan & Advances amount *
          </label>
          <input
            type="text"
            id="loan_amount"
            name="loan_amount"
            value={amount}
            onChange={(e) => {
              if (formData) {
                handleInputChange(e)
              } setAmount(e.target.value)
            }}
            className="shadow appearance-none border border-backgroundDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter Required Loan & Advances amount"
            required
          />
          {validationErrors?.loan_amount && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.loan_amount}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="model" className="block text-gray-700 text-sm font-bold mb-2 pl-1 pr-4 py-2">
            Required Date *
          </label>
          <input
            type="date"
            id="required_Date"
            name="required_Date"
            value={date}
            onChange={(e) => {
              if (formData) {
                handleInputChange(e)
              } setDate(e.target.value)
            }}
            className="shadow appearance-none border border-backgroundDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
          {validationErrors?.date && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.date}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2 pl-1 pr-4 py-2">
            Reason
          </label>
          <input
            type="text"
            id="reason"
            name="reason"
            value={reason}
            onChange={(e) => {
              if (formData) {
                handleInputChange(e)
              }
              setReason(e.target.value)
            }}
            className="shadow appearance-none border border-backgroundDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter Reason"
            required
          />
          {validationErrors?.reason && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.reason}</p>
          )}

        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2 pl-1 pr-4 py-2 " htmlFor="attachment">
            Attachment *	          </label>
          <div {...getRootProps()} className="border border-dashed p-4 border-backgroundDark ">
            <input {...getInputProps()} accept=".pdf,.doc,.docx,image/*" />
            {assetPreview ? (
              <img src={assetPreview} alt="Attachment Preview" />
            ) : (
              <>
                <FontAwesomeIcon icon={faCloudUploadAlt} className="text-4xl mb-4 mx-auto flex justify-center items-center" />
                <p className="text-center">Drag 'n' drop some files here, or click to select files</p>
              </>
            )}
          </div>
        </div>
        {formData ? '' : <>
          <div className="App">
            <h1 className="text-2xl block text-gray-700 font-bold mb-2 pr-4 py-2">Create Repayment Schedule</h1>
            <div>
              {formFields.map((form, index) => {
                return (
                  <div key={index}>
                    <div className='mt-4'>
                      <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2 pl-1 pr-4 py-2">
                        Enter date
                      </label>
                      <input
                        type="date"
                        id="repaymentDate"
                        name="rePaymentDate"
                        placeholder="Repayment Date"
                        onChange={event => handleFormChange(event, index)}
                        className="shadow appearance-none border border-backgroundDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={form.rePaymentDate}
                      />
                    </div>
                    <div className='mt-2'>
                      <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2 pl-1 pr-4 py-2">
                        Enter Amount
                      </label>
                      <input
                        name="rePaymentAmount"
                        placeholder="Repayment Amount"
                        onChange={event => handleFormChange(event, index)}
                        value={form.rePaymentAmount}
                        className="shadow appearance-none border border-backgroundDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <button className="mt-4 bg-backgroundDark hover:bg-white hover:text-backgroundDark border border-backgroundDark text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline" onClick={() => removeFields(index)}>Remove</button>
                  </div>
                );
              })}
            </div>
            <button className="mt-4 bg-backgroundDark hover:bg-white hover:text-backgroundDark border border-backgroundDark text-white font-bold py-2 px-5 rounded focus:outline-none focus:shadow-outline" onClick={addFields}>Add</button>
            <br />
          </div>
          <div className="flex items-center justify-left">
            <div >
              <button
                type="submit"
                className="mt-4 bg-backgroundDark hover:bg-white hover:text-backgroundDark border border-backgroundDark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleSaveRequest}
              >
                Save
              </button>
            </div>

            <div className='pl-2'>
              <button
                type="submit"
                className="mt-4 bg-backgroundDark hover:bg-white hover:text-backgroundDark border border-backgroundDark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </>}
      </form>
    </div>
  );
};
export default CreateLoanRequest