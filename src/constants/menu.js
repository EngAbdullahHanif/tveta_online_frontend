import { adminRoot } from './defaultValues';
import { userRole } from './defaultValues';

const menuItems = [
  {
    id: 'students',
    icon: 'FA.FaUserGraduate',
    label: 'menu.students',
    to: `${adminRoot}/students`,
    roles: [
      userRole.admin,
      userRole.instituteDataentry,
      userRole.instituteManager,
      userRole.provinceDataentry,
      userRole.provinceSupervisor,
      userRole.authoritySupervisor,
      userRole.authorityDataentry,
      userRole.authenticated,
    ],
    subs: [
      {
        icon: 'FA.FaList',
        label: 'menu.student_list',
        to: `${adminRoot}/students/students`,
        roles: [
          userRole.admin,
          userRole.instituteManager,
          userRole.provinceSupervisor,
          userRole.authoritySupervisor,
          userRole.dataentry,
        ],
      },
      {
        icon: 'GR.GrUserAdd',
        label: 'forms.studentRegisterTitle',
        to: `${adminRoot}/students/register`,
        roles: [
          userRole.admin,
          userRole.institute,
          userRole.superUser,
          userRole.instituteDataentry,
          userRole.provinceDataentry,
          userRole.provinceSupervisor,
          userRole.dataentry,
        ],
      },
      {
        icon: 'FA.FaList',
        label: 'menu.kankor-student-list',
        to: `${adminRoot}/students/kankor-students`,
        newWindow: false,
        roles: [
          userRole.admin,
          userRole.instituteManager,
          userRole.provinceSupervisor,
          userRole.authoritySupervisor,
        ],
      },
      {
        icon: 'FA.FaList',
        label: 'attendance-list',
        to: `${adminRoot}/students/attendance-list`,
        roles: [
          userRole.admin,
          userRole.instituteManager,
          userRole.provinceSupervisor,
          userRole.authoritySupervisor,
        ],
      },
      {
        icon: 'FA.FaList',
        label: 'transfered-Students',
        to: `${adminRoot}/students/transfered-list`,
        roles: [
          userRole.admin,
          userRole.instituteManager,
          userRole.provinceSupervisor,
          userRole.authoritySupervisor,
          userRole.tester,
        ],
        // roles: [userRole.admin],
      },
      {
        icon: 'FA.FaList',
        label: 'studendts.dismisseds-students',
        to: `${adminRoot}/students/dismissed-list`,
        roles: [
          userRole.admin,
          userRole.instituteManager,
          userRole.provinceSupervisor,
          userRole.authoritySupervisor,
          userRole.tester,
        ],
        // roles: [userRole.admin],
      },
      {
        icon: 'FA.FaList',
        label: 'menu.attendance',
        to: `${adminRoot}/students/attendance`,
        roles: [
          userRole.admin,
          userRole.instituteManager,
          userRole.provinceSupervisor,
          userRole.authoritySupervisor,
          userRole.tester,
        ],
        newWindow: false,
      },
      {
        icon: 'FA.FaList',
        label: 'menu.marks-display',
        to: `${adminRoot}/students/marks-display`,
        roles: [
          userRole.admin,
          userRole.instituteManager,
          userRole.provinceSupervisor,
          userRole.authoritySupervisor,
          userRole.tester,
        ],
        newWindow: false,
      },
      {
        icon: 'FA.FaList',
        label: 'menu.class-marks',
        to: `${adminRoot}/students/class-marks`,
        newWindow: false,
        roles: [
          userRole.admin,
          userRole.instituteManager,
          userRole.provinceSupervisor,
          userRole.authoritySupervisor,
          userRole.tester,
        ],
      },
      //Changes started
      {
        icon: 'FA.FaList',
        label: 'د مضمون نمری اپدیت',
        to: `${adminRoot}/students/single-subject`,
        roles: [
          userRole.admin,
          userRole.instituteDataentry,
          userRole.provinceDataentry,
          userRole.authorityDataentry,
          userRole.tester,
        ],
        newWindow: false,
      },
      {
        icon: 'FA.FaList',
        label: 'د حاضری اپدیت',
        to: `${adminRoot}/students/single-student-attendance`,
        roles: [
          userRole.admin,
          userRole.instituteDataentry,
          userRole.provinceDataentry,
          userRole.authorityDataentry,
          userRole.tester,
        ],
        newWindow: false,
      },
      // {
      //   icon: 'MD.MdAddBox',
      //   label: 'ده شاګرد تبدیلی صنف',
      //   to: `${adminRoot}/students/class-transfer`,
      //   roles: [
      //     userRole.admin,
      //     userRole.instituteDataentry,
      //     userRole.provinceDataentry,
      //     userRole.authorityDataentry,
      //   ],
      //   newWindow: false,
      // },
      //Changes ended

      {
        icon: 'GR.GrUserAdd',
        label: 'menu.student_register_kankor',
        to: `${adminRoot}/students/register-kankor`,
        roles: [
          userRole.admin,
          userRole.instituteDataentry,
          userRole.instituteManager,
          userRole.provinceDataentry,
          userRole.authorityDataentry,
        ],
      },
      {
        icon: 'MD.MdAddBox',
        label: 'menu.student-marks-register',
        to: `${adminRoot}/students/marks-register`,
        roles: [
          userRole.admin,
          userRole.instituteDataentry,
          userRole.provinceDataentry,
          userRole.tester,
        ],
      },
      {
        icon: 'MD.MdAddBox',
        label: 'menu.second-chance-marks-register',
        to: `${adminRoot}/students/second-chance`,
        roles: [
          userRole.admin,
          userRole.instituteDataentry,
          userRole.provinceDataentry,
          userRole.tester,
        ],
      },
      {
        icon: 'MD.MdAddBox',
        label: 'menu.attendance-registration',
        to: `${adminRoot}/students/attendance-register`,
        roles: [
          userRole.admin,
          userRole.instituteDataentry,
          userRole.provinceDataentry,
          userRole.tester,
        ],
      },
      // {
      //   icon: 'IM.ImProfile',
      //   label: 'menu.student-profile',
      //   to: `${adminRoot}/students/student-profile`,
      // },

      {
        icon: 'MD.MdAddBox',
        label: 'menu.student-transfer',
        to: `${adminRoot}/students/student-transfer`,
        roles: [
          userRole.admin,
          userRole.instituteDataentry,
          userRole.provinceDataentry,
          userRole.tester,
        ],
        newWindow: false,
      },

      {
        icon: 'MD.MdAddBox',
        label: 'student.dismissal',
        to: `${adminRoot}/students/student-dismissal`,
        roles: [
          userRole.admin,
          userRole.instituteDataentry,
          userRole.provinceDataentry,
          userRole.tester,
        ],
        newWindow: false,
      },
      {
        icon: 'MD.MdAddBox',
        // label: 'menu.student.upgrade-class',
        label: 'class marks completion confirmation',
        to: `${adminRoot}/students/students-class-status-upgrade`,
        roles: [
          userRole.admin,
          userRole.instituteDataentry,
          userRole.provinceDataentry,
          userRole.tester,
        ],
        newWindow: false,
      },
      {
        icon: 'MD.MdOutlineTransferWithinAStation',
        label: 'student.assignment-to-class',
        to: `${adminRoot}/students/marks-status-cheked-students`,
        newWindow: false,
        roles: [userRole.tester],
      },
      {
        icon: 'MD.MdOutlineTransferWithinAStation',
        label: 'student.subject-marks-verification',
        to: `${adminRoot}/students/subject-marks-verification`,
        roles: [userRole.tester],
        newWindow: false,
      },
      {
        icon: 'MD.MdOutlineTransferWithinAStation',
        label: 'student.rejected-marks-update',
        to: `${adminRoot}/students/rejected-marks-updates`,
        roles: [userRole.tester],
        newWindow: false,
      },

      {
        icon: 'MD.MdOutlineTransferWithinAStation',
        label: 'department-change',
        to: `${adminRoot}/students/department-change`,
        roles: [
          userRole.admin,
          userRole.instituteDataentry,
          userRole.provinceDataentry,
          userRole.tester,
        ],
        newWindow: false,
      },

      {
        icon: 'MD.MdOutlineTransferWithinAStation',
        label: 'section-change',
        to: `${adminRoot}/students/section-change`,
        roles: [
          userRole.admin,
          userRole.instituteDataentry,
          userRole.provinceDataentry,
          userRole.tester,
        ],
        newWindow: false,
      },
      // {
      //   icon: 'MD.MdAddBox',
      //   label: 'menu.student-reregister',
      //   to: `${adminRoot}/students/reregister`,
      //   newWindow: false,
      // },
    ],
  },

  {
    id: 'ُteacher',
    icon: 'FA.FaChalkboardTeacher',
    label: 'menu.teacher',
    to: `${adminRoot}/teacher`,
    roles: [
      userRole.admin,
      userRole.instituteManager,
      userRole.instituteDataentry,
      userRole.provinceDataentry,
      // userRole.instituteDataentry,
      // userRole.provinceDataentry,
      userRole.tester,
    ],

    subs: [
      {
        icon: 'CG.CgUserList',
        label: 'menu.teacher_list',
        to: `${adminRoot}/teachers/teachers`,
      },
      {
        // icon: 'iconsminds-add-user',
        icon: 'GR.GrUserAdd',
        label: 'menu.teacher-registration',
        to: `${adminRoot}/teachers/register`,
      },
      // {
      //   icon: 'IM.ImProfile',
      //   label: 'menu.teacher-profile',
      //   to: `${adminRoot}/teachers/profile`,
      // },
      {
        icon: 'MD.MdOutlineTransferWithinAStation',
        label: 'menu.teacher-transfer',
        to: `${adminRoot}/teachers/teacher-transfer`,
        roles: ['tester'],
      },
    ],
  },

  {
    id: 'institute',
    icon: 'FA.FaUniversity',
    label: 'menu.institutes',
    to: `${adminRoot}/institutes`,
    roles: [
      userRole.admin,
      userRole.provinceDataentry,
      userRole.provinceSupervisor,
      userRole.authoritySupervisor,
      userRole.authorityDataentry,
    ],
    subs: [
      {
        icon: 'FA.FaList',
        label: 'menu.institute_list',
        to: `${adminRoot}/institutes/institutes`,
        roles: [
          userRole.admin,
          userRole.authoritySupervisor,
          userRole.authorityDataentry,
          userRole.provinceDataentry,
          userRole.provinceSupervisor,
        ],
      },
      // {
      //   icon: "FA.FaList",
      //   label: "menu.promotion-demotion-list",
      //   to: `${adminRoot}/institutes/promotion-demotion-list`,
      // },
      {
        icon: 'MD.MdAddBox',
        label: 'menu.institute_register',
        to: `${adminRoot}/institutes/register`,
        roles: [userRole.admin],
      },
      {
        icon: 'MD.MdAddBox',
        label: 'menu.institute_department_list',
        to: `${adminRoot}/institutes/institute-department/list`,
      },
      {
        icon: 'MD.MdAddBox',
        label: 'menu.institute_department_register',
        to: `${adminRoot}/institutes/institute-department/register`,
      },
      // {
      //   icon: "FA.FaLevelUpAlt",
      //   label: "menu.institute-upgrade",
      //   to: `${adminRoot}/institutes/institute-upgrade`,
      // },

      // {
      //   icon: 'BI.BiMessageAltDetail',
      //   label: 'menu.Institute-details',
      //   to: `${adminRoot}/institutes/institute-details`,
      // },
    ],
  },
  {
    id: 'dorms',
    icon: 'FA.FaHotel',
    label: 'menu.dorms',
    to: `${adminRoot}/dorms`,
    roles: [
      userRole.admin,
      userRole.dormManager,
      userRole.provinceSupervisor,
      userRole.provinceDataentry,
      userRole.authoritySupervisor,
      userRole.authorityDataentry,
    ],
    subs: [
      {
        icon: 'FA.FaList',
        label: 'dorm.list',
        to: `${adminRoot}/dorms/dorms`,
        roles: [
          userRole.admin,
          userRole.provinceSupervisor,
          userRole.authoritySupervisor,
        ],
      },
      {
        icon: 'CG.CgUserList',
        label: 'menu.dorm-students',
        to: `${adminRoot}/dorms/students`,
      },
      {
        icon: 'MD.MdAddBox',
        label: 'dorm.register',
        to: `${adminRoot}/dorms/register`,
        roles: [userRole.admin, userRole.authorityDataentry],
      },
      {
        icon: 'GR.GrUserAdd',
        label: 'menu.student-register-in-dorm',
        to: `${adminRoot}/dorms/student-register`,
        roles: [userRole.admin, userRole.dormManager],
      },

      // {
      //   icon: 'BI.BiMessageAltDetail',
      //   label: 'menu.dorm-details',
      //   to: `${adminRoot}/dorms/details`,
      // },
      {
        icon: 'IO.IoPersonRemoveSharp',
        label: 'menu.dorm-student-dismissal',
        to: `${adminRoot}/dorms/student-dismissal`,
        roles: [userRole.admin, userRole.dormManager],
      },
    ],
  },
  {
    id: 'subjects',
    icon: 'IO.IoBook',
    label: 'menu.subjects',
    to: `${adminRoot}/subjects`,
    roles: [userRole.admin, userRole.dataentry, userRole.supervisor],
    subs: [
      {
        icon: 'FA.FaList',
        label: 'menu.subject-list',
        to: `${adminRoot}/subjects/subject-list`,
      },
      {
        icon: 'FA.FaList',
        label: 'menu.curriculum-list',
        to: `${adminRoot}/subjects/curriculum-list`,
      },
      {
        icon: 'MD.MdAddBox',
        label: 'subject.register',
        to: `${adminRoot}/subjects/register`,
      },

      {
        icon: 'MD.MdAddBox',
        label: 'subject.curriculum',
        to: `${adminRoot}/subjects/curriculum`,
      },
    ],
  },
  {
    id: 'classess',
    icon: 'SI.SiGoogleclassroom',
    label: 'menu.classes',
    to: `${adminRoot}/classes`,
    roles: [userRole.admin, userRole.dataentry, userRole.supervisor],
    subs: [
      {
        icon: 'FA.FaList',
        label: 'class.list',
        to: `${adminRoot}/classes/classes`,
      },
      {
        icon: 'MD.MdAddBox',
        label: 'class.register',
        to: `${adminRoot}/classes/register`,
      },
    ],
  },

  {
    id: 'fields',
    icon: 'MD.MdOutlineNoteAlt',
    label: 'menu.field',
    to: `${adminRoot}/fields`,
    roles: [
      userRole.admin,
      userRole.authorityDataentry,
      userRole.authoritySupervisor,
    ],
    subs: [
      {
        icon: 'FA.FaList',
        label: 'menu.sector-list',
        to: `${adminRoot}/fields/sector-list`,
      },
      {
        icon: 'MD.MdAddBox',
        label: 'sector.sectorRegisterlabel',
        to: `${adminRoot}/fields/new-sector`,
      },
      {
        icon: 'FA.FaList',
        label: 'menu.field-list',
        to: `${adminRoot}/fields/field-list`,
      },
      {
        icon: 'MD.MdAddBox',
        label: 'menu.field-register',
        to: `${adminRoot}/fields/register`,
      },
    ],
  },

  {
    id: 'evaluations',
    icon: 'BS.BsCardChecklist',
    label: 'menu.evaluation',
    to: `${adminRoot}/evaluations`,
    roles: [
      userRole.admin,
      // userRole.instituteDataentry,
      // userRole.provinceDataentry,
      userRole.tester,
    ],
    subs: [
      {
        icon: 'FA.FaList',
        label: 'evaluation.list',
        to: `${adminRoot}/evaluations/evaluations`,
      },
      {
        icon: 'MD.MdAddBox',
        label: 'menu.teacher-evaluation',
        to: `${adminRoot}/evaluations/teacher-evalaution`,
      },
      {
        icon: 'MD.MdAddBox',
        label: 'menu.teacher-promotion-demotion',
        to: `${adminRoot}/evaluations/promotion-demotion`,
      },
      {
        icon: 'BI.BiMessageAltDetail',
        label: 'جزیات ارزیابی',
        to: `${adminRoot}/evaluations/evaluation-details`,
      },
    ],
  },

  {
    id: 'hr-evaluations',
    icon: 'MD.MdManageAccounts',
    label: 'menu.hr-evaluation',
    to: `${adminRoot}/hr-evaluations`,
    roles: [
      userRole.admin,
      // userRole.instituteDataentry,
      // userRole.provinceDataentry,
      userRole.tester,
    ],
    subs: [
      {
        icon: 'FA.FaList',
        label: 'evaluation.list',
        to: `${adminRoot}/hr-evaluations/hr-evaluations`,
      },
      {
        icon: 'MD.MdAddBox',
        label: 'menu.teacher-HR-evaluation',
        to: `${adminRoot}/hr-evaluations/teacher-hr-evaluation`,
      },
    ],
  },

  {
    id: 'groups',
    icon: 'MD.MdManageAccounts',
    label: 'menu.group-label',
    to: `${adminRoot}/groups`,
    roles: [userRole.admin, userRole.tester],
    subs: [
      // {
      //   icon: 'FA.FaList',
      //   label: 'evaluation.list',
      //   to: `${adminRoot}/hr-evaluations/hr-evaluations`,
      // },
      {
        icon: 'MD.MdAddBox',
        label: 'menu.group-register',
        to: `${adminRoot}/groups/register`,
      },
      {
        icon: 'MD.MdAddBox',
        label: 'menu.group-premissions',
        to: `${adminRoot}/groups/premissions`,
      },
    ],
  },
  {
    id: 'workers',
    icon: 'FA.FaUsers',
    // label: 'menu.students',
    label: 'menu.workers',
    to: `${adminRoot}/workers`,
    roles: [
      userRole.admin,
      // userRole.instituteDataentry,
      // userRole.provinceDataentry,
      userRole.tester,
    ],

    subs: [
      {
        icon: 'CG.CgUserList',
        label: 'menu.workers-list',
        to: `${adminRoot}/workers/worker-list`,
        newWindow: false,
      },
      {
        icon: 'GR.GrUserAdd',
        label: 'menu.worker-register',
        to: `${adminRoot}/workers/worker`,
        newWindow: false,
      },

      {
        icon: 'IM.ImProfile',
        label: 'menu.workers-profile',
        to: `${adminRoot}/workers/workerId`,
        newWindow: false,
      },
    ],
  },
  {
    id: 'users',
    icon: 'BS.BsCardChecklist',
    label: 'Users',
    to: `${adminRoot}/users`,
    roles: [userRole.admin, userRole.tester],

    subs: [
      {
        icon: 'FA.FaList',
        label: 'Users List',
        to: `${adminRoot}/users/users_list`,
        // roles: [userRole.admin],
      },
    ],
  },
  // {
  //   id: 'docs',
  //   icon: 'iconsminds-library',
  //   label: 'menu.docs',
  //   to: 'https://gogo-react-docs.coloredstrategies.com/',
  //   newWindow: true,
  // },
];
export default menuItems;
