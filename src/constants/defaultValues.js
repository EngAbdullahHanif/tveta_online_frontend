export const userRole = {
  superUser: 'super_admin',
  admin: 'admin',
  provincial: 'ins_dataentry',
  institute: 'institute',
  user: 'user',
  dormManager: 'dorm_manager',
  instituteDataentry: 'ins_dataentry',
  instituteManager: 'ins_manager',
  authorityDataentry: 'hq_dataentry',
  authoritySupervisor: 'hq_supervisor',
  provinceDataentry: 'pr_dataentry',
  provinceSupervisor: 'pr_supervisor',
  dataentry: 'dataentry',
  supervisor: 'supervisor',
};

export const roleRoots = {
  admin: '/app',
  dorm_manager: '/app/dorms/students',
  ins_manager: '/app/students',
};

/* 
Menu Types:
"menu-default", "menu-sub-hidden", "menu-hidden"
*/
export const defaultMenuType = 'menu-default';

export const subHiddenBreakpoint = 1440;
export const menuHiddenBreakpoint = 768;
export const defaultLocale = 'fa';
export const localeOptions = [
  { id: 'fa', name: 'پشتو/ دری', direction: 'rtl' },
  { id: 'en', name: 'English', direction: 'ltr' },
  // ,
  // { id: 'es', name: 'Español', direction: 'ltr' },
  // { id: 'enrtl', name: 'English - RTL', direction: 'rtl' },
];

export const firebaseConfig = {
  apiKey: 'AIzaSyBBksq-Asxq2M4Ot-75X19IyrEYJqNBPcg',
  authDomain: 'gogo-react-login.firebaseapp.com',
  databaseURL: 'https://gogo-react-login.firebaseio.com',
  projectId: 'gogo-react-login',
  storageBucket: 'gogo-react-login.appspot.com',
  messagingSenderId: '216495999563',
};

export const currentUser = {
  id: 1,
  title: 'سمیع الله رحیمی',
  img: '/assets/img/profiles/l-1.jpg',
  date: 'آخرین بازدید امروز 15:24',
  role: [userRole.admin, userRole.Editor],
};

export const adminRoot = '/app';
export const buyUrl = 'https://www.rtl-theme.com/?p=94491';
export const searchPath = `${adminRoot}/pages/miscellaneous/search`;
export const servicePath = 'https://api.coloredstrategies.com';

export const themeColorStorageKey = '__theme_selected_color';
export const isMultiColorActive = true;
export const defaultColor = 'light.purplemonster';
export const isDarkSwitchActive = true;
export const defaultDirection = 'rtl';
export const themeRadiusStorageKey = '__theme_radius';
export const isAuthGuardActive = true;
export const colors = [
  'bluenavy',
  'blueyale',
  'blueolympic',
  'greenmoss',
  'greenlime',
  'purplemonster',
  'orangecarrot',
  'redruby',
  'yellowgranola',
  'greysteel',
];
