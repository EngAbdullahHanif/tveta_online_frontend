import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { getCurrentUser } from 'helpers/Utils';
import { ProtectedRoute } from 'helpers/authHelper';
import { userRole } from 'constants/defaultValues';
import singleStudentSingleSubjectMarks from './single-student-single-subject-marks';
import singleStudentAttendace from './attendence/single-student-attendace';
import ClassTransfer from './transfered-students/class-transfer';
import StudentUpdate from './bio/student-update';
const Register = React.lazy(() =>
  import(/* webpackChunkName: "register" */ './bio/register')
);

const RegisterKankor = React.lazy(() =>
  import(/* webpackChunkName: "kankor-result" */ './bio/register-kankor')
);

const StudentList = React.lazy(() =>
  import(
    /* webpackChunkName: "student-list" */ './bio/students-list/StudentListMain'
  )
);

const KankorStudentList = React.lazy(() =>
  import(
    /* webpackChunkName: "kankor-student-list" */ './bio/kankor-students-list/KankorStudentListMain'
  )
);
const DismissedStudentList = React.lazy(() =>
  import(
    /* webpackChunkName: "kankor-student-list" */ './dismissed-students/dismissed-students'
  )
);
const TransferedStudentList = React.lazy(() =>
  import(
    /* webpackChunkName: "kankor-student-list" */ './transfered-students/transfered-students'
  )
);
const DTStudentProfile = React.lazy(() =>
  import(
    /* webpackChunkName: "kankor-student-list" */ './dissmised-and-transfered-student-profile'
  )
);
const MarksRegistration = React.lazy(() =>
  import(/* webpackChunkName: "marks-register" */ './marks-register')
);
const AttendanceRegistration = React.lazy(() =>
  import(/* webpackChunkName: "attendance-register" */ './attendence/resgister')
);
const StudentProfile = React.lazy(() =>
  import(/* webpackChunkName: "student-profile" */ './bio/student-profile')
);
const StudentTransfer = React.lazy(() =>
  import(/* webpackChunkName: "student-transfer" */ './student-transfer')
);
const MarksDisplay = React.lazy(() =>
  import(/* webpackChunkName: "marks-display" */ './subject-marks')
);
// const MarksVerification = React.lazy(() =>
//   import(/* webpackChunkName: "marks-display" */ './subject-marks-verification')
// );
const MarksDisplayAllSubs = React.lazy(() =>
  import(/* webpackChunkName: "marks-display-allsubs" */ './class-marks')
);
const AttendanceDisplay = React.lazy(() =>
  import(/* webpackChunkName: "attendance" */ './attendence/attendance-display')
);
const AttendanceList = React.lazy(() =>
  import(
    /* webpackChunkName: "student-list" */ './attendence/attendance-list/AttendanceListMain'
  )
);
const Reports = React.lazy(() =>
  import(/* webpackChunkName: "reports" */ './reports')
);
const Test = React.lazy(() => import(/* webpackChunkName: "test" */ './test'));
const Dismissal = React.lazy(() =>
  import(/* webpackChunkName: "dismissal" */ './student-dismissal')
);
// const Dismissal = React.lazy(() =>
//   import(
//     /* webpackChunkName: "dismissal" */ './dismissed-students/dismissed-students'
//   )
// );

const Reregister = React.lazy(() =>
  import(/* webpackChunkName: "reregister" */ './reregister')
);

const SecondChanceMarks = React.lazy(() =>
  import(
    /* webpackChunkName: "second-chance-marks register" */ './second-chance-marks-register'
  )
);

const SingleStudentMarksUpdate = React.lazy(() =>
  import(/* webpackChunkName: "marks-update" */ './single-student-marksUpdate')
);

const StudentUpgrade = React.lazy(() =>
  import(/* webpackChunkName: "student-upgrade" */ './student-upgrade')
);

const StudentClassStatusUpgrade = React.lazy(() =>
  import(
    /* webpackChunkName: "student-upgrade" */ './students-class-status-upgrade'
  )
);

