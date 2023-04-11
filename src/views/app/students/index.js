import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

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
// const UpdateAttendance = React.lazy(() =>
//   import(/* webpackChunkName: "marks-update" */ './')
// );

const AttendanceUpdate = React.lazy(() =>
  import(
    /* webpackChunkName: "attendance-update" */ './attendence/update-attendance'
  )
);

const Main = React.lazy(() =>
  import(/* webpackChunkName: "register-1" */ '../main-register-route')
);

const Students = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/register`} />
      <Route
        exact
        path={`${match.url}/register`}
        render={(props) => <Register {...props} />}
      />
      <Route
        path={`${match.url}/register/:studentId`}
        render={(props) => <Register {...props} />}
      />
      <Route
        exact
        path={`${match.url}/register-kankor`}
        render={(props) => <RegisterKankor {...props} />}
      />
      <Route
        path={`${match.url}/register-kankor/:kankorStudentId`}
        render={(props) => <RegisterKankor {...props} />}
      />
      <Route
        path={`${match.url}/students`}
        render={(props) => <StudentList {...props} />}
      />
      <Route
        exact
        path={`${match.url}/attendance-list`}
        render={(props) => <AttendanceList {...props} />}
      />
      <Route
        path={`${match.url}/attendance-list/:attendance_id`}
        render={(props) => <AttendanceUpdate {...props} />}
      />
      <Route
        path={`${match.url}/dismissed-list`}
        render={(props) => <DismissedStudentList {...props} />}
      />
      <Route
        path={`${match.url}/transfered-list`}
        render={(props) => <TransferedStudentList {...props} />}
      />
      <Route
        path={`${match.url}/kankor-students`}
        render={(props) => <KankorStudentList {...props} />}
      />
      <Route
        exact
        path={`${match.url}/marks-register`}
        render={(props) => <MarksRegistration {...props} />}
      />
      <Route
        path={`${match.url}/marks-register/:id`}
        render={(props) => <MarksRegistration {...props} />}
      />
      <Route
        path={`${match.url}/second-chance`}
        render={(props) => <SecondChanceMarks {...props} />}
      />

      <Route
        exact
        path={`${match.url}/attendance-register`}
        render={(props) => <AttendanceRegistration {...props} />}
      />
      <Route
        path={`${match.url}/attendance-register/:studentAttendanceId`}
        render={(props) => <AttendanceRegistration {...props} />}
      />
      <Route
        path={`${match.url}/student/:studentId`}
        render={(props) => <StudentProfile {...props} />}
      />
      <Route
        path={`${match.url}/student-transfer`}
        render={(props) => <StudentTransfer {...props} />}
      />
      <Route
        path={`${match.url}/marks-display`}
        render={(props) => <MarksDisplay {...props} />}
      />
      <Route
        path={`${match.url}/marks-display-allsubs`}
        render={(props) => <MarksDisplayAllSubs {...props} />}
      />
      <Route
        path={`${match.url}/attendance`}
        render={(props) => <AttendanceDisplay {...props} />}
      />
      <Route
        path={`${match.url}/reports`}
        render={(props) => <Reports {...props} />}
      />
      <Route
        path={`${match.url}/test`}
        render={(props) => <Test {...props} />}
      />
      <Route
        path={`${match.url}/student-dismissal`}
        render={(props) => <Dismissal {...props} />}
      />
      <Route
        path={`${match.url}/reregister`}
        render={(props) => <Reregister {...props} />}
      />
      <Route
        path={`${match.url}/marks-update`}
        render={(props) => <SingleStudentMarksUpdate {...props} />}
      />
      <Route
        path={`${match.url}/attendance-update`}
        render={(props) => <AttendanceUpdate {...props} />}
      />
      <Route
        path={`${match.url}/register-1`}
        render={(props) => <Main {...props} />}
      />
      {/* <ProtectedRoute
        path={`${match.url}/default`}
        component={DashboardDefault}
        roles={[UserRole.Admin]}
      />
       */}
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Students;
