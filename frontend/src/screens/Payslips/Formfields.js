import React from "react";
import { useSelector } from "react-redux";
import { selectPayslips } from "../../states/reducers/slices/backend/UserSlice";
const FormFields = ({ id }) => {
    const data = useSelector(selectPayslips)
    console.log("data", data);
    console.log("selectedId", id)

    let payslip = null;

    for (let i = 0; i < data.length; i++) {
        if (data[i]._id === id) {
            payslip = data[i];

            break;
        }
    }


    console.log(payslip);

    return (
        <div className="flex flex-col items-center justify-center">
            <form className="w-full max-w-md bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="fieldName" className=" block text-sm font-bold text-gray-700 mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="fieldValue"
                            value="Absent Deduction"
                            readOnly
                            className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight bg-gray-100 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="fieldName" className="block text-sm font-bold text-gray-700 mb-2">
                            Value
                        </label>
                        <input
                            type="text"
                            id="fieldName"
                            value={payslip.absentCost}
                            className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter field name"
                            required
                        />
                    </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-4">
                    <div>
                        <input
                            type="text"
                            id="fieldValue"
                            value="Basic Salary"
                            readOnly
                            className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight bg-gray-100 focus:outline-none"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            id="fieldName"
                            value={payslip.basicSalary}
                            className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter field name"
                            required
                        />
                    </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-4">
                    <div>
                        <input
                            type="text"
                            id="fieldValue"
                            value="Leave Adjustment"
                            readOnly
                            className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight bg-gray-100 focus:outline-none"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            id="fieldName"
                            value={payslip.LeaveAdjustment}
                            className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter field name"
                            required
                        />
                    </div>
                </div>
                {payslip.allowance.allowanceDetails.map((item) => (
                    <div key={item.id} className="mt-3 grid grid-cols-2 gap-4">
                        <div>
                            <input
                                type="text"
                                id={`fieldValue${item._id}`}
                                value={item.name}
                                readOnly
                                className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight bg-gray-100 focus:outline-none"
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                id={`fieldName${item._id}`}
                                value={item.amount}
                                className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter field name"
                                required
                            />
                        </div>
                    </div>
                ))}

                <div className="mt-3 grid grid-cols-2 gap-4">
                    <div>
                        <input
                            type="text"
                            id="fieldValue"
                            value="Expense Amount"
                            readOnly
                            className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight bg-gray-100 focus:outline-none"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            id="fieldName"
                            value={payslip.expenseAmount}
                            className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter field name"
                            required
                        />
                    </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-4">
                    <div>
                        <input
                            type="text"
                            id="fieldValue"
                            value="Tax"
                            readOnly
                            className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight bg-gray-100 focus:outline-none"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            id="fieldName"
                            value={payslip.tax}
                            className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter field name"
                            required
                        />
                    </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-4">
                    <div>
                        <input
                            type="text"
                            id="fieldValue"
                            value="Status"
                            readOnly
                            className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight bg-gray-100 focus:outline-none"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            id="fieldName"
                            value={payslip.status}
                            className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter field name"
                            required
                        />
                    </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-4">
                    <div>
                        <input
                            type="text"
                            id="fieldValue"
                            value="Final Salary"
                            readOnly
                            className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight bg-gray-100 focus:outline-none"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            id="fieldName"
                            value={payslip.finalSalary}
                            className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter field name"
                            required
                        />
                    </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-4">
                    <div>
                        <input
                            type="text"
                            id="fieldValue"
                            value="Gross Salary"
                            readOnly
                            className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight bg-gray-100 focus:outline-none"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            id="fieldName"
                            value={payslip.grossSalary}
                            className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter field name"
                            required
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default FormFields