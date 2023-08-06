import React, { useEffect, useState } from 'react';
import { createDepartment, getDepartmentsByOrgId } from '../../api/departments';

import CDForm from './CDForm';
import DepartmentsView from './DepartmentsView';
import Modal from '../../components/Modal';
import Table from '../../components/Table';
import { commonStyles } from '../../styles/common';
import { getBranchesByOrgId } from '../../api/branches';
import { selectCurrentUserOrg } from '../../states/reducers/slices/backend/UserSlice';
import { toast } from 'react-toastify';
import { toastMessage } from '../../AlertConfigs';
import { useMemo } from 'react'
import { useSelector } from 'react-redux';

const Departments = () => {
    let orgId;
    orgId = useSelector(selectCurrentUserOrg);
    const [toggleChange, setToggleChange] = useState(false);
    const [departments, setDepartment] = useState([]);
    const [branches, setBranches] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        organization: orgId,
        branch: ""
    });

    useEffect(() => {
        LoadData()
    }, [toggleChange]);

    const changeToggler = () => {
        setToggleChange(!toggleChange);
    }

    let LoadData = () => {
        getDepartmentsByOrgId(orgId, setDepartment)
        getBranchesByOrgId(orgId, setBranches)
    }

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCreateDepartment = (toggler) => {
        if (!formData.name || !formData.branch) {
            toastMessage("error", "Please fill in all the required fields.", toast);
            toggler();
            return;
        }
        createDepartment(formData, changeToggler, toggler);
        setFormData({ name: "", organization: orgId, branch: "" });
    };

    const columns = useMemo(() => [
        {
            Header: "Name",
            accessor: 'name',
        },
        {
            Header: "Branch",
            accessor: 'branch',
        },
        {
            Header: "Action",
            accessor: 'action',
            Cell: ({ row }) => (
                <DepartmentsView data={row.original} />
            ),
        }
    ], []);
    
    const data = departments.map(obj => ({
        id: obj._id,
        name: obj.name,
        branch: obj.branch?.name,
    }));

    const btnConfig = [
        {
            title: 'Create',
            handler: handleCreateDepartment,
        }
    ]

    return (
        <main className="mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <Table columns={columns} data={data} element={
                <Modal
                    action="Create Department"
                    title="Create Department"
                    btnStyle={commonStyles.btnDark}
                    Element={
                            <CDForm branches={branches} formData={formData} handleInputChange={handleInputChange} />
                    }
                    btnConfig={btnConfig}
                />
            } />
        </main>
    );
};

export default Departments;
