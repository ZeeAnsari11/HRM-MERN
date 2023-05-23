import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import MyModal from "./Modal/Modal";
import { AllocateDeallocateAsset, getAssetByOrganizationId } from "../../api/asset";
import { useDispatch, useSelector } from 'react-redux';
import { selectOrgId } from "../../states/reducers/slices/backend/UserSlice";
import { selectAllAsset, selectAllocationAction, selectAllocationId, selectAsset, setAsset } from "../../states/reducers/slices/backend/Assets";


const ManageAssets = () => {

  const dispatcher = useDispatch();
  const organization = useSelector(selectOrgId)
  console.log("organization", organization);
  useEffect(() => {
    getAssetByOrganizationId(organization, dispatcher)
  }, []);

  const assets = useSelector(selectAllAsset)
  console.log(assets);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = () => {
    alert('Submited')
  }


  const filteredAssets = assets.filter((asset) =>
    asset.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center justify-center">
          <h2 className="text-2xl font-semibold text-primary-dark">
            Manage Assets
          </h2>
        </div>
        <div className="flex items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Assets"
              className="w-64 p-2 border rounded-md mr-2"
              onChange={handleSearch}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
              <FontAwesomeIcon icon={faSearch} />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredAssets.map((asset) => (
          <div
            key={asset.id}
            className="border border-gray-300 bg-white rounded-md overflow-hidden"
          >
            <div className="w-full h-40 overflow-hidden">
              <img src={asset.image} alt={asset.name} className="object-cover w-full h-full" />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-primary-dark">{asset.name}</h3>
              <p className="text-bold text-primary-light">{asset.category}</p>
              <p className="text-sm">{asset.description}</p>
              <MyModal
                title={'History'}
                Form={AssetHistoryPage}
                id={asset._id}
              />
              <MyModal
                title={'allocate'}
                Form={FormGG}
                id={asset._id}
              />
              <MyModal
                title={'deallocate'}
                Form={FormGG}
                id={asset._id}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

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


const AssetHistoryPage = () => {
  
  // const assetHistory = 
  //   {
  //     history: [
  //       { assignedTo: 'John Doe', condition: 'Good', date: '2023-05-01' },
  //       { assignedTo: 'Jane Smith', condition: 'Fair', date: '2023-04-28' },
  //       { assignedTo: 'Bob Johnson', condition: 'Poor', date: '2023-04-15' },
  //     ],
  //   }

  const id = useSelector(selectAllocationId)
  const dispatcher = useDispatch()

  useEffect(() => {
    setAsset(id, dispatcher)
  }, []);
  
  const assetHistory = useSelector(selectAsset)

  console.log(assetHistory);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-4 text-left">Asset Name</th>
              <th className="py-3 px-4 text-left">Assigned To</th>
              <th className="py-3 px-4 text-left">Condition</th>
              <th className="py-3 px-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {assetHistory.history.map((asset) => (
              <tr key={asset.id} className="border-b border-gray-200 hover:bg-gray-100">
                {/* <td className="py-3 px-4">{asset.assetName}</td> */}
                <td className="py-3 px-4">{asset.assignedTo}</td>
                <td className="py-3 px-4">{asset.condition}</td>
                <td className="py-3 px-4">{asset.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageAssets;

