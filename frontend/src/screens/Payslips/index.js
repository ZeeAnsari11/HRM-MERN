import React, { useState } from 'react';
import Table, { StatusPill } from './src/Table';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPayslips, selectUID } from '../../states/reducers/slices/backend/UserSlice';
import { useEffect } from 'react';
import View from './src/modal';
import { getPayslips } from '../../api/payslips';
import FormFields from './Formfields';

function Payslips() {
  const apiData = useSelector(selectPayslips);
  const user_id = useSelector(selectUID);
  console.log("Payslips", apiData);
  const dispatcher = useDispatch();
  useEffect(() => {
    getPayslips(user_id, dispatcher);
  }, []);

  const [selectedId, setSelectedId] = useState(null);

  const data = apiData.map(obj => ({
    month: obj.month,
    grossSalary: obj.grossSalary,
    tax: obj.tax,
    finalSalary: obj.finalSalary,
    status: obj.status,
    year: obj.year,
    id: obj._id,
  }));

  const columns = useMemo(() => [
    {
      Header: "Month",
      accessor: 'month',
    },
    {
      Header: "Year",
      accessor: 'year',
    },
    {
      Header: "Earning",
      accessor: 'grossSalary',
    },
    {
      Header: "Tax",
      accessor: 'tax',
    },
    {
      Header: "Net Payable",
      accessor: 'finalSalary',
    },
    {
      Header: "Status",
      accessor: 'status',
      Cell: StatusPill,
    },
    {
      Header: "Action",
      accessor: 'action',
      Cell: ({ row }) => (
        <div className='flex items-center justify-center'>
          <View
            selectedId={row.original.id}
            setSelectedId={setSelectedId}
          />
        </div>
      ),
    },
  ], []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="mt-6">
          <Table columns={columns} data={data} />
        </div>
      </main>
    </div>
  );
}

export default Payslips;
