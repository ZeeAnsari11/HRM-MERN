import React from "react";
import moment from "moment";

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
      status: "Approved by Manager",
      grade: "76.00% (E)",
      remarks: "Overall not a bad experience ignwqljlhngsjkglburhigjnwklwiubn",
      time: "December 26, 2022 06:28 PM",
      actions: ""
    },
    {
      requestee: "Aaqib Zia",
      requestAs: "PHP-00058 HOD HR",
      status: "Completed",
      grade: "0",
      remarks: "His Probation has been.",
      time: "December 29, 2022 12:59 PM",
      actions: ""
    }
  ]
};


const Probation = () => {
  const { employment, duration, end_date, status } = probations;

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-lg font-bold mb-6">Probation Details</h2>
      <div className="flex flex-col md:flex-row justify-between ">
        {status === "Completed" && (
          <div className="w-full md:w-1/2 mb-6 md:mb-0 ">
            <h3 className="text-md font-bold mb-4 pr-40 ">Probation Period</h3>
            <table className="table-auto py-4 ">
              <tbody >
                <tr>
                  <td className="pr-30 py-2 font-medium">
                    Joining Date
                  </td>
                  <td className="text-gray-700 pl-10">
                    <input
                      type="date"
                      className="shadow appearance-none border border-backgroundDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={employment.joining_date}
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td className="pr-30 py-2 font-medium">
                    Duration
                  </td>
                  <td className="text-gray-700 pl-10">
                    <input
                      type="text"
                      className="shadow appearance-none border border-backgroundDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={duration}
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td className="pr-30 py-2 font-medium">
                    Completion Date
                  </td>
                  <td className="text-gray-700 pl-10">
                    <input
                      type="date"
                      className="shadow appearance-none border border-backgroundDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={end_date}
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td className="pr-30 py-2 font-medium">Status</td>
                  <td className="text-gray-700 pl-10">
                    <div className="text-center">
                      <input
                        type="text"
                        className="bg-green-500 text-white py-1 px-2 rounded-full text-xs font-medium"
                        value={status}
                        readOnly
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
      {probations.histories.length > 0 && (
        <div className="w-full md:w-1/2 py-10">
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
