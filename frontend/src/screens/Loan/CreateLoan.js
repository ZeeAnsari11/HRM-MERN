import 'tailwindcss/tailwind.css';

import { getLoanType, setCancel } from '../../api/loan';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Import React and Tailwind CSS
import React from 'react';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { selectLoanTypes } from '../../states/reducers/slices/backend/Loan';
import { selectOrgId } from '../../states/reducers/slices/backend/UserSlice';
import { useDropzone } from "react-dropzone";


const CreateLoanRequest = () => {
  
  const [loanType, setLoanType] = React.useState('');
  const [loancCategory, setLoanCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [reason, setReason] = useState('');
  const [assetImage, setAssetImage] = useState(null);
  const [assetPreview, setAssetPreview] = useState(null);
  const [isRequestCreated, setRequestCreated] = useState(false);

  const dispatcher = useDispatch();
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
    setRequestCreated(true);
    setTimeout(() => {
      setRequestCreated(false);
    }, 3000);

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
    getLoanType(organization, dispatcher)
  }, []);

  const loanTypes = useSelector(selectLoanTypes)
 
  // Return the JSX for the add asset form
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl block text-gray-700 font-bold mb-2 pl-1 pr-4 py-2" >Loan & Advances Request Create</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/* Name field */}
        <div className="mb-4">

          <label htmlFor="name" className="block text-gray-700 text-sm pl-1 pr-4 py-2 font-bold mb-2">
            Loan & Advances Type *
          </label>
          <select
            type="text"
            id="type"
            name="type"
            // value={loanTypes}
            onChange={(e) => setLoanType(e.target.value)}
            className="shadow appearance-none border border-backgroundDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter Loan Type"
            required>
            <option value="">Select Loan & Advances Type</option>
            {
              loanTypes.map((type) => {
                return <option value={type._id}>{type.type}</option>
              })
            }
          </select>
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
            id="amount"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="shadow appearance-none border border-backgroundDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter Required Loan & Advances amount"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="model" className="block text-gray-700 text-sm font-bold mb-2 pl-1 pr-4 py-2">
            Required Date *
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="shadow appearance-none border border-backgroundDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
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
            onChange={(e) => setReason(e.target.value)}
            className="shadow appearance-none border border-backgroundDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter Reason"
            required
          />
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
      </form>
    </div>
  );
};
export default CreateLoanRequest