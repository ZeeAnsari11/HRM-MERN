// import React from 'react';
// // import Calendar from 'react-calendar';
// // import 'react-calendar/dist/Calendar.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { getCurrentUser } from '../../api/user';
// import { useEffect } from 'react';
// import { selectCurrentUser } from '../../states/reducers/slices/backend/UserSlice';



// function Roaster() {
//   // Sample roster data with start and end times for each day of the week

//   const dispatcher = useDispatch()
//   useEffect(() => {
//     getCurrentUser(dispatcher)
//   }, []);
//   const user = useSelector(selectCurrentUser)
  
//   const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

//   const rosterData = user.roster.employeeRosterDetails.map((item, index) => {
//     const { day, workingHours } = item;
//     const dayOfWeek = weekdays[day];
//     const [startTime, , endTime] = workingHours.split(' ');

//     return {
//       id: index + 1,
//       day: dayOfWeek,
//       startTime,
//       endTime,
//     };
//   });

//   // Custom tile content function to display start and end times in calendar cells
//   const tileContent = ({ date, view }) => {
//     if (view === 'month') {
//       const day = date.toLocaleDateString('en-US', { weekday: 'long' });
//       const rosterItem = rosterData.find(item => item.day === day);
//       return (
//         <div className="text-center text-xs">
//           <div>{day}</div>
//           {rosterItem && (
//             <>
//               <div className="font-semibold text-blue-500">{rosterItem.startTime}</div>
//               <div className="text-gray-600">{rosterItem.endTime}</div>
//             </>
//           )}
//         </div>
//       );
//     }
//   };

//   return (
//     <div className="bg-gray-200 flex items-center justify-center">
//       <div className="w-11/12 max-w-4xl mx-auto rounded-lg shadow-lg p-6">
//         <h1 className="text-2xl font-semibold mb-6">My Roster</h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 overflow-x-scroll">
//           <div className="flex">
//             {rosterData.map(item => (
//               <div className="bg-white rounded-lg shadow-md mr-4" key={item.day}>
//                 <div className="bg-blue-500 text-white flex items-center justify-center font-semibold px-4 py-3 rounded-t-lg">{item.day}</div>
//                 <div className="p-4">
//                   <div className="font-semibold mb-2 whitespace-nowrap">Start Time</div>
//                   <div className="bg-blue-500 text-white px-2 py-1 rounded-lg mb-2">{item.startTime}</div>
//                   <div className="font-semibold mb-2">End Time</div>
//                   <div className="bg-gray-400 px-2 py-1 rounded-lg">{item.endTime}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="container">
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Roaster;
