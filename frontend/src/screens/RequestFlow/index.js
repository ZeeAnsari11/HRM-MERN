import { Button, Form, Input, Select } from 'antd';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { saveRequestFlowData } from '../../api/requestFlow';
import { selectOrgId, selectRequestTypes } from '../../states/reducers/slices/backend/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getRequestTypes } from '../../api/requestFlow';
import { commonStyles } from '../../styles/common';

const { Option } = Select;

const RequestFlow = () => {
  const orgId = useSelector(selectOrgId);
  const dispatcher = useDispatch();
  useEffect(() => {
    getRequestTypes(orgId, dispatcher);
  }, []);
  const requestTypes = useSelector(selectRequestTypes);

  console.log("requestTypes", requestTypes);
  const [selectedRequestType, setSelectedRequestType] = useState(null);
  const [requestFlowName, setRequestFlowName] = useState('');
  const organizationId = useSelector(selectOrgId);

  const handleSubmit = () => {
    form.validateFields().then(() => {
      const requestFlowData = {
        requestType: selectedRequestType,
        name: requestFlowName.trim(),
      };
      saveRequestFlowData(requestFlowData);
    });
  };
  
  const [form] = Form.useForm();

  return (
    <div className="flex items-center justify-center max-w-screen max-h-screen bg-gray-100">
      <div className="w-full p-4">
        <h2 className="text-2xl font-semibold mb-4">Request Flow</h2>
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            name="selectedRequestType"
            rules={[
              {
                required: true,
                message: 'Please select a request type',
              },
            ]}
          >
            <Select
              placeholder="Select a request type"
              onChange={(value) => setSelectedRequestType(value)}
              className={commonStyles.input}
            >
              {requestTypes.map((requestType) => (
                <Option key={requestType._id} value={requestType._id}>
                  {requestType.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="requestFlowName"
            rules={[
              {
                required: true,
                message: 'Please enter the name of the Request Flow',
              },
            ]}
          >
            <Input
              className={commonStyles.input}
              placeholder="Enter the name of the Request Flow"
              value={requestFlowName}
              onChange={(e) => setRequestFlowName(e.target.value)}
            />
          </Form.Item>
          <div className="text-center">
            <Button htmlType="submit">
              Create Request Flow
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default RequestFlow;
