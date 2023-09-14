import BreadCrumbs from "../../../components/BreadCrumb";
import Calendar from "./Calendar";
import { getCurrentUser } from "../../../api/user";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function Roaster() {
  // Sample roster data with start and end times for each day of the week
  const dispatcher = useDispatch();
  useEffect(() => {
    getCurrentUser(dispatcher);
  });

  return (
    <div className="flex items-center justify-center">
      <div className="w-full rounded-lg py-6 px-2">
        <BreadCrumbs data={['Self Services', 'Roaster']}/>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 overflow-x-scroll">
          <div className="flex"></div>
        </div>
        <div className="pt-10">
          <Calendar />
        </div>
      </div>
    </div>
  );
}

export default Roaster;
