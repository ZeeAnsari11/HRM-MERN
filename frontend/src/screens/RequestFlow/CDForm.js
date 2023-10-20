import React from 'react';
import { Form, Select } from 'antd';
import { commonStyles } from '../../styles/common';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectOrgId, selectRequestTypes } from '../../states/reducers/slices/backend/UserSlice';
import { getRequestTypes } from '../../api/requestFlow';
const { Option } = Select;


const CDForm = ({ formData, handleInputChange, validationErrors }) => {

    const orgId = useSelector(selectOrgId);
    const dispatcher = useDispatch();
    useEffect(() => {
        getRequestTypes(orgId, dispatcher);
      }, []);

    const requestTypes = useSelector(selectRequestTypes);

  return (
    <form>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-1">Name</label>
        <input
          className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-50"
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => handleInputChange(e, 'name')}
          required
        />
        {validationErrors.name && (
          <p className="text-red-500 text-xs mt-1">{validationErrors.name}</p>
        )}
      </div>
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
          onChange={(value) => handleInputChange(value, 'requestType')}
          className={commonStyles.input}
        >
          {/* Render requestTypes options */}
          {requestTypes.map((requestType) => (
            <Option key={requestType._id} value={requestType._id}>
              {requestType.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </form>
  );
};

export default CDForm;
