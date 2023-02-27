import { adminRoot } from './defaultValues';

const data = [
  {
    id: 'ُteacher',
    icon: 'iconsminds-student-male',
    label: 'menu.teacher',
    to: `${adminRoot}/teacher`,
 
    subs: [
      {
        icon: 'iconsminds-students',
        label: 'teacher list',
        to: `${adminRoot}/teachers/teachers`,
      },
      {
        icon: 'iconsminds-add-user',
        label: 'menu.teacher-registration',
        to: `${adminRoot}/teachers/register`,
      },
  
      {
        icon: 'iconsminds-profile',
        label: 'menu.teacher-profile',
        to: `${adminRoot}/teachers/profile`,
      },
   
      {
        icon: 'iconsminds-add',
        label: 'menu.teacher-evaluation',
        to: `${adminRoot}/teachers/teacher-evalaution`,
      },
      {
        icon: 'iconsminds-add',
        label: 'menu.teacher-transfer',
        to: `${adminRoot}/teachers/teacher-transfer`,
      },
    ],
  },
  {
    id: 'students',
    icon: 'simple-icon-user',
    label: 'menu.students',
    to: `${adminRoot}/students`,
    // roles: [UserRole.Admin, UserRole.Editor],
    subs: [
      {
        icon: 'simple-icon-user-follow',
        label: 'menu.student_register',
        to: `${adminRoot}/students/register`,
        newWindow: false,
      },
      {
        icon: 'simple-icon-user-follow',
        label: 'menu.student_register_kankor',
        to: `${adminRoot}/students/register-kankor`,
        // roles: [UserRole.Admin],
      },
      {
        icon: 'iconsminds-students',
        label: 'menu.student_list',
        to: `${adminRoot}/students/students`,
        // roles: [UserRole.Admin],
      },
      {
        icon: 'simple-icon-plus',
        label: 'menu.student-marks-register',
        to: `${adminRoot}/students/marks-register`,
      },
      {
        icon: 'simple-icon-plus',
        label: 'menu.attendance-registration',
        to: `${adminRoot}/students/attendance-register`,
      },
      {
        icon: 'simple-icon-user',
        label: 'menu.student-profile',
        to: `${adminRoot}/students/student-profile`,
      },
      {
        icon: 'simple-icon-user-follow',
        label: 'menu.student-transfer',
        to: `${adminRoot}/students/student-transfer`,
        newWindow: false,
      },
      {
        icon: 'simple-icon-user-follow',
        label: 'menu.marks-display',
        to: `${adminRoot}/students/marks-display`,
        newWindow: false,
      },
      {
        icon: 'simple-icon-user-follow',
        label: 'menu.marks-display-all-subs',
        to: `${adminRoot}/students/marks-display-allsubs`,
        newWindow: false,
      },
      {
        icon: 'simple-icon-calculator',
        label: 'menu.attendance',
        to: `${adminRoot}/students/attendance`,
        newWindow: false,
      },
      {
        icon: 'simple-icon-calculator',
        label: 'Kankor Student List',
        to: `${adminRoot}/students/kankor-students`,
        newWindow: false,
      },
    ],
  },
  {
    id: 'workers',
    icon: 'simple-icon-user',
    // label: 'menu.students',
    label: 'workers',
    to: `${adminRoot}/workers`,
    // roles: [UserRole.Admin, UserRole.Editor],
    subs: [
      {
        icon: 'simple-icon-user-follow',
        // label: 'menu.student_register',
        label: 'worker register',
        to: `${adminRoot}/workers/worker`,
        newWindow: false,
      },
      {
        icon: 'simple-icon-user-follow',
        // label: 'menu.student_register',
        label: 'worker list',
        to: `${adminRoot}/workers/worker-list`,
        newWindow: false,
      },
      {
        icon: 'simple-icon-user-follow',
        // label: 'menu.student_register',
        label: 'worker Profile',
        to: `${adminRoot}/workers/workerId`,
        newWindow: false,
      },
     
    ],
  },
  {
    id: 'institute',
    icon: 'iconsminds-home',
    label: 'menu.institutes',
    to: `${adminRoot}/institutes`,
    subs: [
      {
        icon: 'iconsminds-home',
        label: 'menu.institute_list',
        to: `${adminRoot}/institutes/institutes`,
      },
      {
        icon: 'simple-icon-plus',
        label: 'menu.institute_register',
        to: `${adminRoot}/institutes/register`,
      },
      {
        icon: 'simple-icon-plus',
        label: 'menu.institute-upgrade',
        to: `${adminRoot}/institutes/institute-upgrade`,
      },
      {
        icon: 'simple-icon-plus',
        label: 'menu.Institute-details',
        to: `${adminRoot}/institutes/institute-details`,
      },
    ],
  },
  {
    id: 'dorms',
    icon: 'iconsminds-hotel',
    label: 'menu.dorms',
    to: `${adminRoot}/dorms`,
    subs: [
      {
        icon: 'simple-icon-check',
        label: 'dorm.list',
        to: `${adminRoot}/dorms/dorms`,
      },
      {
        icon: 'simple-icon-calculator',
        label: 'dorm.register',
        to: `${adminRoot}/dorms/register`,
      },
      {
        icon: 'simple-icon-plus',
        label: 'menu.student-register-in-dorm',
        to: `${adminRoot}/dorms/student-register`,
      },
      {
        icon: 'simple-icon-plus',
        label: 'menu.dorm-students',
        to: `${adminRoot}/dorms/students`,
      },
      {
        icon: 'simple-icon-check',
        label: 'menu.dorm-details',
        to: `${adminRoot}/dorms/details`,
      },
      {
        icon: 'simple-icon-check',
        label: 'menu.dorm-student-dismissal',
        to: `${adminRoot}/dorms/student-dismissal`,
      },
    ],
  },
  {
    id: 'subjects',
    icon: 'simple-icon-book-open',
    label: 'menu.subjects',
    to: `${adminRoot}/subjects`,
    subs: [
      {
        icon: 'simple-icon-plus',
        label: 'subject.register',
        to: `${adminRoot}/subjects/register`,
      },
      {
        icon: 'simple-icon-plus',
        label: 'subject.curriculum',
        to: `${adminRoot}/subjects/curriculum`,
      },
      {
        icon: 'simple-icon-plus',
        label: 'provincail Dashboard',
        to: `${adminRoot}/subjects/provincial-dash`,
      },
      {
        icon: 'simple-icon-plus',
        label: 'Admin dashboard',
        to: `${adminRoot}/subjects/admin-dashboard`,
      },
      {
        icon: 'simple-icon-plus',
        label: 'subject-list',
        to: `${adminRoot}/subjects/subject-list`,
      },
      {
        icon: 'simple-icon-plus',
        label: 'curriculum-list',
        to: `${adminRoot}/subjects/curriculum-list`,
      },
    ],
  },
  {
    id: 'classess',
    icon: 'iconsminds-home-4',
    label: 'menu.classes',
    to: `${adminRoot}/classes`,
    subs: [
      {
        icon: 'simple-icon-logout',
        label: 'class.list',
        to: `${adminRoot}/classes/classes`,
      },
      {
        icon: 'simple-icon-logout',
        label: 'class.register',
        to: `${adminRoot}/classes/register`,
      },
    ],
  },

  {
    id: 'fields',
    icon: 'simple-icon-layers',
    label: 'menu.field',
    to: `${adminRoot}/fields`,
    subs: [
      {
        icon: 'simple-icon-plus',
        label: 'menu.field-register',
        to: `${adminRoot}/fields/register`,
      },
      // {
      //   icon: 'simple-icon-logout',
      //   label: 'class.fields',
      //   to: `${adminRoot}/fields/fields`,
      // },
      {
        icon: 'simple-icon-logout',
        // label: 'class.fields',
        label: 'department-register',
        to: `${adminRoot}/fields/department-register`,
      },
      {
        icon: 'simple-icon-logout',
        label: 'field-list',
        to: `${adminRoot}/fields/field-list`,
      },
   
      {
        icon: 'simple-icon-logout',
        label: 'department-list',
        to: `${adminRoot}/fields/department-list`,
      },
      {
        icon: 'simple-icon-logout',
        label: 'department-register',
        to: `${adminRoot}/fields/department-register`,
      },
      
      {
        icon: 'simple-icon-logout',
        label: 'department-list',
        to: `${adminRoot}/fields/department-list`,
      },
    ],
  },

 
  {
    id: 'evaluations',
    icon: 'simple-icon-book-open',
    label: 'menu.evaluation',
    to: `${adminRoot}/evaluations`,
    subs: [
      {
        icon: 'simple-icon-logout',
        label: 'evaluation.list',
        to: `${adminRoot}/evaluations/evaluations`,
      },
      {
        icon: 'simple-icon-plus',
        label: 'menu.teacher-promotion-demotion',
        to: `${adminRoot}/evaluations/promotion-demotion`,
      },
      {
        icon: 'simple-icon-plus',
        label: 'جزیات ارزیابی',
        to: `${adminRoot}/evaluations/evaluation-details`,
      },
    ],
  },

  {
    id: 'hr-evaluations',
    icon: 'simple-icon-book-open',
    label: 'menu.hr-evaluation',
    to: `${adminRoot}/hr-evaluations`,
    subs: [
      {
        icon: 'simple-icon-logout',
        label: 'evaluation.list',
        to: `${adminRoot}/hr-evaluations/hr-evaluations`,
      },
      {
        icon: 'simple-icon-plus',
        label: 'menu.teacher-HR-evaluation',
        to: `${adminRoot}/hr-evaluations/teacher-hr-evaluation`,
      },
    ],
  },
  {
    id: 'blankpage',
    icon: 'iconsminds-bucket',
    label: 'menu.blank-page',
    to: `${adminRoot}/blank-page`,
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
