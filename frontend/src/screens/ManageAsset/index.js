import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import MyModal from "./Modal/Modal";
import { getAssetByOrganizationId } from "../../api/asset";
import { useDispatch, useSelector } from 'react-redux';
import { selectOrgId } from "../../states/reducers/slices/backend/UserSlice";
import { selectAllAsset} from "../../states/reducers/slices/backend/Assets";
import AssetHistoryPage from "./AssetHistory";
import FormGG from "./Form";


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
                Form={<AssetHistoryPage data={asset._id}/>}
                id={asset._id}
                name = {asset.name}
              />
              <MyModal
                title={'allocate'}
                Form={<FormGG/>}
                id={asset._id}
              />
              <MyModal
                title={'deallocate'}
                Form={<FormGG/>}
                id={asset._id}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default ManageAssets;

