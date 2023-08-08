import React, { useEffect, useState } from "react";
import { getAssetHistoryById } from "../../api/asset";
import NotFound from "../../components/utils/NotFound";

const AssetHistoryPage = ({ data }) => {
  const [assetHistory, setAssetHistory] = useState([]);

  useEffect(() => {
    getAssetHistoryById(data, setAssetHistory);
  }, []);

  const description = "Record of this Asset Does not exist"
  const header = "History Not Found";

  console.log("Asset length", assetHistory.length);
  return (
    <div className="overflow-x-auto">
      {assetHistory.length > 0 ? (
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-4 text-left">Action</th>
              <th className="py-3 px-4 text-left">Assigned To</th>
              <th className="py-3 px-4 text-left">Condition</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Reason</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {assetHistory.map((asset) => (
              <tr
                key={asset?._id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-4">{asset?.action}</td>
                <td className="py-3 px-4">
                  {asset?.user.firstName + " " + asset?.user.lastName}
                </td>
                <td className="py-3 px-4">{asset?.condition}</td>
                <td className="py-3 px-4">{asset?.date.substring(0, 10)}</td>
                <td className="py-3 px-4">{asset?.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <NotFound description = {description} header = {header}></NotFound>
      )}
    </div>
  );
};

export default AssetHistoryPage;
