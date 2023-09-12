import { useDispatch, useSelector } from 'react-redux';

import Calendar from './Calendar';
import { getCurrentUser } from '../../../api/user';
import { selectCurrentUser } from '../../../states/reducers/slices/backend/UserSlice';
import { useEffect } from 'react';

function Roaster() {

  // Sample roster data with start and end times for each day of the week

  const dispatcher = useDispatch()
  useEffect(() => {
    getCurrentUser(dispatcher)
  });
  const user = useSelector(selectCurrentUser)

  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const rosterData = user.roster.employeeRosterDetails.map((item, index) => {
    const { day, workingHours } = item;
    const dayOfWeek = weekdays[day];
    const [startTime, , endTime] = workingHours.split(' ');
  
    const hour = parseInt(startTime.split(':')[0], 10);
    const amPm = (hour < 12) ? 'am' : 'pm';
    const formattedStartTime = `${startTime+0} ${amPm}`;
    const formattedEndTime = `${endTime+0} ${amPm}`;
  
    return {
      id: index + 1,
      day: dayOfWeek,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
    };
  });

  return (
    <div className="flex items-center justify-center">
      <div className="w-full rounded-lg p-6">
        <h1 className="text-2xl font-semibold mb-6">My Roster</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 overflow-x-scroll">
          <div className="flex">
            {rosterData.map(item => (
              <div className="bg-gradient-to-r from-black to-gray-700 rounded-lg shadow-md mr-4" key={item.day}>
                <div className="items-center justify-center font-semibold px-4 py-3 rounded-t-lg">
                  <h1 className="text-white">{item.day}</h1>
                </div>
                <div className="p-4">
                  <div className="text-white font-semibold mb-2 whitespace-nowrap">Start Time</div>
                  <div className="bg-gray-400 px-2 py-1 rounded-lg whitespace-nowrap mb-2">{item.startTime}</div>
                  <div className="text-white font-semibold mb-2">End Time</div>
                  <div className="bg-gray-400 px-2 py-1 whitespace-nowrap rounded-lg">{item.endTime}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="container mt-16 tablet:mt-6">
          <Calendar></Calendar>
        </div>
      </div>
    </div>
  );
}

export default Roaster;

