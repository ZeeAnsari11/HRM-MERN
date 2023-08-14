import CUForm from './common/CUForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '../../../components/Modal'
import React from 'react'
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { selectUID } from '../../../states/reducers/slices/backend/UserSlice'
import { updateUserById } from '../../../api/user'
import { useSelector } from 'react-redux'

const Skills = ({ data }) => {
    const title = "Skills"
    const userId = useSelector(selectUID);
    const [formData, setFormData] = React.useState(data?.skills?.join(','));
    const [validationErrors, setValidationErrors] = React.useState({
        skills: [],
    });

    const handleInputChange = (e) => {
        const { name,value } = e.target;
        setFormData(value.replace(' ', ''));

        // Clear validation error when user starts typing again
        setValidationErrors({
            ...validationErrors,
            [name]: "",
        });
    };

    const handleSubmit = (trigger) => {

        const skillData = { skills: formData.split(',') };
        
        const newValidationErrors = {};
        if (!formData) {
          newValidationErrors.skills = "Skills are required";
        }
        if (Object.keys(newValidationErrors).length > 0) {
            console.log("=====newValidationErrors==",newValidationErrors);
          // Set validation errors and prevent closing the modal
          setValidationErrors(newValidationErrors);
          trigger();
          return;
        }
        
        updateUserById(userId, skillData, trigger);
    }

    const config = [
        {
            type: 'text',
            name: 'skills',
            value: formData,
            onChange: handleInputChange,
            isRequired: true,
            error: {
                status: false,
                message: validationErrors.skills
            }
        }
    ]

    const btnConfig = [{
        title: 'Update',
        handler: handleSubmit,
    }]
    return (
        <>
            <div className="flex justify-between items-center border-l-8 border-backgroundDark font-bold text-lg tablet:pr-6 pr-4">
                <h1 className="px-4 text-2xl mobile:text-xl">{title}</h1>
                <Modal
                    action={<FontAwesomeIcon icon={faPencil} className="text-backgroundDark cursor-pointer hover:text-gray-600" />}
                    title={title}
                    Element={
                        <>
                            <CUForm config={config} handleInputChange={handleInputChange} isFull={false}   validationErrors={validationErrors}/>
                            <p className='text-xs text-gray-600 font-semibold'><span className='text-red-700'>Important Note :</span> Input should be comma-spererated. (e.g. Marketing,Accounting,Developer, etc)</p>
                        </>
                    }
                    btnConfig={btnConfig}
                    validationErrors={validationErrors}
                    check={(closeModal) => {
                      if (!validationErrors?.personalEmail && !validationErrors?.phoneNumber && formData?.phoneNumber && formData?.personalEmail) {
                        closeModal()
                      }
                    }}
                />
            </div>
            {
                data?.skills?.length > 0 &&
                <div className="flex flex-wrap -mx-2 px-10 py-4">
                {
                    data?.skills?.map((skill, index) => {
                        return <div key={index} className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-medium mr-2 mb-2">{skill}</div>
                    })
                }
                </div>
            }
        </>
    )
}

export default Skills
