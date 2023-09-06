// Time sheet tables
export const timeSheetTable = [
  {
    title: "Workable Shifts",
    value: 4,
    borderLeft: `border-green-600`,
  },
  {
    title: "Workable Hours",
    value: "24h",
    borderLeft: `border-green-600`,
  },
  {
    title: "Worked Hours",
    value: "17h 58m",
    borderLeft: `border-green-600`,
  },
  {
    title: "Short Hours",
    value: "6h 2m",
    borderLeft: `border-[#ffc100]`,
  },
  {
    title: "Present",
    value: 4,
    borderLeft: `border-green-600`,
  },
  {
    title: "Missing Punches",
    value: 0,
    borderLeft: `border-[#d9534f]`,
  },
  {
    title: "Absent",
    value: 0,
    borderLeft: `border-[#d9534f]`,
  },
  {
    title: "Short Duration",
    value: 0,
    borderLeft: `border-[#ffc100]`,
  },
  {
    title: "Late Arrival",
    value: 1,
    borderLeft: `border-[#f0b500]`,
  },
  {
    title: "Early Left",
    value: 0,
    borderLeft: `border-[#f0b500]`,
  },
  {
    title: "Day Off",
    value: 0,
    borderLeft: `border-[#5bc0de]`,
  },
  {
    title: "Rest Day",
    value: 0,
    borderLeft: `border-[#5368a2]`,
  },
  {
    title: "Relaxation",
    value: 0,
    borderLeft: `border-[#FF5722]`,
  },
  {
    title: "Leave",
    value: 0,
    borderLeft: `border-[#107863]`,
  },
  {
    title: "Work From Home",
    value: 0,
    borderLeft: `border-[#1045d8af]`,
  },
];

// Working hours table
export const workingTable = [
    {
        title: `Date`
    },
    {
        title: `Checked In`
    },
    {
        title: `Checkin Status`
    },
    {
        title: `Checked Out`
    },
    {
        title: `Checkout Status`
    },
    {
        title: `Expected Hours`
    },
    {
        title: `Worked Hours`
    },
    {
        title: `Approved Overtime`
    },
    {
        title: `Shift Worked Hours`
    },
    {
        title: `Actions`
    }
]

// Classes 
export const timeSheet = `flex justify-between items-center shadow-md bg-white py-1.5 px-4 border-l-4`;
export const sheetTh = `p-3 text-sm`;
export const shhetTd = `px-3 py-2 text-xs`;
export const sheetviewBg = `bg-[#f9f9f9] px-4 py-1.5 flex`;
export const sheetviewTitle = `text-sm font-semibold w-1/2 md:w-4/12`;
