import React, { Fragment } from "react";
import { getUserById, getUserChart } from "../../../api/user";
import { selectCurrentUser, selectUID, selectUserById, selectUserChart } from "../../../states/reducers/slices/backend/UserSlice";

import ImageDefault from "../../../assets/default-avatar.png"
import Loader from "../../../components/Loader";
import call from "./icons8-call-50.png";
import chat from "./icons8-chat-50.png";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import video from "./icons8-video-24.png";

// const Card = ({ data, levelColor }) => {

//   return (
//     <ul className="flex">
//       {/* Render User and Their Children */}
//       {data.map((item, index) => (
//         <Fragment key={index}>
//           <li className="mx-auto">
//             <div className="card">
//               <div className="image">
//                 <img
//                   src={ImageDefault}
//                   alt="Profile"
//                   style={{ borderColor: levelColor }}
//                 />
//               </div>
//               <div>
//                 <div className="card-body -mt-4">
//                   <h4>{item?.data?.firstName + " " + item?.data?.lastName}</h4>
//                   <p>{item.designation ? item.designation : item?.data?.designation?.title}</p>
//                 </div>
//               </div>
//               <div className="card-footer" style={{ background: levelColor }}>
//                 <img src={chat} alt="Chat" />
//                 <img src={call} alt="Call" />
//                 <img src={video} alt="Video" />
//               </div>
//             </div>
//             {item.children.length > 0 && <Card data={item.children} levelColor={levelColor} />}
//           </li>
//         </Fragment>
//       ))}
//     </ul>
//   );
// };
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

  // const dataUser = [
  //   {
  //     data: teamLead,
  //     designation: "Team Lead",
  //     children: [
  //       {
  //         data: user,
  //         children: chart.map((item) => {
  //           return {
  //             data: item,
  //             children: []
  //           }
  //         })
  //       }
  //     ]
  //   }
  // ];


  const dataUser = [
    {
        "_id": "653fab92f66afb08b6cd89ed",
        "firstName": "Ch",
        "lastName": "Umar",
        "isLineManager": true,
        "isTeamLead": false,
        "lineManager": null,
        "children": [
            {
                "_id": "653fbbf8f66afb08b6cd9319",
                "firstName": "Qamar",
                "lastName": "Butt",
                "designation": {
                    "_id": "653faf3ff66afb08b6cd9278",
                    "title": "Cheif Technical Officer"
                },
                "isLineManager": true,
                "isTeamLead": false,
                "lineManager": "653fab92f66afb08b6cd89ed",
                "children": [
                    {
                        "_id": "653fbd33f66afb08b6cd93cd",
                        "firstName": "Madni",
                        "lastName": "Sadiq",
                        "designation": {
                            "_id": "653faf3ff66afb08b6cd9278",
                            "title": "Cheif Technical Officer"
                        },
                        "isLineManager": true,
                        "isTeamLead": false,
                        "lineManager": "653fbbf8f66afb08b6cd9319",
                        "children": [
                            {
                                "_id": "653fbdc5f66afb08b6cd946e",
                                "firstName": "Usman Ghani",
                                "lastName": "Ghani",
                                "designation": {
                                    "_id": "653fae90f66afb08b6cd9217",
                                    "title": "Associate Software Engineer"
                                },
                                "isLineManager": true,
                                "isTeamLead": false,
                                "lineManager": "653fbd33f66afb08b6cd93cd",
                                "children": []
                            },
                            {
                                "_id": "653fbf5cf66afb08b6cd951c",
                                "firstName": "Zeeshan",
                                "lastName": "Bashir",
                                "designation": {
                                    "_id": "653fbf185eaf80404c75c0bf",
                                    "title": "Associate Software Engineer Permanent"
                                },
                                "isLineManager": false,
                                "isTeamLead": false,
                                "lineManager": "653fbd33f66afb08b6cd93cd",
                                "children": []
                            },
                            {
                                "_id": "653fbfe6f66afb08b6cd95c3",
                                "firstName": "Moiz",
                                "lastName": "Asad",
                                "designation": {
                                    "_id": "653fbf185eaf80404c75c0bf",
                                    "title": "Associate Software Engineer Permanent"
                                },
                                "isLineManager": false,
                                "isTeamLead": false,
                                "lineManager": "653fbd33f66afb08b6cd93cd",
                                "children": []
                            },
                            {
                                "_id": "653fc01df66afb08b6cd9661",
                                "firstName": "Haris",
                                "lastName": "Khan",
                                "designation": {
                                    "_id": "653fbf185eaf80404c75c0bf",
                                    "title": "Associate Software Engineer Permanent"
                                },
                                "isLineManager": false,
                                "isTeamLead": false,
                                "lineManager": "653fbd33f66afb08b6cd93cd",
                                "children": []
                            }
                        ]
                    },
                    {
                        "_id": "653fc0bcf66afb08b6cd96f7",
                        "firstName": "Wajid",
                        "lastName": "Ahmad",
                        "designation": {
                            "_id": "653fbf2a5eaf80404c75c0c0",
                            "title": "Software Engineer"
                        },
                        "isLineManager": true,
                        "isTeamLead": false,
                        "lineManager": "653fbbf8f66afb08b6cd9319",
                        "children": [
                            {
                                "_id": "653fc23ef66afb08b6cd9ae4",
                                "firstName": "Talha",
                                "lastName": "Hameed",
                                "designation": {
                                    "_id": "653fbf185eaf80404c75c0bf",
                                    "title": "Associate Software Engineer Permanent"
                                },
                                "isLineManager": false,
                                "isTeamLead": false,
                                "lineManager": "653fc0bcf66afb08b6cd96f7",
                                "children": []
                            }
                        ]
                    },
                    {
                        "_id": "653fc1ccf66afb08b6cd9a6d",
                        "firstName": "Usman",
                        "lastName": "Ilm Din",
                        "designation": {
                            "_id": "653fbf2a5eaf80404c75c0c0",
                            "title": "Software Engineer"
                        },
                        "isLineManager": true,
                        "isTeamLead": false,
                        "lineManager": "653fbbf8f66afb08b6cd9319",
                        "children": []
                    }
                ]
            }
        ]
    },
    {
        "_id": "653fbbf8f66afb08b6cd9319",
        "firstName": "Qamar",
        "lastName": "Butt",
        "designation": {
            "_id": "653faf3ff66afb08b6cd9278",
            "title": "Cheif Technical Officer"
        },
        "isLineManager": true,
        "isTeamLead": false,
        "lineManager": "653fab92f66afb08b6cd89ed",
        "children": [
            {
                "_id": "653fbd33f66afb08b6cd93cd",
                "firstName": "Madni",
                "lastName": "Sadiq",
                "designation": {
                    "_id": "653faf3ff66afb08b6cd9278",
                    "title": "Cheif Technical Officer"
                },
                "isLineManager": true,
                "isTeamLead": false,
                "lineManager": "653fbbf8f66afb08b6cd9319",
                "children": [
                    {
                        "_id": "653fbdc5f66afb08b6cd946e",
                        "firstName": "Usman Ghani",
                        "lastName": "Ghani",
                        "designation": {
                            "_id": "653fae90f66afb08b6cd9217",
                            "title": "Associate Software Engineer"
                        },
                        "isLineManager": true,
                        "isTeamLead": false,
                        "lineManager": "653fbd33f66afb08b6cd93cd",
                        "children": []
                    },
                    {
                        "_id": "653fbf5cf66afb08b6cd951c",
                        "firstName": "Zeeshan",
                        "lastName": "Bashir",
                        "designation": {
                            "_id": "653fbf185eaf80404c75c0bf",
                            "title": "Associate Software Engineer Permanent"
                        },
                        "isLineManager": false,
                        "isTeamLead": false,
                        "lineManager": "653fbd33f66afb08b6cd93cd",
                        "children": []
                    },
                    {
                        "_id": "653fbfe6f66afb08b6cd95c3",
                        "firstName": "Moiz",
                        "lastName": "Asad",
                        "designation": {
                            "_id": "653fbf185eaf80404c75c0bf",
                            "title": "Associate Software Engineer Permanent"
                        },
                        "isLineManager": false,
                        "isTeamLead": false,
                        "lineManager": "653fbd33f66afb08b6cd93cd",
                        "children": []
                    },
                    {
                        "_id": "653fc01df66afb08b6cd9661",
                        "firstName": "Haris",
                        "lastName": "Khan",
                        "designation": {
                            "_id": "653fbf185eaf80404c75c0bf",
                            "title": "Associate Software Engineer Permanent"
                        },
                        "isLineManager": false,
                        "isTeamLead": false,
                        "lineManager": "653fbd33f66afb08b6cd93cd",
                        "children": []
                    }
                ]
            },
            {
                "_id": "653fc0bcf66afb08b6cd96f7",
                "firstName": "Wajid",
                "lastName": "Ahmad",
                "designation": {
                    "_id": "653fbf2a5eaf80404c75c0c0",
                    "title": "Software Engineer"
                },
                "isLineManager": true,
                "isTeamLead": false,
                "lineManager": "653fbbf8f66afb08b6cd9319",
                "children": [
                    {
                        "_id": "653fc23ef66afb08b6cd9ae4",
                        "firstName": "Talha",
                        "lastName": "Hameed",
                        "designation": {
                            "_id": "653fbf185eaf80404c75c0bf",
                            "title": "Associate Software Engineer Permanent"
                        },
                        "isLineManager": false,
                        "isTeamLead": false,
                        "lineManager": "653fc0bcf66afb08b6cd96f7",
                        "children": []
                    }
                ]
            },
            {
                "_id": "653fc1ccf66afb08b6cd9a6d",
                "firstName": "Usman",
                "lastName": "Ilm Din",
                "designation": {
                    "_id": "653fbf2a5eaf80404c75c0c0",
                    "title": "Software Engineer"
                },
                "isLineManager": true,
                "isTeamLead": false,
                "lineManager": "653fbbf8f66afb08b6cd9319",
                "children": []
            }
        ]
    },
    {
        "_id": "653fbd33f66afb08b6cd93cd",
        "firstName": "Madni",
        "lastName": "Sadiq",
        "designation": {
            "_id": "653faf3ff66afb08b6cd9278",
            "title": "Cheif Technical Officer"
        },
        "isLineManager": true,
        "isTeamLead": false,
        "lineManager": "653fbbf8f66afb08b6cd9319",
        "children": [
            {
                "_id": "653fbdc5f66afb08b6cd946e",
                "firstName": "Usman Ghani",
                "lastName": "Ghani",
                "designation": {
                    "_id": "653fae90f66afb08b6cd9217",
                    "title": "Associate Software Engineer"
                },
                "isLineManager": true,
                "isTeamLead": false,
                "lineManager": "653fbd33f66afb08b6cd93cd",
                "children": []
            },
            {
                "_id": "653fbf5cf66afb08b6cd951c",
                "firstName": "Zeeshan",
                "lastName": "Bashir",
                "designation": {
                    "_id": "653fbf185eaf80404c75c0bf",
                    "title": "Associate Software Engineer Permanent"
                },
                "isLineManager": false,
                "isTeamLead": false,
                "lineManager": "653fbd33f66afb08b6cd93cd",
                "children": []
            },
            {
                "_id": "653fbfe6f66afb08b6cd95c3",
                "firstName": "Moiz",
                "lastName": "Asad",
                "designation": {
                    "_id": "653fbf185eaf80404c75c0bf",
                    "title": "Associate Software Engineer Permanent"
                },
                "isLineManager": false,
                "isTeamLead": false,
                "lineManager": "653fbd33f66afb08b6cd93cd",
                "children": []
            },
            {
                "_id": "653fc01df66afb08b6cd9661",
                "firstName": "Haris",
                "lastName": "Khan",
                "designation": {
                    "_id": "653fbf185eaf80404c75c0bf",
                    "title": "Associate Software Engineer Permanent"
                },
                "isLineManager": false,
                "isTeamLead": false,
                "lineManager": "653fbd33f66afb08b6cd93cd",
                "children": []
            }
        ]
    },
    {
        "_id": "653fbdc5f66afb08b6cd946e",
        "firstName": "Usman Ghani",
        "lastName": "Ghani",
        "designation": {
            "_id": "653fae90f66afb08b6cd9217",
            "title": "Associate Software Engineer"
        },
        "isLineManager": true,
        "isTeamLead": false,
        "lineManager": "653fbd33f66afb08b6cd93cd",
        "children": []
    },
    {
        "_id": "653fc0bcf66afb08b6cd96f7",
        "firstName": "Wajid",
        "lastName": "Ahmad",
        "designation": {
            "_id": "653fbf2a5eaf80404c75c0c0",
            "title": "Software Engineer"
        },
        "isLineManager": true,
        "isTeamLead": false,
        "lineManager": "653fbbf8f66afb08b6cd9319",
        "children": [
            {
                "_id": "653fc23ef66afb08b6cd9ae4",
                "firstName": "Talha",
                "lastName": "Hameed",
                "designation": {
                    "_id": "653fbf185eaf80404c75c0bf",
                    "title": "Associate Software Engineer Permanent"
                },
                "isLineManager": false,
                "isTeamLead": false,
                "lineManager": "653fc0bcf66afb08b6cd96f7",
                "children": []
            }
        ]
    },
    {
        "_id": "653fc1ccf66afb08b6cd9a6d",
        "firstName": "Usman",
        "lastName": "Ilm Din",
        "designation": {
            "_id": "653fbf2a5eaf80404c75c0c0",
            "title": "Software Engineer"
        },
        "isLineManager": true,
        "isTeamLead": false,
        "lineManager": "653fbbf8f66afb08b6cd9319",
        "children": []
    }
]
  return (
    <div className="org-tree">
      {
        (!loader ? <Card data={dataUser} levelColor={userColor} /> : <div className="w-full h-full flex justify-center items-center"><Loader color={'black'} /></div>)
      }
    </div>
  );
};

export default Chart;