const MarkStatusCheckedStudents = React.lazy(() =>
  import(
    /* webpackChunkName: "student-upgrade" */ './marks-status-checked-students'
  )
);

const SubjectMarksVerification = React.lazy(() =>
  import(/* webpackChunkName: "marks-display" */ './subject-marks-verification')
);

const RejectedMarksUpdate = React.lazy(() =>
  import(
    /* webpackChunkName: "marks-update" */ './rejected-subject-marks-update'
  )
);

// const UpdateAttendance = React.lazy(() =>
//   import(/* webpackChunkName: "marks-update" */ './')
// );

const AttendanceUpdate = React.lazy(() =>
  import(
    /* webpackChunkName: "attendance-update" */ './attendence/update-attendance'
  )
);

const KankorProfile = React.lazy(() =>
  import(/* webpackChunkName: "attendance-update" */ './bio/kankor-profile')
);

const DepartmentChange = React.lazy(() =>
  import(/* webpackChunkName: "attendance-update" */ './department-change')
);

const SectionChange = React.lazy(() =>
  import(/* webpackChunkName: "attendance-update" */ './section-change')
);
const Main = React.lazy(() =>
  import(/* webpackChunkName: "register-1" */ '../main-register-route')
);

const Students = ({ match, props }) => {
  const currentUser = getCurrentUser();
  return (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
        {/* redirect from / to students */}
        <Redirect exact from={`${match.url}/`} to={`${match.url}/students`} />

        <ProtectedRoute
          exact
          path={`${match.url}/register-kankor`}
          component={RegisterKankor}
          roles={[
            userRole.admin,
            userRole.institute,
            userRole.superUser,
            userRole.instituteDataentry,
            userRole.provinceDataentry,
            userRole.authorityDataentry,
          ]}
          props={props}
        />
        <ProtectedRoute
          path={`${match.url}/register`}
          component={Register}
          roles={[
            userRole.admin,
            userRole.institute,
            userRole.superUser,
            userRole.instituteDataentry,
          ]}
          props={props}
        />

        <ProtectedRoute
          path={`${match.url}/student-update/:studentId`}
          component={StudentUpdate}
          roles={[
            userRole.admin,
            userRole.institute,
            userRole.superUser,
            userRole.provincial,
          ]}
          props={props}
        />

        {/* Changes Started */}
        <ProtectedRoute
          exact
          path={`${match.url}/single-subject`}
          component={singleStudentSingleSubjectMarks}
          roles={[
            userRole.admin,
            userRole.institute,
            userRole.superUser,
            userRole.provincial,
          ]}
          props={props}
        />
        <ProtectedRoute
          exact
          path={`${match.url}/single-student-attendance`}
          component={singleStudentAttendace}
          roles={[
            userRole.admin,
            userRole.institute,
            userRole.superUser,
            userRole.provincial,
          ]}
          props={props}
        />
        <ProtectedRoute
          exact
          path={`${match.url}/class-transfer`}
          component={ClassTransfer}
          roles={[
            userRole.admin,
            userRole.institute,
            userRole.superUser,
            userRole.provincial,
          ]}
          props={props}
        />
        {/* Changes Ended */}
        <ProtectedRoute
          path={`${match.url}/register-kankor/:kankorStudentId`}
          component={RegisterKankor}
          roles={[
            userRole.admin,
            userRole.institute,
            userRole.superUser,
            userRole.provincial,
          ]}
          props={props}
        />
        <ProtectedRoute
          path={`${match.url}/students`}
          component={StudentList}
          roles={[
            userRole.admin,
            userRole.institute,
            userRole.superUser,
            userRole.provincial,
            userRole.dataentry,
          ]}
          props={props}
        />
        <ProtectedRoute
          exact
          path={`${match.url}/attendance-list`}
          component={AttendanceList}
          roles={[
            userRole.admin,
            userRole.institute,
            userRole.superUser,
            userRole.provincial,
          ]}
          props={props}
        />
        <ProtectedRoute
          path={`${match.url}/attendance-list/:attendance_id`}
          component={AttendanceUpdate}
          roles={[
            userRole.admin,
            userRole.institute,
            userRole.superUser,
            userRole.provincial,
          ]}
          props={props}
        />
        <ProtectedRoute
          path={`${match.url}/dismissed-list`}
          component={DismissedStudentList}
          roles={[
            userRole.admin,
            userRole.institute,
            userRole.superUser,
            userRole.provincial,
          ]}
          props={props}
        />
        <ProtectedRoute
          path={`${match.url}/transfered-list`}
          component={TransferedStudentList}
          roles={[
            userRole.admin,
            userRole.institute,
            userRole.superUser,
            userRole.provincial,
          ]}
          props={props}
        />
        <ProtectedRoute
          path={`${match.url}/kankor-students`}
          component={KankorStudentList}
          roles={[
            userRole.admin,
            userRole.institute,
            userRole.superUser,
            userRole.provincial,
          ]}
          props={props}
        />
        <ProtectedRoute
          path={`${match.url}/kankor-student/:kankorId`}
          component={KankorProfile}
          roles={[
            userRole.admin,
            userRole.institute,
            userRole.superUser,
            userRole.provincial,
          ]}
          props={props}
        />
        <ProtectedRoute
          exact
          path={`${match.url}/marks-register`}
          component={MarksRegistration}
          roles={[
            userRole.admin,
            userRole.institute,
            userRole.superUser,
            userRole.provincial,
          ]}
          props={props}
        />
        <ProtectedRoute
          path={`${match.url}/marks-register/:id`}
          component={MarksRegistration}
          roles={[
            userRole.admin,
            userRole.institute,
            userRole.superUser,
            userRole.provincial,
          ]}
          props={props}
        />
        <ProtectedRoute
          path={`${match.url}/second-chance`}
          component={SecondChanceMarks}
          roles={[
            userRole.admin,
            userRole.institute,
            userRole.superUser,
            userRole.provincial,
          ]}
          props={props}
        />
        <ProtectedRoute
          exact
          path={`${match.url}/attendance-register`}
          component={AttendanceRegistration}
          roles={[
            userRole.admin,
            userRole.institute,
            userRole.superUser,
            userRole.provincial,
          ]}
          props={props}
        />
        <ProtectedRoute
          path={`${match.url}/attendance-register/:studentAttendanceId`}
          component={AttendanceRegistration}
          roles={[
            userRole.admin,
            userRole.institute,
            userRole.superUser,
            userRole.provincial,
          ]}
          props={props}
        />
        <ProtectedRoute
          path={`${match.url}/student/:studentId`}
          component={StudentProfile}
          roles={[
            userRole.admin,
            userRole.institute,
            userRole.superUser,
            userRole.provincial,
          ]}
          props={props}
        />
        <ProtectedRoute
          path={`${match.url}/student-transfer`}
          component={StudentTransfer}
          roles={[
            userRole.admin,
            userRole.institute,
            userRole.superUser,
            userRole.provincial,
          ]}
          props={props}
        />
        <ProtectedRoute
          path={`${match.url}/marks-display`}
          component={MarksDisplay}
          roles={[
            userRole.admin,
            userRole.institute,
            userRole.superUser,
            userRole.provincial,
          ]}
          props={props}
        />
        <ProtectedRoute
          path={`${match.url}/subject-marks-verification`}
          component={SubjectMarksVerification}
          roles={[
            userRole.admin,
            userRole.institute,
            userRole.superUser,
            userRole.provincial,
          ]}
          props={props}
        />

        <ProtectedRoute
          path={`${match.url}/rejected-marks-update`}
          component={RejectedMarksUpdate}
          roles={[
            userRole.admin,
            userRole.institute,
            userRole.superUser,
            userRole.provincial,
          ]}
          props={props}
        />
        <ProtectedRoute
          path={`${match.url}/class-marks`}
          component={MarksDisplayAllSubs}
          roles={[
            userRole.admin,
            userRole.institute,
            userRole.superUser,
            userRole.provincial,
          ]}
          props={props}
        />
        <ProtectedRoute
          path={`${match.url}/attendance`}
          component={AttendanceDisplay}
          roles={[
            userRole.admin,
            userRole.institute,
            userRole.superUser,
            userRole.provincial,
          ]}
          props={props}
        />
        <ProtectedRoute
          path={`${match.url}/reports`}
          component={Reports}
          roles={[
            userRole.admin,
            userRole.institute,
            userRole.superUser,
            userRole.provincial,
          ]}
          props={props}
        />
        <ProtectedRoute
          path={`${match.url}/test`}
          component={Test}
          roles={[
            userRole.admin,
            userRole.institute,
            userRole.superUser,
            userRole.provincial,
          ]}
          props={props}
        />
        <ProtectedRoute
          path={`${match.url}/student-dismissal`}
          component={Dismissal}
          roles={[
            userRole.admin,
            userRole.institute,
            userRole.superUser,
            userRole.provincial,
          ]}
          props={props}
        />
        <ProtectedRoute
          path={`${match.url}/reregister`}
          component={Reregister}
          roles={[
            userRole.admin,
            userRole.institute,
            userRole.superUser,
            userRole.provincial,
          ]}
          props={props}
        />
        <ProtectedRoute
          path={`${match.url}/marks-update`}
          component={SingleStudentMarksUpdate}
          roles={[
            userRole.admin,
            userRole.institute,
            userRole.superUser,
            userRole.provincial,
          ]}
          props={props}
        />
        <ProtectedRoute
          path={`${match.url}/attendance-update`}
          component={AttendanceUpdate}
          roles={[
            userRole.admin,
            userRole.institute,
            userRole.superUser,
            userRole.provincial,
          ]}
          props={props}
        />
        <ProtectedRoute
          path={`${match.url}/register-1`}
          component={Main}
          roles={[
            userRole.admin,
            userRole.institute,
            userRole.superUser,
            userRole.provincial,
          ]}
          props={props}
        />
        <ProtectedRoute
          path={`${match.url}/student-upgrade`}
          component={StudentUpgrade}
          roles={[
            userRole.admin,
            userRole.institute,
            userRole.superUser,
            userRole.provincial,
          ]}
          props={props}
        />
        <ProtectedRoute
          path={`${match.url}/student-upgrade`}
          component={StudentUpgrade}
          roles={[
            userRole.admin,
            userRole.institute,
            userRole.superUser,
            userRole.provincial,
          ]}
          props={props}
        />
        {/* <ProtectedRoute
        path={`${match.url}/kankor-profile`}
        component={KankorProfile}
        roles={[userRole.admin, userRole.institute, userRole.superUser, userRole.provincial]}
          props={props}
      /> */}
        <ProtectedRoute
          path={`${match.url}/students-class-status-upgrade`}
          component={StudentClassStatusUpgrade}
          roles={[
            userRole.admin,
            userRole.institute,
            userRole.superUser,
            userRole.provincial,
          ]}
          props={props}
        />
        <ProtectedRoute
          path={`${match.url}/marks-status-cheked-students`}
          component={MarkStatusCheckedStudents}
          roles={[
            userRole.admin,
            userRole.institute,
            userRole.superUser,
            userRole.provincial,
          ]}
          props={props}
        />
        <ProtectedRoute
          path={`${match.url}/department-change`}
          component={DepartmentChange}
          roles={[
            userRole.admin,
            userRole.institute,
            userRole.superUser,
            userRole.provincial,
          ]}
          props={props}
        />

        <ProtectedRoute
          path={`${match.url}/section-change`}
          component={SectionChange}
          roles={[
            userRole.admin,
            userRole.institute,
            userRole.superUser,
            userRole.provincial,
          ]}
          props={props}
        />

        {/* <ProtectedRoute
        path={`${match.url}/default`}
        component={DashboardDefault}
        roles={[userRole.admin]}
      />*/}
        <Redirect to="/error" />
      </Switch>
    </Suspense>
  );
};
export default Students;
