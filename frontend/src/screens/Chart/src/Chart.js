import React, { Fragment } from "react";
import call from "./icons8-call-50.png";
import video from "./icons8-video-24.png";
import chat from "./icons8-chat-50.png";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectCurrentUser, selectUID, selectUserById, selectUserChart } from "../../../states/reducers/slices/backend/UserSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserById, getUserChart } from "../../../api/user";
import ImageDefault from "../../../assets/default-avatar.png"
import Loader from "../../../components/Loader";

const Card = ({ data, levelColor }) => {
  return (
    <ul className="flex">
      {/* Render User and Their Children */}
      {data.map((item, index) => (
        <Fragment key={index}>
          <li className="mx-auto">
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
                  <h4>{item?.data?.firstName + " " + item?.data?.lastName}</h4>
                  <p>{item.designation ? item.designation : item?.data?.designation?.title}</p>
                </div>
              </div>
              <div className="card-footer" style={{ background: levelColor }}>
                <img src={chat} alt="Chat" />
                <img src={call} alt="Call" />
                <img src={video} alt="Video" />
              </div>
            </div>
            {item.children.length > 0 && <Card data={item.children} levelColor={levelColor} />}
          </li>
        </Fragment>
      ))}
    </ul>
  );
};

const Chart = () => {
  const [loader, setLoader] = React.useState(true);
  const user_id = useSelector(selectUID)
  const user = useSelector(selectCurrentUser)
  const lineManager = user.lineManager
  const dispatcher = useDispatch()
  
  useEffect(() => {
    getUserChart(user_id, dispatcher)
    getUserById(lineManager, dispatcher, setLoader)
  }, [])

  const teamLead = useSelector(selectUserById);
  const chart = useSelector(selectUserChart)

  console.log("chart", chart);

  const userColor = "#1fcecb";   

  const dataUser = [
    {
      data: teamLead,
      designation: "Team Lead",
      children: [
        {
          data: user,
          children: chart.map((item) => {
            return {
              data: item,
              children: []
            }
          })
        }
      ]
    }
  ];

  return (
    <div className="org-tree">
      {
        (!loader ?  <Card data={dataUser} levelColor={userColor} /> : <div className="w-full h-full flex justify-center items-center"><Loader color={'black'}/></div>)
      }
    </div>
  );
};

export default Chart;
