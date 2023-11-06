import { Button, Checkbox, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { addNode, deleteNodeFromFlow, getAllNodesByFlowId, getAllRequestFlowOfOrg } from '../../api/flowNode';
import { faCross, faX } from '@fortawesome/free-solid-svg-icons';
import { selectCurrentUserOrg, selectCurrentUserRole } from '../../states/reducers/slices/backend/UserSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from 'antd';
import { getDepartmentsByOrgId } from '../../api/departments';
import { useSelector } from 'react-redux';

const { Option } = Select;

const FlowNode = () => {
    let orgId = useSelector(selectCurrentUserOrg);
    let role = useSelector(selectCurrentUserRole);
    const [toggleChange, setToggleChange] = useState(false);

    const changeToggler = () => {
        setToggleChange(!toggleChange);
    };

    const [isLineManagerChecked, setIsLineManagerChecked] = useState(false);
    const [isDepartmentChecked, setIsDepartmentChecked] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [requestFlows, setRequestFlows] = useState([]);
    const [selectedRequestFlow, SetSelectedRequestFlows] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [resultArray, setResultArray] = useState([]);

    useEffect(() => {
        getAllRequestFlowOfOrg(orgId, role)
            .then((flows) => {
                setRequestFlows(flows)
                const requests = flows.map(flow => {
                    return getAllNodesByFlowId(flow._id, orgId, role)
                        .then(result => {
                            return result;
                        })
                        .catch((err) => {

                        })
                });
                Promise.all(requests).then(data => {
                    setResultArray(data);
                });
            })
        getDepartmentsByOrgId(orgId, setDepartments, role);
    }, [toggleChange]);

    const handleLineManagerChange = (e) => {
        setIsLineManagerChecked(e.target.checked);
        if (e.target.checked) {
            setIsDepartmentChecked(false);
        }
    };

    const handleDepartmentChange = (e) => {
        setIsDepartmentChecked(e.target.checked);
        if (e.target.checked) {
            setSelectedDepartment(null);
            setIsLineManagerChecked(false);
        } else {
            setSelectedDepartment(null);
        }
    };

    const handleButtonClick = () => {
        let formData = {};
        if (isLineManagerChecked) {
            formData.lineManager = "lineManager"
        }
        if (isDepartmentChecked) {
            formData.department = selectedDepartment
        }
        addNode(formData, selectedRequestFlow, orgId, role, changeToggler)
        setIsLineManagerChecked(false);
        setIsDepartmentChecked(false);
        SetSelectedRequestFlows(null)
    };

    const deleteNode = (nodeId, requestFlowId) => {
        deleteNodeFromFlow(requestFlowId, nodeId, changeToggler)
    }

    const renderLinkedList = (data, departments, requestFlowId) => {
        return (
            <ul className="inline py-4">
                {data.map((node, index) => (
                    <li key={index} className="inline-block border rounded-xl bg-gray-200 mx-2">
                        {node?.lineManager ? (
                            <span className="font-bold px-4 py-2 border bg-white shadow-md rounded-md cursor-pointer hover:bg-gray-100">
                                {node.lineManager}
                                <span onClick={() => { deleteNode(node._id, requestFlowId) }} className='rounded ml-2'>
                                    <FontAwesomeIcon className='w-3 h-3' icon={faX} />
                                </span>
                            </span>
                        ) : (
                            <span className="font-bold px-4 py-2 border bg-white shadow-md rounded-md cursor-pointer hover:bg-gray-100">
                                {departments?.find((department) => department?._id === node?.department)?.name}
                                <span onClick={() => { deleteNode(node?._id, requestFlowId) }} className='rounded ml-2'>
                                    <FontAwesomeIcon className='w-3 h-3' icon={faX} />
                                </span>
                            </span>
                        )}
                        {node?.nextNode && (
                            <span className="mx-4">
                                &rarr;
                                {renderLinkedList([node.nextNode], departments, requestFlowId)}
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="flex flex-col h-screen">
            <div className="h-40vh overflow-auto">
                <form className="w-full p-4">
                    <div>
                        <Select
                            value={selectedRequestFlow}
                            onChange={(value) => SetSelectedRequestFlows(value)}
                            placeholder="Select Request Flow" // Placeholder attribute
                            className="w-full p-2 border rounded"
                            style={{ width: "100%" }}
                            disabled={isDepartmentChecked}
                        >
                            {requestFlows.map((requestFlow) => (
                                <Option key={requestFlow._id} value={requestFlow._id}>
                                    {requestFlow.name}
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <div className="w-full p-4">
                        <Checkbox
                            checked={isLineManagerChecked}
                            onChange={handleLineManagerChange}
                            className="mb-2"
                            disabled={isDepartmentChecked}
                        >
                            Line Manager
                        </Checkbox>
                    </div>
                    <div className="w-full p-4">
                        <Checkbox
                            checked={isDepartmentChecked}
                            onChange={handleDepartmentChange}
                            disabled={isLineManagerChecked}
                            className="mb-2"
                        >
                            Department
                        </Checkbox>
                        {isDepartmentChecked && (
                            <Select
                                value={selectedDepartment}
                                onChange={(value) => setSelectedDepartment(value)}
                                placeholder="Select Department"
                                className="w-full p-2 border rounded"
                                style={{ width: "100%" }}
                            >
                                {departments.map((department) => (
                                    <Option key={department._id} value={department._id}>
                                        {department.name}
                                    </Option>
                                ))}
                            </Select>
                        )}
                    </div>
                    <div className="w-full p-4">
                        <Button onClick={handleButtonClick}>Create Node</Button>
                    </div>
                </form>
            </div>
            <div className="flex-1 bg-gray-200">
                {resultArray.map((data, index) => (
                    <> <h1 className="font-bold p-4" key={index}>{requestFlows[index]["name"]}</h1>
                        <div key={index}>{renderLinkedList(data, departments, requestFlows[index]["_id"])}</div></>
                ))}
            </div>
        </div>
    );
};

export default FlowNode;
