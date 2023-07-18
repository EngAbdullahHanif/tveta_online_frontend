import { adminRoot } from './defaultValues';

const data = [
  {
    id: 'users',
    icon: 'BS.BsCardChecklist',
    label: 'Users',
    to: `${adminRoot}/users`,
    // roles: [userRole.Admin, userRole.Editor],
    subs: [
      {
        icon: 'FA.FaList',
        label: 'Users List',
        to: `${adminRoot}/users/users_list`,
        // roles: [userRole.Admin],
      },
    ],
  },

  {
    id: 'students',
    icon: 'FA.FaUserGraduate',
    label: 'menu.students',
    to: `${adminRoot}/students`,
    // roles: [userRole.Admin, userRole.Editor],
    subs: [
      {
        icon: 'FA.FaList',
        label: 'menu.student_list',
        to: `${adminRoot}/students/students`,
        // roles: [userRole.Admin],
      },

      {
        icon: 'FA.FaList',
        label: 'menu.kankor-student-list',
        to: `${adminRoot}/students/kankor-students`,
        newWindow: false,
      },
      {
        icon: 'FA.FaList',
        label: 'attendance-list',
        to: `${adminRoot}/students/attendance-list`,
      },
      {
        icon: 'FA.FaList',
        label: 'transfered-Students',
        to: `${adminRoot}/students/transfered-list`,
        // roles: [userRole.Admin],
      },
      {
        icon: 'FA.FaList',
        label: 'studendts.dismisseds-students',
        to: `${adminRoot}/students/dismissed-list`,
        // roles: [userRole.Admin],
      },
      {
        icon: 'FA.FaList',
        label: 'menu.attendance',
        to: `${adminRoot}/students/attendance`,
        newWindow: false,
      },
      {
        icon: 'FA.FaList',
        label: 'menu.marks-display',
        to: `${adminRoot}/students/marks-display`,
        newWindow: false,
      },
      {
        icon: 'FA.FaList',
        label: 'menu.class-marks',
        to: `${adminRoot}/students/class-marks`,
        newWindow: false,
      },
      //Changes started
      {
        icon: 'FA.FaList',
        label: 'د مضمون نمری اپدیت',
        to: `${adminRoot}/students/single-subject`,
        newWindow: false,
      },
      {
        icon: 'FA.FaList',
        label: 'د حاضری اپدیت',
        to: `${adminRoot}/students/single-student-attendance`,
        newWindow: false,
      },
      {
        icon: 'MD.MdAddBox',
        label: 'ده شاګرد تبدیلی صنف',
        to: `${adminRoot}/students/class-transfer`,
        newWindow: false,
      },
      //Changes ended
      {
        icon: 'GR.GrUserAdd',
        label: 'forms.studentRegisterTitle',
        to: `${adminRoot}/students/register`,
        newWindow: false,
      },
      {
        icon: 'GR.GrUserAdd',
        label: 'menu.student_register_kankor',
        to: `${adminRoot}/students/register-kankor`,
        // roles: [userRole.Admin],
      },

      // {
      //   // icon: 'MD.MdOutlineTransferWithinAStation',
      //   label: 'Kankor Profille',
      //   to: `${adminRoot}/students/kankor-profile`,
      //   newWindow: false,
      // },
      {
        icon: 'MD.MdAddBox',
        label: 'menu.student-marks-register',
        to: `${adminRoot}/students/marks-register`,
      },
      {
        icon: 'MD.MdAddBox',
        label: 'menu.second-chance-marks-register',
        to: `${adminRoot}/students/second-chance`,
      },
      {
        icon: 'MD.MdAddBox',
        label: 'menu.attendance-registration',
        to: `${adminRoot}/students/attendance-register`,
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
        newWindow: false,
      },

      {
        icon: 'MD.MdAddBox',
        label: 'student.dismissal',
        to: `${adminRoot}/students/student-dismissal`,
        newWindow: false,
      },
      {
        icon: 'MD.MdAddBox',
        // label: 'menu.student.upgrade-class',
        label: 'class marks completion confirmation',
        to: `${adminRoot}/students/students-class-status-upgrade`,
        newWindow: false,
      },
      {
        icon: 'MD.MdOutlineTransferWithinAStation',
        label: 'student.assignment-to-class',
        to: `${adminRoot}/students/marks-status-cheked-students`,
        newWindow: false,
      },
      {
        icon: 'MD.MdOutlineTransferWithinAStation',
        label: 'student.subject-marks-verification',
        to: `${adminRoot}/students/subject-marks-verification`,
        newWindow: false,
      },
      {
        icon: 'MD.MdOutlineTransferWithinAStation',
        label: 'student.rejected-marks-update',
        to: `${adminRoot}/students/rejected-marks-updates`,
        newWindow: false,
      },

      {
        icon: 'MD.MdOutlineTransferWithinAStation',
        label: 'department-change',
        to: `${adminRoot}/students/department-change`,
        newWindow: false,
      },

      {
        icon: 'MD.MdOutlineTransferWithinAStation',
        label: 'section-change',
        to: `${adminRoot}/students/section-change`,
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
      },
    ],
  },

  {
    id: 'workers',
    icon: 'FA.FaUsers',
    // label: 'menu.students',
    label: 'menu.workers',
    to: `${adminRoot}/workers`,
    // roles: [userRole.Admin, userRole.Editor],
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
    id: 'institute',
    icon: 'FA.FaUniversity',
    label: 'menu.institutes',
    to: `${adminRoot}/institutes`,
    subs: [
      {
        icon: 'FA.FaList',
        label: 'menu.institute_list',
        to: `${adminRoot}/institutes/institutes`,
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
    subs: [
      {
        icon: 'FA.FaList',
        label: 'dorm.list',
        to: `${adminRoot}/dorms/dorms`,
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
      },
      {
        icon: 'GR.GrUserAdd',
        label: 'menu.student-register-in-dorm',
        to: `${adminRoot}/dorms/student-register`,
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
      },
    ],
  },
  {
    id: 'subjects',
    icon: 'IO.IoBook',
    label: 'menu.subjects',
    to: `${adminRoot}/subjects`,
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
    subs: [
      {
        icon: 'FA.FaList',
        label: 'menu.field-list',
        to: `${adminRoot}/fields/field-list`,
      },
      {
        icon: 'FA.FaList',
        label: 'menu.department-list',
        to: `${adminRoot}/fields/department-list`,
      },
      {
        icon: 'MD.MdAddBox',
        label: 'menu.field-register',
        to: `${adminRoot}/fields/register`,
      },

      {
        icon: 'MD.MdAddBox',
        label: 'menu.department-register',
        to: `${adminRoot}/fields/department-register`,
      },
    ],
  },

  {
    id: 'evaluations',
    icon: 'BS.BsCardChecklist',
    label: 'menu.evaluation',
    to: `${adminRoot}/evaluations`,
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
  // {
  //   id: 'docs',
  //   icon: 'iconsminds-library',
  //   label: 'menu.docs',
  //   to: 'https://gogo-react-docs.coloredstrategies.com/',
  //   newWindow: true,
  // },
];
export default data;
