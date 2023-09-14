import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import React, { useState } from "react";
import { generateDate, months } from "./util/calendar";

import cn from "./util/cn";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../states/reducers/slices/backend/UserSlice";

export default function Calendar() {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);

  const user = useSelector(selectCurrentUser);

  const convertToAMPM = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const minute = parseInt(minutes, 10);
    const meridiem = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    const formattedMinute = minute.toString().padStart(2, '0');

    return `${formattedHour}:${formattedMinute} ${meridiem}`;
  };


  const rosterData = user.roster.employeeRosterDetails.map((item, index) => {
    const {  workingHours } = item;
    const [startTime, endTime] = workingHours.split(" - ");
	
    return {
      id: index + 1,
      startTime: convertToAMPM(startTime),
      endTime: convertToAMPM(endTime),
    };
  });

  
  return (
    <div className="flex gap-10 sm:divide-x justify-center sm:w-3/4 mx-auto items-center sm:flex-row flex-col">
	  <div className="w-full h-30 p-4 rounded-lg shadow-2xl drop-shadow">
        <div className="flex justify-between items-center">
          <h1 className="select-none font-semibold">
            {months[today.month()]}, {today.year()}
          </h1>
          <div className="flex gap-10 items-center ">
            <GrFormPrevious
              className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
              onClick={() => {
                setToday(today.month(today.month() - 1));
              }}
            />
            <h1
              className=" cursor-pointer hover:scale-105 transition-all"
              onClick={() => {
                setToday(currentDate);
              }}
            >
              Today
            </h1>
            <GrFormNext
              className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
              onClick={() => {
                setToday(today.month(today.month() + 1));
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-7 ">
          {days.map((day, index) => {
            return (
              <h1
                key={index}
                className="text-sm text-center h-14 w-14 grid place-content-center text-gray-500 select-none"
              >
                {day}
              </h1>
            );
          })}
        </div>

        <div className=" grid grid-cols-7 ">
          {generateDate(today.month(), today.year()).map(
            ({ date, currentMonth, today }, index) => {
              return (
                <div
                  key={index}
                  className="p-2 text-center h-14 grid place-content-center text-sm border-t"
                >
                  <h1
                    className={cn(
                      currentMonth ? "" : "text-gray-400",
                      today ? "bg-red-600 text-white" : "",
                      selectDate.toDate().toDateString() ===
                        date.toDate().toDateString()
                        ? "bg-black text-white"
                        : "",
                      "h-10 w-10 rounded-full grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none"
                    )}
                    onClick={() => {
                      setSelectDate(date);
                    }}
                  >
                    {date.date()}
                  </h1>
                </div>
              );
            }
          )}
        </div>
      </div>
      <div className="h-96 w-96 sm:px-5">
        <h1 className=" font-semibold">
            <div className="bg-gradient-to-r from-black to-gray-700 rounded-lg shadow-md mr-4">
              <div className="text-white font-semibold mb-2 w-64 px-4 pt-3">
                Schedule for {selectDate.toDate().toDateString()}
              </div>
              <div className="p-4">
                <div className="text-white font-semibold mb-2 whitespace-nowrap">
                  Start Time
                </div>
                <div className="bg-gray-400 px-2 py-1 rounded-lg whitespace-nowrap mb-2">
                  {rosterData[0].startTime}
                </div>
                <div className="text-white font-semibold mb-2">End Time</div>
                <div className="bg-gray-400 px-2 py-1 whitespace-nowrap rounded-lg">
                  {rosterData[0].endTime}
                </div>
              </div>
            </div>
        </h1>
        <p className="text-gray-400 mt-4">No meetings for today.</p>
      </div>
    </div>
  );
}
