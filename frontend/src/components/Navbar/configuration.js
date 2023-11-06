import { faArrowCircleLeft, faArrowCircleRight, faArrowDown, faCalendarCheck, faCalendarDay, faCalendarPlus, faCalendarTimes, faCalendarWeek, faCediSign, faChartArea, faCircleDollarToSlot, faCodePullRequest, faCoffee, faDollarSign, faFileAlt, faGear, faHome, faLaptop, faNetworkWired, faTimeline, faUser, faUserCircle, faUserClock, faUsers } from '@fortawesome/free-solid-svg-icons'

export const Menus = [
    { title: "Dashboard", font:faHome, gap: true, child:[], to: "/dashboard/home"},
    {
        title: "Self Services",
        font: faUser,
        access: "Non-Admin",
        child: [
            { title: "Probation",    font:faUserClock, to:"/dashboard/probation" },
            { title: "Roaster",    font:faCalendarPlus, to:"/dashboard/roaster"},
            { title: "Chart",    font:faChartArea, to:"/dashboard/chart" },
            { title: "Full-Chart", access:"Admin", font:faChartArea, to:"/dashboard/org-chart" },
            { title: "Loan & Advance",    font:faCircleDollarToSlot, to:"/dashboard/loan" },
            { title: "Admin Loan Requests", access:"Admin", font:faCircleDollarToSlot, to:"/dashboard/all-loans" },
            { title: "Applied Loan Requests", access:"Admin", font:faCircleDollarToSlot, to:"/dashboard/applied-loans" },


        ] 
    },
    {
        title: "Assets", 
        access:"Admin", 
        font: faCalendarDay, 
        child: [ 
            { title: "Add Asset", font: faCodePullRequest, to:"/dashboard/add-asset" },
            { title: "Manage Assets", font: faCalendarCheck, to:"/dashboard/manage-assets"},
            { title: "Asset Type", font: faCodePullRequest, to:"/dashboard/asset-type" },
        ]
    },
    { title: "Desiginations",access:"Admin", font: faCalendarCheck, child:[], to:"/dashboard/desiginations"  },
    { title: "Loan Type", access:"Admin",font: faCalendarCheck, child:[], to:"/dashboard/loan-type"  },
    { title: "Departments", access:"Admin",font: faCalendarCheck, child:[], to:"/dashboard/departments"  },
    { title: "Branches", access:"Admin",font: faCalendarCheck, child:[], to:"/dashboard/branches"  },
    { title: "TimeSlots", access:"Admin",font: faCalendarCheck, child:[], to:"/dashboard/timeSlots"  },
    { title: "Employment Type",access:"Admin", font: faCalendarCheck, child:[], to:"/dashboard/employeement-type"  },

    {
        title: "Employee", 
        access:"Admin",
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
            { access:"Admin", title: "Requests", font: faCalendarTimes, to:"/dashboard/all/leave-request" },
            { title: "Request Leave", font: faCodePullRequest, to:"/dashboard/leaverequest" },
            { title: "View Leaves", font: faCalendarCheck, to:"/dashboard/leaves"},
            { title: "Policy", font: faTimeline, to:"/dashboard/policy" },
            { title: "Leave Types", access:"Admin", font: faTimeline, to:"/dashboard/leave-type" },
            { title: "Short Leave Types", access:"Admin", font: faTimeline, to:"/dashboard/short-leave-type" },
        ]
    },
    {
        title: "Work From Home", 
        font: faCalendarWeek,
           
        child: [
            { access:"Admin", title: "Requests", font: faCalendarTimes, to:"/dashboard/all/wfh-request" },
            // { access:"Admin", title: "Requests", font: faCalendarTimes, to:"/dashboard/wfh" },
            { title: "Request", font: faCalendarTimes, to:"/dashboard/wfh" },
            { title: "View WFH Requests", font: faFileAlt, to:"/dashboard/view-wfh" },
        ]
    },
    {
        title: "Attendence", 
        font: faCalendarWeek,
        child: [
            { access:"Admin", title: "Requests", font: faCalendarTimes, to:"/dashboard/all/missing-punches" },
            { title: "Time Sheet", font: faCalendarTimes, to:"/dashboard/timesheet" },
            { title: "Attendence Request ", font: faFileAlt, to:"/dashboard/attendence-request" },
            { title: "View Attendece", font: faCalendarCheck, to:"/dashboard/attendence"},
        ]
    },
    { title: "Approvals", access:"Admin",font: faLaptop, child:[], to:"/dashboard/approvals"  },
    { title: "Tax Rules", access:"Admin", font: faCircleDollarToSlot, child:[], to:"/dashboard/tax-rules"  },
    { title: "Payslips", access:"Admin", font: faCircleDollarToSlot, 
        child:[
            { title: "Generate Payslips", access:"Admin", font: faDollarSign, child:[], to:"/dashboard/generate-payslips"  },
            { title: "Organization's Payslips", access:"Admin", font: faDollarSign, child:[], to:"/dashboard/payslips/org"  },
            { title: "View Payslips", access:"Admin", font: faDollarSign, child:[], to:"/dashboard/payslips"  }
        ] 
    },

    { title: "Allowances",access:"Admin", font: faCalendarCheck, child:[], to:"/dashboard/allowances"  },
    { title: "Profile ", font: faUserCircle, gap: true, child:[], to:"/dashboard/profile"},
    { title: "Grades", access:"Admin", font: faCircleDollarToSlot, child:[], to:"/dashboard/grades"  },
    { title: "Grades Benefits", access:"Admin", font: faCircleDollarToSlot, child:[], to:"/dashboard/grade-benefits"  },

    { title: "Request Flow",access:"Admin", font: faArrowDown,
        child:[
            { title: "Create Request Flow",access:"Admin", font: faArrowCircleRight,child:[], to:"/dashboard/request-flow"  },

            { title: "Request Types",access:"Admin", font: faArrowCircleLeft,child:[], to:"/dashboard/request-type"  },
            { title: "Flow Nodes",access:"Admin", font: faArrowCircleLeft,child:[], to:"/dashboard/flow-node"  }

        ],
    },
    { title: "Settings", font: faGear, child:[], to:"/dashboard/settings" },
];
