import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AllocateDeallocateAsset } from "../../api/asset";
import { selectAllocationAction, selectAllocationId } from "../../states/reducers/slices/backend/Assets";
const FormGG = () => {
    const [user, setUser] = useState('');
    const [reason, setReason] = useState('');
    const [condition, setCondition] = useState('');
    const [date, setDate] = useState('');
    const id = useSelector(selectAllocationId)
    const action = useSelector(selectAllocationAction)
    const dispatcher = useDispatch()
  
    const handleFormSubmit = (event) => {
      event.preventDefault();
      const asset = id
      const allocationOfAsset = {
        user,
        condition,
        asset,
        reason,
        date,
        action
      };
      AllocateDeallocateAsset(allocationOfAsset, dispatcher)
  
    }
  
    return (
      <form onSubmit={handleFormSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="user" className="block text-gray-700 text-sm font-bold mb-2">
            User
          </label>
          <input type="text" id="user" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={user} onChange={(event) => setUser(event.target.value)} />
        </div>
  
        <div className="mb-4">
          <label htmlFor="reason" className="block text-gray-700 text-sm font-bold mb-2">
            Reason
          </label>
          <input type="text" id="reason" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={reason} onChange={(event) => setReason(event.target.value)} />
        </div>
  
        <div className="mb-4">
          <label htmlFor="condition" className="block text-gray-700 text-sm font-bold mb-2">
            Condition
          </label>
          <input type="text" id="condition" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={condition} onChange={(event) => setCondition(event.target.value)} />
        </div>
  
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">
            Date
          </label>
          <input type="date" id="date" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={date} onChange={(event) => setDate(event.target.value)} />
        </div>
  
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Submit
          </button>
        </div>
      </form>
  
    )
  }
export default FormGG  