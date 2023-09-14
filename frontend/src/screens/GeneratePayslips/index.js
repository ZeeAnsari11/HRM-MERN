import React, { useState } from 'react';
import { DatePicker, Button, Form, Select } from 'antd';
import { commonStyles } from '../../styles/common';
import { savePaySlipData } from '../../api/payslips';
import { useSelector } from 'react-redux';
import { selectOrgId } from '../../states/reducers/slices/backend/UserSlice';

const { Option } = Select;

const GeneratePayslips = () => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const organizationId = useSelector(selectOrgId);

  const handleSubmit = () => {
    if (selectedMonth !== null && selectedYear !== null) {
      const payslipData = {
        month: selectedMonth,
        year: selectedYear,
      };
      console.log(payslipData, "payslipData");
      savePaySlipData(organizationId, payslipData);
    }
  };

  return (
    <div className="flex items-center justify-center max-w-screen max-h-screen bg-gray-100">
      <div className="w-full p-4">
        <h2 className="text-2xl font-semibold mb-4">Generate Payslip</h2>
        <Form onFinish={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="month" className="block text-gray-600">
              Month
            </label>
            <Select
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Select a month"
              onChange={(value) => setSelectedMonth(value)}
            >
              <Option value={1}>January</Option>
              <Option value={2}>February</Option>
              <Option value={3}>March</Option>
              <Option value={4}>April</Option>
              <Option value={5}>May</Option>
              <Option value={6}>June</Option>
              <Option value={7}>July</Option>
              <Option value={8}>August</Option>
              <Option value={9}>September</Option>
              <Option value={10}>October</Option>
              <Option value={11}>November</Option>
              <Option value={12}>December</Option>
            </Select>
          </div>
          <div className="mb-4">
            <label htmlFor="year" className="block text-gray-600">
              Year
            </label>
            <DatePicker
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              picker="year"
              placeholder="Select a year"
              onChange={(date, dateString) => {
                const year = date ? date.year() : null;
                setSelectedYear(year);
              }}
            />
          </div>
          <div className="text-center">
            <Button className={commonStyles.btnDark} htmlType="submit">
              Generate Payslip
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default GeneratePayslips;
