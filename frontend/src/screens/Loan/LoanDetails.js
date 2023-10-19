import React, { useState } from 'react';
import { selectCurrentUserOrg, selectCurrentUserRole } from '../../states/reducers/slices/backend/UserSlice';

import { LoanRepaymentSchedule } from '../../api/loan';
import { useSelector } from 'react-redux';

const LoanDetails = ({ formData }) => {
    let orgId = useSelector(selectCurrentUserOrg);
    let role = useSelector(selectCurrentUserRole);
    
    const [data, setData] = useState(formData.data);
    const [editableStatus, setEditableStatus] = useState('pending');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [payingDate, setPayingDate] = useState('');
    const [selectedItem, setSelectedItem] = useState('');
    
    const handleStatusChange = (e, schedule) => {
        const selectedStatus = e.target.value;
        const updatedRepaymentSchedules = data.repaymentSchedules.map((scheduleItem) => {
            if (scheduleItem._id === schedule._id) {
                return { ...scheduleItem, status: selectedStatus };
            }
            return scheduleItem;
        });
        setData({ ...data, repaymentSchedules: updatedRepaymentSchedules });
    };

    const handlePaidButtonClick = (id) => {
        setSelectedItem(id);
        setIsModalOpen(true);
    };

    const handleSave = () => {
        setIsModalOpen(false);
        const formData = {
            paidAt : payingDate,
        }
        LoanRepaymentSchedule(selectedItem,formData, orgId, role);
        
    };

    return (
        <div className="">
            <h2 className="text-2xl font-bold mb-6 text-center">Loan Details</h2>

            <div className="mb-4">
                <p>Created At: {data?.createdAt}</p>
                <p>Loan Amount: {data?.loan_amount}</p>
                <p>Required Date: {data?.required_Date}</p>
                <p>Reason: {data?.reason}</p>
                <p>User: {data?.userName}</p>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Status:</label>
                <select
                    className="appearance-none block w-full bg-white border border-gray-400 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500"
                    value={editableStatus}
                    onChange={(e) => setEditableStatus(e.target.value)}
                >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>

                <button
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                        data.status = editableStatus;
                    }}
                >
                    Save
                </button>
            </div>

            <div>
                <h3 className="text-lg font-bold mb-4">Repayment Schedules:</h3>
                {data.repaymentSchedules?.map((schedule, index) => (
                    <div key={schedule._id} className="bg-gray-100 rounded-lg p-4 mb-4">
                        <p>
                            <span className="font-bold">Repayment Schedule {index + 1}:</span>
                        </p>
                        <p>
                            <span className="font-bold">Repayment Amount:</span> {schedule?.rePaymentAmount}
                        </p>
                        <p>
                            <span className="font-bold">Repayment Date:</span> {schedule?.rePaymentDate.slice(0, 10)}
                        </p>
                        {schedule?.paidAt ? (
                            <p>
                                <span className="font-bold">Repayment Date:</span> {schedule?.paidAt.slice(0, 10)}
                            </p>
                        ) : (
                            ''
                        )}
                        <p>
                            <div>
                                <p>
                                    <span className="font-bold">Status:</span>
                                    {schedule.status === 'pending' ? (
                                        <span className="inline-block bg-yellow-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                                            {schedule.status}
                                        </span>
                                    ) : schedule.status === 'paid' ? (
                                        <span className="inline-block bg-green-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                                            {schedule.status}
                                        </span>
                                    ) : (
                                        <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                                            {schedule.status}
                                        </span>
                                    )}
                                </p>

                            </div>
                            <div>
                                {schedule.status === 'pending' ? <button
                                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-right"
                                    onClick={() => handlePaidButtonClick(schedule._id)}
                                >
                                    Pay
                                </button> : ''}
                            </div>
                        </p>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        {/* Background overlay */}
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        {/* Modal panel */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div
                            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-headline"
                        >
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                {/* Modal content */}
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                                            Enter Paying Date
                                        </h3>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                value={payingDate}
                                                onChange={(e) => setPayingDate(e.target.value)}
                                                placeholder="Paying Date"
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    onClick={handleSave}
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoanDetails;
