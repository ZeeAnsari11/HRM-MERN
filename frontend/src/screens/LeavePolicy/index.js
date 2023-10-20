import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { selectUID, selectUserLeaveDetails } from '../../states/reducers/slices/backend/UserSlice';
import { useDispatch, useSelector } from 'react-redux'

import { FaFlask } from 'react-icons/fa';
import { FaLeaf } from 'react-icons/fa';
import { CheckCircle } from 'react-feather';
import { MdLocalFlorist } from 'react-icons/md';
import React from 'react';
import { RiPlantFill } from 'react-icons/ri';
import { getUserLeaveDetails } from '../../api/user';
import { useEffect } from 'react';


const leaveFields = [
  { label: 'Leave Type', key: 'leaveType' },
  { label: 'Balance', key: 'balance' },
  { label: 'Availed', key: 'availed' },
  { label: 'Available', key: 'available' },
  { label: 'Pending', key: 'pending' },
];

const COLORS = ['#364f6b', '#3fc1c9', '#fc5185'];

const icons = [FaLeaf, MdLocalFlorist, FaFlask, CheckCircle];

const LeavePolicy = () => {

  const dispatch = useDispatch()
  const user_id =  useSelector(selectUID)
  useEffect(() => {
    getUserLeaveDetails(user_id, dispatch)
  }, [])
  const leaveDetails = useSelector(selectUserLeaveDetails)
  console.log("leaveDetails",leaveDetails
  );

const totalLeaves = leaveDetails.reduce((total, item) => total + item.leaveType.accumulativeCount, 0);

const adjustedDataWithoutUnpaid = leaveDetails.map((item) => {
  return {
    leaveType: item.leaveType.name,
    balance: item.leaveType.accumulativeCount, 
    availed: 10, 
    available: item.leaveType.accumulativeCount 
  };
});
  
const adjustedData = adjustedDataWithoutUnpaid.filter((leave) => leave.leaveType !== 'unpaid');

  const leavesBullet = adjustedData.map((leave) => {
    const Icon = icons.find((icon, index) => index === adjustedData.indexOf(leave));
    return (
      <li key={leave.leaveType} className='flex items-center space-x-1 mobile:space-x-2 mobile:justify-between'>
        <div className='flex items-center'>
        {Icon && <Icon style={{ color: COLORS[adjustedData.indexOf(leave)], width: '40px' }} />}
          <span className='mobile:ml-2 mr-2'>{leave.leaveType}</span>
        </div>
        <span className='mobile:ml-0 rounded-full bg-gray-300 w-7 h-7 flex justify-center items-center'>{leave.balance}</span>
      </li>
    );
  });

  return (
    <>
      <div className="flex justify-center mt-8">
        <ResponsiveContainer width="95%" height={300}>
          <BarChart data={adjustedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="leaveType" />
            <YAxis />
            <Tooltip />
            <Legend />
            {leaveFields.slice(1).map((field, index) => (
              <Bar key={field.key} dataKey={field.key} fill={COLORS[index]} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
      <ul className="flex justify-center items-center mt-8 mobile:block mobile:space-y-4">
        <li className="flex items-center mobile:space-x-2 mobile:justify-between">
          <div className='flex items-center'>
            <RiPlantFill className="text-blue-500 w-[40px]" />
            Total Leaves
          </div>
          <div className='mobile:ml-0 rounded-full bg-gray-300 w-7 h-7 flex justify-center items-center ml-2 mr-2'>
          {totalLeaves}
          </div>
        </li>
        {leavesBullet}
      </ul>
    </>
  );
};

export default LeavePolicy;
