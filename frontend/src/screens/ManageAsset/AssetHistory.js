import { useEffect, useState } from "react";
import { getAssetHistoryById } from "../../api/asset";

const AssetHistoryPage = ({data}) => {

  const [assetHistory, setAssetHistory] = useState([])

  useEffect(() => {
    getAssetHistoryById(data, setAssetHistory);
  }, []);

  return (
    <div className="overflow-x-auto">
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
          {assetHistory.map((asset) => {
            if (asset !== null ) 
            return <tr key={asset?._id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-4">{asset?.action}</td>
              <td className="py-3 px-4">{asset?.user.firstName + " " + asset?.user.lastName }</td>
              <td className="py-3 px-4">{asset?.condition}</td>
              <td className="py-3 px-4">{asset?.date.substring(0,10)}</td>
              <td className="py-3 px-4">{asset?.reason}</td>
            </tr>
      })}
        </tbody>
      </table>
    </div>
  );
};

export default AssetHistoryPage;
