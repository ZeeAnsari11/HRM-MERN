import React, { Fragment } from "react";
import { getUserById, getUserChart } from "../../../api/user";
import { selectCurrentUser, selectCurrentUserOrg, selectCurrentUserRole, selectUID, selectUserById, selectUserChart } from "../../../states/reducers/slices/backend/UserSlice";

import ImageDefault from "../../../assets/default-avatar.png"
import Loader from "../../../components/Loader";
import call from "./icons8-call-50.png";
import chat from "./icons8-chat-50.png";
import { getOrgChart } from "../../../api/organization";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import video from "./icons8-video-24.png";

const Card = ({ data, levelColor }) => {
 

  return (
    <ul className="flex">
      {data.map((item) => (
        <li className="mx-auto" key={item._id}>
          <div className="card">
            <div className="image">
              <img
                src={ImageDefault}
                alt="Profile"
                style={{ borderColor: levelColor }}
              />
            </div>
            <div>
              <div className="card-body -mt-4">
                <h4>{item.firstName + " " + item.lastName}</h4>
                <p>{item.designation?.title}</p>
              </div>
            </div>
            <div className="card-footer" style={{ background: levelColor }}>
              <img src={chat} alt="Chat" />
              <img src={call} alt="Call" />
              <img src={video} alt="Video" />
            </div>
          </div>
          {item.children && item.children.length > 0 && (
            <Card data={item.children} levelColor={levelColor} />
          )}
        </li>
      ))}
    </ul>
  );
}

const Chart = () => {
  const [loader, setLoader] = React.useState(true);
  const [dataUser, setDataUser] = React.useState([]);
  
 let orgId = useSelector(selectCurrentUserOrg);
  let role = useSelector(selectCurrentUserRole);

  
  useEffect(() => {
    getOrgChart(orgId, role, setLoader, setDataUser)
  }, [])

  const teamLead = useSelector(selectUserById);
  const chart = useSelector(selectUserChart)

  console.log("chart", chart);

  const userColor = "#1fcecb";
  
  return (
    <div className="org-tree">
      {
        (!loader ? <Card data={dataUser} levelColor={userColor} /> : <div className="w-full h-full flex justify-center items-center"><Loader color={'black'} /></div>)
      }
    </div>
  );
};

export default Chart;