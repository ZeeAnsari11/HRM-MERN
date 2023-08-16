import React from "react";
import { commonStyles } from "../../styles/common";
import { selectCurrentUser } from "../../states/reducers/slices/backend/UserSlice";
import { useSelector } from "react-redux";

const probations = {
  employment: {
    joining_date: "2022-01-01"
  },
  duration: 90,
  end_date: "2022-04-01",
  status: "Completed",
  histories: [
    {
      requestee: "Muhammad Aaqil Tahir",
      requestAs: "PHP-00023 Line Manager",
      status: "Approved",
      grade: "76.00% (E)",
      remarks: "Overall not a bad experience ignwqljlhngsjkglburhigjnwklwiubn",
      time: "December 26, 2022 06:28 PM",
      actions: ""
    },
    {
      requestee: "Aaqib Zia",
      requestAs: "PHP-00058 HOD HR",
      status: "Approved",
      grade: "0",
      remarks: "His Probation has been.",
      time: "December 29, 2022 12:59 PM",
      actions: ""
    }
  ]
};


const Probation = () => {
  const { employment, duration, end_date, status } = probations;
  const currentUser = useSelector(selectCurrentUser)
  return (
    <div className="p-4 tablet:p-8">
      <div className="flex flex-col tablet:flex-row justify-between">
        {status === "Completed" && (
          <div className="w-full tablet:w-1/2 mb-4 tablet:mb-0 tablet:pr-8">
            <h3 className="text-md font-bold mb-2 tablet:mb-4 ">Probation Period</h3>
            <table className="table-auto">
              <tbody >
                <tr>
                  <td className="pr-30 py-2 font-medium">
                    Joining Date
                  </td>
                  <td className="text-gray-700 pl-10">
                    <div className={commonStyles.input}>
                      {(new Date(currentUser?.joiningDate)).toDateString()}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="pr-30 py-2 font-medium">
                    Duration
                  </td>
                  <td className="text-gray-700 pl-10">
                    <div className={commonStyles.input}>{duration}</div>
                  </td>
                </tr>
                <tr>
                  <td className="pr-30 py-2 font-medium">
                    Completion Date
                  </td>
                  <td className="text-gray-700 pl-10">
                    <div className={commonStyles.input}>{end_date}</div>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">Status</td>
                  <td className="text-gray-700 pl-10">
                    <div className="text-center">
                      <div className="bg-green-500 text-white py-1 px-2 rounded-full text-xs font-medium">
                        {currentUser?.probation?.status}
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
      {probations.histories.length > 0 && (
        <div className="w-full tablet:w-1/2 py-4">
          <h3 className="text-md font-bold mb-4">Probation Histories</h3>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requestee</th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request As</th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {probations.histories.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-4 whitespace-pre-wrap">{item.requestee}</td>
                  <td className="px-4 py-4 whitespace-pre-wrap">{item.requestAs}</td>
                  <td className="px-4 py-4 whitespace-pre-wrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">{item.grade}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="whitespace-pre-wrap">{item.remarks}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-pre-wrap">{item.time}</td>
                  <td className="px-4 py-4 whitespace-pre-wrap">{item.actions}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      )}
    </div>
  );
};

export default Probation;
