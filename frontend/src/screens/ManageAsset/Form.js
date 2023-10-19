import React, { useEffect, useState } from "react";
import { selectAllUsers, selectCurrentUserRole, selectOrgId } from "../../states/reducers/slices/backend/UserSlice";
import { selectAllocationAction, selectAllocationId, selectAsset } from "../../states/reducers/slices/backend/Assets";
import { useDispatch, useSelector } from "react-redux";

import { AllocateDeallocateAsset } from "../../api/asset";
import Loader from "../../components/Loader";
import SelectForm from "../../components/SelectForm";
import { getAllUsersByOrganization } from "../../api/user";
import { getAssetById } from "../../api/asset";

const FormGG = () => {
  const orgId = useSelector(selectOrgId)
  let role = useSelector(selectCurrentUserRole);
  
  const [user, setUser] = useState("");
  const [reason, setReason] = useState("");
  const [condition, setCondition] = useState("");
  const [date, setDate] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const id = useSelector(selectAllocationId);
  const action = useSelector(selectAllocationAction);
  const dispatcher = useDispatch();
  const org_id = useSelector(selectOrgId);
  const users = useSelector(selectAllUsers);
  const asset = useSelector(selectAsset);

  useEffect(() => {
    getAllUsersByOrganization(org_id, dispatcher);
    getAssetById(id, dispatcher, orgId, role);
  }, [org_id, dispatcher, id]);

  const handleInputChange = (e) => {
    setUser(e.target.value);
  };

  console.log("action", action);
  useEffect(() => {
    if (action === "deallocate") {
      setUser(asset?.user?._id);
    }
  }, [action, asset?.user?._id]);

  const [errors, setErrors] = useState({
    user: false,
    reason: false,
    condition: false,
    date: false,
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setShowLoading(true);

    if ((action === "allocate" && user) || (reason && condition && date)) {
      setErrors({
        user: action === "allocate" && !user,
        reason: !reason,
        condition: !condition,
        date: !date,
      });

      if (action === "allocate" && !user) {
        setShowLoading(false);
        return;
      } else {
        const allocationOfAsset = {
          user,
          condition,
          asset: id,
          reason,
          date,
          action,
        };
        AllocateDeallocateAsset(allocationOfAsset, dispatcher, setShowLoading, orgId, role);
      }
    } else {
      setShowLoading(false);
      setErrors({
        user: action === "allocate" && !user,
        reason: !reason,
        condition: !condition,
        date: !date,
      });
    }
  };

    return (
      <form onSubmit={handleFormSubmit} className="rounded pt-6 mb-4">
        <div className="mb-4">
          <div className={`md:col-span-5 ${errors.user ? "border-red-500" : ""}`}>
            <p>User</p>
            {action === "allocate" ? (
              <div>
                <SelectForm name="user" title={"User"} people={users} handleInputChange={handleInputChange} />
                {errors.user && <p className="text-red-500">User is required</p>}
              </div>
            ) : (
              asset?.user ? (
                <input
                  type="text"
                  className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                  readOnly
                  value={`${asset?.user?.firstName} ${asset?.user?.lastName} (${asset?.user?.userDefinedCode})`}
                />
              ) : (
                <p>Asset is not allocated to anyone</p>
              )
            )}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="reason" className="block text-gray-700 text-sm font-bold mb-2">
            Reason
          </label>
          <input
            type="text"
            id="reason"
            className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.reason ? "border-red-500" : ""
              }`}
            value={reason}
            onChange={(event) => setReason(event.target.value)}
          />
          {errors.reason && <p className="text-red-500">Reason is required</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="condition" className="block text-gray-700 text-sm font-bold mb-2">
            Condition
          </label>
          <input
            type="text"
            id="condition"
            className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.condition ? "border-red-500" : ""
              }`}
            value={condition}
            onChange={(event) => setCondition(event.target.value)}
          />
          {errors.condition && <p className="text-red-500">Condition is required</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">
            Date
          </label>
          <input
            type="date"
            id="date"
            className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.date ? "border-red-500" : ""
              }`}
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
          {errors.date && <p className="text-red-500">Date is required</p>}
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit {(showLoading) && <Loader color="white" />}
          </button>
        </div>
      </form>
    );
  };

  export default FormGG;
