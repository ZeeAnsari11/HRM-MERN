import React, { useState } from 'react';
import Table, { StatusPill } from '../../components/Table';
import { selectPayslips, selectUID } from '../../states/reducers/slices/backend/UserSlice';
import { useDispatch, useSelector } from 'react-redux';

import View from './src/modal';
import { getPayslips } from '../../api/payslips';
import { useEffect } from 'react';
import { useMemo } from 'react';

function Payslips() {
  const apiData = useSelector(selectPayslips);
  const user_id = useSelector(selectUID);
  const dispatcher = useDispatch();
  useEffect(() => {
    getPayslips(user_id, dispatcher);
  }, []);

  const [setSelectedId] = useState(null);

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
      <main className="mx-auto px-4 sm:px-6 lg:px-8 mt-6 pt-4">
        <Table columns={columns} data={data} />
      </main>
  );
}

export default Payslips;
