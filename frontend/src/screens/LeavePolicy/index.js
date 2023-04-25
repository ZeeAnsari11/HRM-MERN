import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaLeaf } from 'react-icons/fa';
import { MdLocalFlorist } from 'react-icons/md';
import { FaFlask } from 'react-icons/fa';
import { RiPlantFill } from 'react-icons/ri';

const leaveData = [
  { leaveType: 'Annual Leaves', balance: 20, availed: 10, available: 10 },
  { leaveType: 'Sick Leaves', balance: 10, availed: 5, available: 5 },
  { leaveType: 'Personal Leaves', balance: 5, availed: 3, available: 2 },
];

const leaveFields = [
  { label: 'Leave Type', key: 'leaveType' },
  { label: 'Balance', key: 'balance' },
  { label: 'Availed', key: 'availed' },
  { label: 'Available', key: 'available' },
  { label: 'Pending', key: 'pending' },
];

const COLORS = ['#364f6b', '#3fc1c9', '#fc5185'];

const icons = [FaLeaf, MdLocalFlorist, FaFlask];

const LeavePolicy = () => {
  const totalLeaves = leaveData.reduce((sum, item) => sum + item.balance, 0);
  const leavesBullet = leaveData.map((leave) => {
    const Icon = icons[leaveData.indexOf(leave)];
    return (
      <li key={leave.leaveType} className='flex items-center space-x-1 mobile:space-x-2 mobile:justify-between'>
        <div className='flex items-center'>
          <Icon style={{ color: COLORS[leaveData.indexOf(leave)], width: '40px' }} />
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
          <BarChart data={leaveData}>
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
