import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const DormList = React.lazy(() =>
  import(/* webpackChunkName: "dorm-list" */ './dorm-list/DormListMain')
);

const DormRegister = React.lazy(() =>
  import(/* webpackChunkName: "dorm-register" */ './dorm-register')
);

const StudentDormList = React.lazy(() =>
  import(
    /* webpackChunkName: "student-dorm-list" */ './dorm-students-list/DormStudentsListMain'
  )
);

const StudentRegistrationInDorm = React.lazy(() =>
  import(
    /* webpackChunkName: "student-register" */ './student-register-in-dorm'
  )
);

const DormProfile = React.lazy(() =>
  import(/* webpackChunkName: "details" */ './dorm-profile')
);

const DormStudentDismissal = React.lazy(() =>
  import(/* webpackChunkName: "student-dismissal" */ './dorm-student-dismissal')
);

const Dorms = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/dorms`} />
      <Route
        path={`${match.url}/dorms`}
        render={(props) => <DormList {...props} />}
      />
      <Route
        exact
        path={`${match.url}/register`}
        render={(props) => <DormRegister {...props} />}
      />
      <Route
        path={`${match.url}/register/:dormId`}
        render={(props) => <DormRegister {...props} />}
      />
      <Route
        path={`${match.url}/students`}
        render={(props) => <StudentDormList {...props} />}
      />
      <Route
        path={`${match.url}/student-register`}
        render={(props) => <StudentRegistrationInDorm {...props} />}
      />
      <Route
        path={`${match.url}/dorm/:dormId`}
        render={(props) => <DormProfile {...props} />}
      />
      <Route
        path={`${match.url}/student-dismissal`}
        render={(props) => <DormStudentDismissal {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Dorms;
