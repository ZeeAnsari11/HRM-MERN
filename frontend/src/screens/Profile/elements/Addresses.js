import { faBuilding, faLocation, faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Modal from '../../../components/Modal'
import CUForm from './common/CUForm';
import { updateUserById } from '../../../api/user'
import { selectUID } from '../../../states/reducers/slices/backend/UserSlice'
import { useSelector } from 'react-redux'

const Addresses = ({ data }) => {
    const userId = useSelector(selectUID);
    const [formData, setFormData] = React.useState({
        permanentAddress: data.permanentAddress,
        temporaryAddress: data.temporaryAddress,
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const config = [
        {
            label: 'Permamanet Address',
            type: 'text',
            name: 'permanentAddress',
            value: formData.permanentAddress,
            onChange: handleInputChange,
            isRequired: true
        },
        {
            label: 'Temporary Address',
            type: 'text',
            name: 'temporaryAddress',
            value: formData.temporaryAddress,
            onChange: handleInputChange,
            isRequired: true
        },
    ]


    const title = "Addresses Info"
    const handleSubmit = (trigger) => {
        updateUserById(userId, formData, trigger);
    }
    const btnConfig = [{
        title: 'Update',
        handler: handleSubmit,
    }]

    return (
        <>
            <div className="flex justify-between items-center border-l-8 border-backgroundDark font-bold text-lg tablet:pr-6">
                <h1 className="px-4 text-2xl mobile:text-xl">{title}</h1>
                <Modal
                    action={<FontAwesomeIcon icon={faPencil} className="text-backgroundDark cursor-pointer hover:text-gray-600" />}
                    title={title}
                    Element={<CUForm config={config} handleInputChange={handleInputChange} isFull={false} />}
                    btnConfig={btnConfig}
                />
            </div>

            <div className="flex flex-col p-4 space-y-4">
                <span className="text-gray-600">
                    <div className="text-lg font-semibold mobile:text-md"><FontAwesomeIcon icon={faBuilding} className="w-8 mr-2" />Permanant</div>
                    <p className="px-10">{formData.permanentAddress}</p>
                </span>
                <span className="text-gray-600">
                    <div className="text-lg font-semibold"><FontAwesomeIcon icon={faLocation} className="w-8 mr-2" />Temporary</div>
                    <p className="px-10">{formData.temporaryAddress}</p>
                </span>
            </div>
        </>
    )
}

export default Addresses


