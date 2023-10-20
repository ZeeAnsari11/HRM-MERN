import { getAssetTypesByOrganizationId, saveAssetFormData } from '../../api/asset';
import { selectCurrentUserOrg, selectCurrentUserRole, selectOrgId } from '../../states/reducers/slices/backend/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import React from 'react';
import { commonStyles } from '../../styles/common';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { selectAssetTypes } from '../../states/reducers/slices/backend/Assets';
import { useDropzone } from "react-dropzone";


const Asset = () => {

  let orgId = useSelector(selectCurrentUserOrg);
  let role = useSelector(selectCurrentUserRole);
  

  const [name, setName] = React.useState('');
  const [condition, setCondition] = useState('');
  const [manufacturedBy, setManufacturedBy] = useState('');
  const [model, setModel] = useState('');
  const [isTaxable, setIsTaxable] = useState(false);
  const [price, setPrice] = useState(0);
  const [assetImage, setAssetImage] = useState(null);
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [assetPreview, setAssetPreview] = useState(null);
  const dispatcher = useDispatch();

  const handleDrop = (acceptedFiles) => {
    setAssetImage(acceptedFiles[0]);
    setAssetPreview(URL.createObjectURL(acceptedFiles[0]));
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleDrop });

  
  const handleSubmit = (e) => {
    
    e.preventDefault();

    
    const newAsset = {
      organization,
      name,
      condition,
      ManufacturedBy: manufacturedBy,
      Model: model,
      isTaxable,
      price,
      assetImage,
      description,
      type,
    };
    saveAssetFormData(newAsset, orgId, role)
  };

  const organization = useSelector(selectOrgId)
  const assetType = useSelector(selectAssetTypes)
  useEffect(() => {
    getAssetTypesByOrganizationId(organization, dispatcher,role)
  }, []);

  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl block text-gray-700 font-bold mb-2 pl-1 pr-4 py-2">Add Asset</h1>
      <form onSubmit={handleSubmit}>
        {/* Name field */}
        <div>
          <label htmlFor="name" className="block text-gray-700 text-sm pl-1 pr-4 py-2 font-semibold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={commonStyles.input}
            placeholder="Enter name of asset"
            required
          />
        </div>

        {/* Condition field */}
        <div>
          <label htmlFor="condition" className="block font-semibold text-gray-700 text-sm pl-1 pr-4 py-2">
            Condition
          </label>
          <input
            type="text"
            id="condition"
            name="condition"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className={commonStyles.input}
            placeholder="Enter current condition of asset"
            required
          />
        </div>

        {/* Manufactured by field */}
        <div>
          <label htmlFor="manufacturedBy" className="block font-semibold text-gray-700 text-sm pl-1 pr-4 py-2">
            Manufactured By
          </label>
          <input
            type="text"
            id="manufacturedBy"
            name="manufacturedBy"
            value={manufacturedBy}
            onChange={(e) => setManufacturedBy(e.target.value)}
            className={commonStyles.input}
            placeholder="Enter manufacturer name"
            required
          />
        </div>
        <div>
          <label htmlFor="model" className="block text-gray-700 text-sm font-semibold pl-1 pr-4 py-2">
            Model
          </label>
          <input
            type="text"
            id="model"
            name="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className={commonStyles.input}
            placeholder="Enter model name"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2 pl-1 pr-4 py-2" htmlFor="isTaxable">
            <input
              className="mr-2 border border-backgroundDark leading-tight"
              type="checkbox"
              id="short"
              checked={isTaxable}
              onChange={(e) => setIsTaxable(e.target.checked)}
            />
            <span className="text-sm font-semibold">Is Taxable</span>
          </label>
        </div>
        <div>
          <label htmlFor="price" className="block text-gray-700 text-sm font-semibold mb-2 pl-1 pr-4 py-2">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={commonStyles.input}
            placeholder="Enter price of asset"
            required
          />
        </div>
        <div>
          <label htmlFor="type" className="block text-gray-700 text-sm font-semibold mb-2 pl-1 pr-4 py-2">
            Type
          </label>
          <select
            type="text"
            id="type"
            name="type"
            onChange={(e) => setType(e.target.value)}
            className={commonStyles.input}
            placeholder="Enter type ID"
            required
          >
            <option value="">Select Asset Type</option>
            {assetType.map((type) => {
              return <option key={type._id} value={type._id}>{type.type}</option>;
            })}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2 pl-1 pr-4 py-2 " htmlFor="attachment">
            Asset Image
          </label>
          <div {...getRootProps()} className="border border-dashed p-4 border-backgroundDark">
            <input {...getInputProps()} accept=".pdf,.doc,.docx,image/*" />
            {assetPreview ? (
              <img src={assetPreview} alt="Attachment Preview" className="mx-auto mb-4" />
            ) : (
              <>
                <FontAwesomeIcon icon={faCloudUploadAlt} className="text-4xl mb-4 mx-auto flex justify-center items-center" />
                <p className="text-center">Drag 'n' drop some files here, or click to select files</p>
              </>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="description" className="block text-gray-700 text-sm font-semibold mb-2 pl-1 pr-4 py-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={commonStyles.input}
            placeholder="Enter description of asset"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-backgroundDark hover:bg-white hover:text-backgroundDark border border-backgroundDark text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Asset
          </button>
        </div>
      </form>
    </div>
  );
};

// Export the component
export default Asset;
