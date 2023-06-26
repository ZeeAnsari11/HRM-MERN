import { faHome, faUser, faGear, faTimeline, faChartArea, faCircleDollarToSlot, faCalendarDays, faCalendarDay, faCodePullRequest, faCalendarPlus, faCalendarWeek, faCalendarTimes, faFileAlt, faCalendarCheck, faUserClock, faNetworkWired, faUserCircle, faUsers } from '@fortawesome/free-solid-svg-icons'

export const Menus = [
    { title: "Dashboard", font:faHome, gap: true, child:[], to: "/dashboard/home"},
    {
        title: "Self Services",
        font: faUser,
        child: [
            { title: "Probation", font:faUserClock, to:"/dashboard/probation" },
            { title: "Roaster", font:faCalendarPlus, to:"/dashboard/roaster"},
            { title: "Chart", font:faChartArea, to:"/dashboard/chart" },
            { title: "Loan & Advance", font:faCircleDollarToSlot, to:"/dashboard/loan" },
        ] 
    },
    {
        title: "Assets",
        access:"admin",
        font: faCalendarDay,
        child: [
            { title: "Add Asset", font: faCodePullRequest, to:"/dashboard/add-asset" },
            { title: "Manage Assets", font: faCalendarCheck, to:"/dashboard/manage-assets"},
        ]
    },
    {
        title: "Employee", 
        access:"admin",
        font: faUsers,
        child: [
            { title: "Create Employee", font: faCalendarTimes, to:"/dashboard/employee" },
            { title: "View Employees", font: faFileAlt, to:"/dashboard/view-employees" },
        ]
    },
    {
        title: "Leave", 
        font: faCalendarWeek,
        child: [
            { access:"admin", title: "Requests", font: faCalendarTimes, to:"/dashboard/timesheet" },
            { title: "Request Leave", font: faCodePullRequest, to:"/dashboard/leaverequest" },
            { title: "View Leaves", font: faCalendarCheck, to:"/dashboard/leaves"},
            { title: "Policy", font: faTimeline, to:"/dashboard/policy" },
        ]
    },
    {
        title: "Work From Home", 
        font: faCalendarWeek,
        child: [
            { access:"admin", title: "Requests", font: faCalendarTimes, to:"/dashboard/timesheet" },
            { title: "Request", font: faCalendarTimes, to:"/dashboard/wfh" },
            { title: "View WFH Requests", font: faFileAlt, to:"/dashboard/*" },
        ]
    },
    {
        title: "Attendence", 
        font: faCalendarWeek,
        child: [
            { title: "Time Sheet", font: faCalendarTimes, to:"/dashboard/timesheet" },
            { title: "Attendence Request ", font: faFileAlt, to:"/dashboard/attendence-request" },
            { title: "View Attendece", font: faCalendarCheck, to:"/dashboard/attendence"},
        ]
    },

    { title: "Payslips", font: faCircleDollarToSlot, child:[], to:"/dashboard/payslips"  },
    { title: "Profile ", font: faUserCircle, gap: true, child:[], to:"/dashboard/profile"},
    { title: "Settings", font: faGear, child:[], to:"/dashboard/settings" },
];
