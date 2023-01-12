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
        label: 'menu.teacher_list',
        to: `${adminRoot}/teachers/teachers`,
      },
      {
        icon: 'iconsminds-add-user',
        label: 'menu.teacher-registration',
        to: `${adminRoot}/teachers/register`,
      },
      {
        icon: 'iconsminds-student-male',
        label: 'menu.teacher-profile',
        to: `${adminRoot}/teachers/profile`,
      },
      {
        icon: 'simple-icon-plus',
        label: 'menu.teacher-evaluation',
        to: `${adminRoot}/teachers/teacher-evalaution`,
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
    ],
  },
  // {
  //   id: 'students',
  //   icon: 'simple-icon-user',
  //   label: 'menu.students',
  //   to: `${adminRoot}/students`,
  //   subs: [
  //     {
  //       id: 'stdInfo_Entry',
  //       label: 'menu.info_Entry',
  //       to: '/students',
  //       subs: [
  //         {
  //           icon: 'simple-icon-user-follow',
  //           label: 'menu.student_egistrtion',
  //           to: `${adminRoot}/students/kankor-result`,
  //           newWindow: false,
  //         },
  //         {
  //           icon: 'simple-icon-user-following',
  //           label: 'menu.login',
  //           to: '/user/login',
  //         },
  //         {
  //           icon: 'simple-icon-user-follow',
  //           label: 'menu.register',
  //           to: '/user/register',
  //           newWindow: true,
  //         },
  //         {
  //           icon: 'simple-icon-user-following',
  //           label: 'menu.forgot-password',
  //           to: '/user/forgot-password',
  //           newWindow: true,
  //         },
  //         {
  //           icon: 'simple-icon-user-unfollow',
  //           label: 'menu.reset-password',
  //           to: '/user/reset-password',
  //           newWindow: true,
  //         },
  //       ],
  //     },
  //     {
  //       id: 'pages-product',
  //       label: 'menu.product',
  //       to: `${adminRoot}/pages/product`,
  //       subs: [
  //         {
  //           icon: 'simple-icon-credit-card',
  //           label: 'menu.data-list',
  //           to: `${adminRoot}/pages/product/data-list`,
  //         },
  //         {
  //           icon: 'simple-icon-list',
  //           label: 'menu.thumb-list',
  //           to: `${adminRoot}/pages/product/thumb-list`,
  //         },
  //         {
  //           icon: 'simple-icon-grid',
  //           label: 'menu.image-list',
  //           to: `${adminRoot}/pages/product/image-list`,
  //         },
  //         {
  //           icon: 'simple-icon-picture',
  //           label: 'menu.details',
  //           to: `${adminRoot}/pages/product/details`,
  //         },
  //         {
  //           icon: 'simple-icon-book-open',
  //           label: 'menu.details-alt',
  //           to: `${adminRoot}/pages/product/details-alt`,
  //         },
  //       ],
  //     },
  //     {
  //       id: 'pages-profile',
  //       label: 'menu.profile',
  //       to: `${adminRoot}/pages/profile`,
  //       subs: [
  //         {
  //           icon: 'simple-icon-share',
  //           label: 'menu.social',
  //           to: `${adminRoot}/pages/profile/social`,
  //         },
  //         {
  //           icon: 'simple-icon-link',
  //           label: 'menu.portfolio',
  //           to: `${adminRoot}/pages/profile/portfolio`,
  //         },
  //       ],
  //     },
  //     {
  //       id: 'pages-blog',
  //       label: 'menu.blog',
  //       to: `${adminRoot}/pages/blog`,
  //       subs: [
  //         {
  //           icon: 'simple-icon-share',
  //           label: 'menu.blog-list',
  //           to: `${adminRoot}/pages/blog/blog-list`,
  //         },
  //         {
  //           icon: 'simple-icon-link',
  //           label: 'menu.blog-detail',
  //           to: `${adminRoot}/pages/blog/blog-detail`,
  //         },
  //       ],
  //     },
  //     {
  //       id: 'pages-miscellaneous',
  //       label: 'menu.miscellaneous',
  //       to: `${adminRoot}/pages/miscellaneous`,
  //       subs: [
  //         {
  //           icon: 'simple-icon-question',
  //           label: 'menu.faq',
  //           to: `${adminRoot}/pages/miscellaneous/faq`,
  //         },
  //         {
  //           icon: 'simple-icon-graduation',
  //           label: 'menu.knowledge-base',
  //           to: `${adminRoot}/pages/miscellaneous/knowledge-base`,
  //         },

  //         {
  //           icon: 'simple-icon-diamond',
  //           label: 'menu.prices',
  //           to: `${adminRoot}/pages/miscellaneous/prices`,
  //         },
  //         {
  //           icon: 'simple-icon-magnifier',
  //           label: 'menu.search',
  //           to: `${adminRoot}/pages/miscellaneous/search`,
  //         },
  //         {
  //           icon: 'simple-icon-envelope-open',
  //           label: 'menu.mailing',
  //           to: `${adminRoot}/pages/miscellaneous/mailing`,
  //         },
  //         {
  //           icon: 'simple-icon-bag',
  //           label: 'menu.invoice',
  //           to: `${adminRoot}/pages/miscellaneous/invoice`,
  //         },

  //         {
  //           icon: 'simple-icon-exclamation',
  //           label: 'menu.error',
  //           to: '/error',
  //           newWindow: true,
  //         },
  //       ],
  //     },
  //   ],
  // },
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
      {
        icon: 'simple-icon-logout',
        label: 'class.fields',
        to: `${adminRoot}/fields/fields`,
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
