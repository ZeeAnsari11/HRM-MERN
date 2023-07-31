import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faEye } from '@fortawesome/free-solid-svg-icons';
import FormFields from "./Formfields";
import { useSelector } from "react-redux";
import { selecteUpdatedLeave } from "../../../states/reducers/slices/backend/UserSlice";
import { deleteLeaveRequest, updateLeaveRequest } from "../../../api/leaverequest";
import EditLeaves from "./EditLeaves";

export default function View({ selectedId }) {
  const [showModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const leave = useSelector(selecteUpdatedLeave)

  console.log("helllo", leave);
  
  const handleDelete = () => {
    deleteLeaveRequest(selectedId)
  }

  const handleSubmit = () => {
    updateLeaveRequest(leave, selectedId);
      setShowModal(false);
      setEdit(false);
  }

  const handleEdit = (e) => {
    setShowModal(true)
    setEdit(true)
  }

  return (
    <>
      <div className='pr-2'>
        <button className="bg-transparent hover:bg-gray-200 text-gray-800 font-semibold rounded" onClick={(e) => handleEdit(e)}>
          <FontAwesomeIcon icon={faEdit} />
        </button>
      </div>
      <div className='pr-2'>
        <button className="bg-transparent hover:bg-gray-200 text-gray-800 font-semibold rounded" onClick={() => setShowModal(true)}>
          <FontAwesomeIcon icon={faEye} />
        </button>
      </div>
      <div className='pr-2'>
        <button className="bg-transparent hover:bg-gray-200 text-gray-800 font-semibold rounded" onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>

      {showModal ? (
        <>
          <div
            className="mt-20 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="mt-20 relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="mt-10 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Leave Request View
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-4 flex-auto">
                  {edit ? (
                    <EditLeaves id={selectedId} />
                  ) : <FormFields id={selectedId} />}
                  <div className="pr-4 flex items-center justify-end">
                    {edit ? (
                      <>
                        <button
                          className="bg-backgroundDark flex items-center justify-between hover:bg-white hover:text-backgroundDark border border-backgroundDark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          type="submit"
                          onClick={() => { setShowModal(false); setEdit(false); }}
                        >
                          Close
                        </button>
                        <div className="pl-2">
                          <button
                            className="bg-backgroundDark flex items-center justify-between hover:bg-white hover:text-backgroundDark border border-backgroundDark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                            onClick={() => { handleSubmit() }}
                          >
                            Update
                          </button>
                        </div></>
                    ) : <button
                      className="bg-backgroundDark flex items-center justify-between hover:bg-white hover:text-backgroundDark border border-backgroundDark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
                      onClick={() => { setShowModal(false); setEdit(false) }}
                    >
                      Close
                    </button>}
                  </div>
                </div>
                {/*footer*/}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

