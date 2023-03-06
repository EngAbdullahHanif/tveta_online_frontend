import { adminRoot } from './defaultValues';

const data = [
  {
    id: 'ُteacher',
    icon: 'FA.FaChalkboardTeacher',
    label: 'menu.teacher',
    to: `${adminRoot}/teacher`,
 
    subs: [
      {
        icon: 'CG.CgUserList',
        label: 'teacher list',
        to: `${adminRoot}/teachers/teachers`,
      },
      {
       // icon: 'iconsminds-add-user',
        icon: 'GR.GrUserAdd',
        label: 'menu.teacher-registration',
        to: `${adminRoot}/teachers/register`,
      },
  
      {
        icon: 'IM.ImProfile',
        label: 'menu.teacher-profile',
        to: `${adminRoot}/teachers/profile`,
      },
   
      {
        icon: 'MD.MdAddBox',
        label: 'menu.teacher-evaluation',
        to: `${adminRoot}/teachers/teacher-evalaution`,
      },
      {
        icon: 'MD.MdOutlineTransferWithinAStation',
        label: 'menu.teacher-transfer',
        to: `${adminRoot}/teachers/teacher-transfer`,
      },
    ],
  },
  {
    id: 'students',
    icon: 'FA.FaUserGraduate',
    label: 'menu.students',
    to: `${adminRoot}/students`,
    // roles: [UserRole.Admin, UserRole.Editor],
    subs: [
      {
        icon: 'GR.GrUserAdd',
        label: 'student-register',
        to: `${adminRoot}/students/register`,
        newWindow: false,
      },
      {
        icon: 'GR.GrUserAdd',
        label: 'menu.student_register_kankor',
        to: `${adminRoot}/students/register-kankor`,
        // roles: [UserRole.Admin],
      },
      {
        icon: 'CG.CgUserList',
        label: 'menu.student_list',
        to: `${adminRoot}/students/students`,
        // roles: [UserRole.Admin],
      },
      {
        icon: 'MD.MdAddBox',
        label: 'menu.student-marks-register',
        to: `${adminRoot}/students/marks-register`,
      },
      {
        icon: 'MD.MdAddBox',
        label: 'menu.attendance-registration',
        to: `${adminRoot}/students/attendance-register`,
      },
      {
        icon: 'IM.ImProfile',
        label: 'menu.student-profile',
        to: `${adminRoot}/students/student-profile`,
      },
      {
        icon: 'MD.MdOutlineTransferWithinAStation',
        label: 'menu.student-transfer',
        to: `${adminRoot}/students/student-transfer`,
        newWindow: false,
      },
      {
        icon: 'MD.MdAddBox',
        label: 'menu.marks-display',
        to: `${adminRoot}/students/marks-display`,
        newWindow: false,
      },
      {
        icon: 'MD.MdAddBox',
        label: 'menu.marks-display-all-subs',
        to: `${adminRoot}/students/marks-display-allsubs`,
        newWindow: false,
      },
      {
        icon: 'MD.MdAddBox',
        label: 'menu.attendance',
        to: `${adminRoot}/students/attendance`,
        newWindow: false,
      },
      {
        icon: 'CG.CgUserList',
        label: 'Kankor Student List',
        to: `${adminRoot}/students/kankor-students`,
        newWindow: false,
      },
    ],
  },
  {
    id: 'workers',
    icon: 'FA.FaUsers',
    // label: 'menu.students',
    label: 'workers',
    to: `${adminRoot}/workers`,
    // roles: [UserRole.Admin, UserRole.Editor],
    subs: [
      {
        icon: 'GR.GrUserAdd',
        label: 'worker register',
        to: `${adminRoot}/workers/worker`,
        newWindow: false,
      },
      {
        icon: 'CG.CgUserList',
        label: 'worker list',
        to: `${adminRoot}/workers/worker-list`,
        newWindow: false,
      },
      {
        icon: 'IM.ImProfile',
        label: 'worker Profile',
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
      {
        icon: 'MD.MdAddBox',
        label: 'menu.institute_register',
        to: `${adminRoot}/institutes/register`,
      },
      {
        icon: 'FA.FaLevelUpAlt',
        label: 'menu.institute-upgrade',
        to: `${adminRoot}/institutes/institute-upgrade`,
      },
      {
        icon: 'BI.BiMessageAltDetail',
        label: 'menu.Institute-details',
        to: `${adminRoot}/institutes/institute-details`,
      },
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
        icon: 'MD.MdAddBox',
        label: 'dorm.register',
        to: `${adminRoot}/dorms/register`,
      },
      {
        icon: 'GR.GrUserAdd',
        label: 'menu.student-register-in-dorm',
        to: `${adminRoot}/dorms/student-register`,
      },
      {
        icon: 'CG.CgUserList',
        label: 'menu.dorm-students',
        to: `${adminRoot}/dorms/students`,
      },
      {
        icon: 'BI.BiMessageAltDetail',
        label: 'menu.dorm-details',
        to: `${adminRoot}/dorms/details`,
      },
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
        icon: 'MD.MdAddBox',
        label: 'subject.register',
        to: `${adminRoot}/subjects/register`,
      },
      {
        icon: 'MD.MdAddBox',
        label: 'subject.curriculum',
        to: `${adminRoot}/subjects/curriculum`,
      },
      {
        icon: 'MD.MdDashboard',
        label: 'provincail Dashboard',
        to: `${adminRoot}/subjects/provincial-dash`,
      },
      {
        icon: 'MD.MdDashboard',
        label: 'Admin dashboard',
        to: `${adminRoot}/subjects/admin-dashboard`,
      },
      {
        icon: 'FA.FaList',
        label: 'subject-list',
        to: `${adminRoot}/subjects/subject-list`,
      },
      {
        icon: 'FA.FaList',
        label: 'curriculum-list',
        to: `${adminRoot}/subjects/curriculum-list`,
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
        icon: 'MD.MdAddBox',
        label: 'class.list',
        to: `${adminRoot}/classes/classes`,
      },
      {
        icon: 'FA.FaList',
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
        icon: 'MD.MdAddBox',
        label: 'menu.field-register',
        to: `${adminRoot}/fields/register`,
      },
    
      {
        icon: 'MD.MdAddBox',
        label: 'department-register',
        to: `${adminRoot}/fields/department-register`,
      },
      {
        icon: 'FA.FaList',
        label: 'field-list',
        to: `${adminRoot}/fields/field-list`,
      },
   
      {
        icon: 'FA.FaList',
        label: 'department-list',
        to: `${adminRoot}/fields/department-list`,
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
    id: 'docs',
    icon: 'iconsminds-library',
    label: 'menu.docs',
    to: 'https://gogo-react-docs.coloredstrategies.com/',
    newWindow: true,
  },
  
];
export default data;
