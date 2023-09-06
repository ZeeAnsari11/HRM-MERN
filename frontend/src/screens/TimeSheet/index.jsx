import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../states/reducers/slices/backend/UserSlice";
// import { selectUserDepartment } from "../../states/reducers/slices/backend/Department";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import {
  timeSheetTable,
  timeSheet,
  sheetTh,
  shhetTd,
  workingTable,
  sheetviewBg,
  sheetviewTitle,
} from "./AttenceView";
import { timesheetAttendence } from "../../api/attendence";

const TimeSheet = () => {
  /* Time Sheet Style */

  const dispatcher = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  // Time slots
  const start = currentUser.userRoster.timeSlots.startTime;
  const startDate = new Date(start).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const end = currentUser.userRoster.timeSlots.endTime;
  const endDate = new Date(end).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  // Joining Date
  const joining = currentUser.joiningDate;
  const options = { year: "numeric", month: "long", day: "numeric" };
  const joiningDate = new Date(joining).toLocaleDateString("en-US", options);

  useEffect(() => {
    timesheetAttendence(dispatcher, currentUser._id);
  }, []);

  // const userDepartment = useSelector(selectUserDepartment);

  return (
    <div>
      <div className={"grid grid-cols-2 md:grid-cols-4 gap-2 mt-10 text-sm"}>
        {timeSheetTable.map((table) => {
          return (
            <div className={`${timeSheet} ${table.borderLeft}`}>
              <div>{table.title}</div>
              <div>{table.value}</div>
            </div>
          );
        })}
      </div>

      {/* User Name */}
      <div>
        <h1
          className={
            "text-xl md:text-3xl font-semibold text-center mt-12 mb-16 capitalize"
          }
        >
          {currentUser.firstName} {currentUser.lastName} (
          {currentUser.organization.userCode.prefix} -{" "}
          {currentUser.userDefinedCode})
        </h1>
      </div>

      {/* Attendence time sheet */}
      <div>
        <div className="max-w-screen-xl mx-auto overflow-x-scroll flex items-center justify-center bg-gray-100 font-sans">
          <div className={"overflow-auto"}>
            <div className="bg-white shadow-md rounded my-6">
              <table>
                <thead>
                  <tr
                    scope="row"
                    className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal"
                  >
                    {workingTable.map((workHour) => {
                      return <th className={`${sheetTh}`}>{workHour.title}</th>;
                    })}
                  </tr>
                </thead>
                <tbody className="text-gray-600 font-light">
                  <tr className="border-b border-gray-200 hover:bg-gray-100 text-center w-full">
                    <td className={`${shhetTd}`}>Mon, 1 May 2023</td>
                    <td className={`${shhetTd}`}>Expected {startDate}</td>
                    <td className={`${shhetTd}`}>
                      <span
                        className={`bg-green-600 p-1.5 text-white rounded-md`}
                      >
                        on Time
                      </span>
                    </td>
                    <td className={`${shhetTd}`}>Expected {endDate}</td>
                    <td className={`${shhetTd}`}>
                      <span
                        className={"bg-green-600 p-1.5 text-white rounded-md"}
                      >
                        on Time
                      </span>
                    </td>
                    <td className={`${shhetTd}`}>8h</td>
                    <td className={`${shhetTd}`}>-</td>
                    <td className={`${shhetTd}`}>-</td>
                    <td className={`${shhetTd}`}>-</td>
                    <td className="py-q px-3 text-center">
                      <div className="flex item-center justify-center">
                        <div className="w-6 mr-2 transform hover:text-primaryColorLight hover:scale-110">
                          <Popup
                            trigger={
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            }
                            modal
                          >
                            {(close) => (
                              <div className="modal">
                                <div>
                                  <div
                                    className={
                                      "header border-b-2 w-full text-xl font-normal px-2 pt-1 pb-2"
                                    }
                                  >
                                    <span className={"font-semibold"}>
                                      Attendence
                                    </span>
                                    <span className={"pl-1"}>View</span>
                                  </div>
                                  <div className="content mt-7 md:mx-3 grid md:grid-cols-2 gap-x-7 gap-y-2">
                                    <div className={`${sheetviewBg}`}>
                                      <div className={`${sheetviewTitle}`}>
                                        Employee Code
                                      </div>
                                      <div className={"capitilize text-sm "}>
                                        {
                                          currentUser.organization.userCode
                                            .prefix
                                        }
                                        -{currentUser.userDefinedCode}
                                      </div>
                                    </div>
                                    <div
                                      className={
                                        "md:bg-[#f9f9f9] px-4 py-1.5 flex"
                                      }
                                    >
                                      <div className={`${sheetviewTitle}`}>
                                        Name
                                      </div>
                                      <div
                                        className={
                                          "capitalize text-sm w-1/2 md:w-auto"
                                        }
                                      >
                                        {currentUser.firstName}{" "}
                                        {currentUser.lastName}
                                      </div>
                                    </div>

                                    <div
                                      className={
                                        "bg-[#f9f9f9] md:bg-transparent px-4 py-1.5 flex"
                                      }
                                    >
                                      <div className={`${sheetviewTitle}`}>
                                        Company
                                      </div>
                                      <div
                                        className={
                                          "capitalize text-sm w-1/2 md:w-auto"
                                        }
                                      >
                                        {currentUser.organization.name}
                                      </div>
                                    </div>

                                    <div className={"px-4 py-1.5 flex"}>
                                      <div className={`${sheetviewTitle}`}>
                                        Location
                                      </div>
                                      <div
                                        className={
                                          "capitalize text-sm w-1/2 md:w-auto"
                                        }
                                      >
                                        {currentUser.branch.city}
                                      </div>
                                    </div>

                                    <div className={`${sheetviewBg}`}>
                                      <div className={`${sheetviewTitle}`}>
                                        Branch
                                      </div>
                                      <div
                                        className={
                                          "capitalize text-sm w-1/2 md:w-auto"
                                        }
                                      >
                                        {currentUser.branch.name}
                                      </div>
                                    </div>
                                    <div
                                      className={
                                        "md:bg-[#f9f9f9] px-4 py-1.5 flex"
                                      }
                                    >
                                      <div className={`${sheetviewTitle}`}>
                                        Department
                                      </div>
                                      {/* <div>{userDepartment.department}</div> */}
                                    </div>
                                    <div
                                      className={
                                        "px-4 py-1.5 flex bg-[#f9f9f9] md:bg-transparent"
                                      }
                                    >
                                      <div className={`${sheetviewTitle}`}>
                                        Job Tile
                                      </div>
                                      <div
                                        className={
                                          "capitalize text-sm w-1/2 md:w-auto"
                                        }
                                      >
                                        {currentUser.designation.title}
                                      </div>
                                    </div>

                                    <div className={"px-4 py-1.5 flex"}>
                                      <div className={`${sheetviewTitle}`}>
                                        Joining Date
                                      </div>
                                      <div
                                        className={
                                          "capitalize text-sm w-1/2 md:w-auto"
                                        }
                                      >
                                        {joiningDate}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="content mt-20 md:px-4 grid gap-y-1 pb-20 overflow-x-hidden">
                                    <div
                                      className={`${sheetviewBg} justify-between items-center`}
                                    >
                                      <div
                                        className={
                                          "text-sm font-semibold w-4/12"
                                        }
                                      >
                                        Day
                                      </div>
                                      <div
                                        className={"w-1/2 bg-[#eee] p-1.5"}
                                      >
                                        <input
                                          type="text"
                                          disabled
                                          className={"cursor-not-allowed"}
                                        />
                                      </div>
                                    </div>
                                    <div
                                      className={
                                        "px-4 py-1.5 flex justify-between items-center"
                                      }
                                    >
                                      <div
                                        className={
                                          "text-sm font-semibold w-4/12"
                                        }
                                      >
                                        Expected Checkin
                                      </div>
                                      <div
                                        className={
                                          "w-1/2 bg-[#eee] p-1.5 text-sm cursor-not-allowed"
                                        }
                                      >
                                        {startDate}
                                        <input type="text" disabled />
                                      </div>
                                    </div>
                                    <div
                                      className={`${sheetviewBg} justify-between items-center`}
                                    >
                                      <div
                                        className={
                                          "text-sm font-semibold w-4/12"
                                        }
                                      >
                                        Checkin Time
                                      </div>
                                      <div
                                        className={
                                          `first-line w-1/2 bg-[#eee] p-1.5 cursor-not-allowed`
                                        }
                                      >
                                        <input type="text" disabled />
                                      </div>
                                    </div>
                                    <div
                                      className={
                                        `px-4 py-1.5 flex justify-between items-center`
                                      }
                                    >
                                      <div
                                        className={
                                          "text-sm font-semibold w-4/12"
                                        }
                                      >
                                        Expected Checkout
                                      </div>
                                      <div
                                        className={
                                          `w-1/2 bg-[#eee] p-1.5 text-sm cursor-not-allowed`
                                        }
                                      >
                                        {endDate}
                                        <input type="text" disabled />
                                      </div>
                                    </div>
                                    <div
                                      className={`${sheetviewBg} justify-between items-center`}
                                    >
                                      <div
                                        className={
                                          "text-sm font-semibold w-4/12"
                                        }
                                      >
                                        Checkout Time
                                      </div>
                                      <div
                                        className={
                                          "w-1/2 bg-[#eee] p-1.5 cursor-not-allowed"
                                        }
                                      >
                                        <input type="text" disabled />
                                      </div>
                                    </div>
                                  
                                  </div>
                                </div>

                                <div className="actions px-2 h-8 rounded-sm flex items-center transition-all ease-in-out bg-[#e05d6f] hover:bg-[#c83548] text-white absolute right-3 bottom-4">
                                  <button
                                    className="close timeSheetClose font-bold outline-none"
                                    onClick={close}
                                  >
                                    &times;
                                  </button>
                                  <button
                                    className="button pl-1"
                                    onClick={() => {
                                      close();
                                    }}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            )}
                          </Popup>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSheet;
