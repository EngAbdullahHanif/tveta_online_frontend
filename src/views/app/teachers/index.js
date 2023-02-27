import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const TeacherList = React.lazy(() =>
  import(
    /* webpackChunkName: "teacher-list" */ './bio/teacher-list/TeacherListMain'
  )
);
const TeacherEvaluation = React.lazy(() =>
  import(/* webpackChunkName: "teacher-evaluation" */ './teacher-evaluation')
);

// This used to create a sub memu of the sidebar.
const TeacherRegister = React.lazy(() =>
  import(/* webpackChunkName: "teacher-register" */ './bio/teacher-register')
);

// This used to create a sub memu of the sidebar.
const TeacherProfile = React.lazy(() =>
  import(/* webpackChunkName: "profile" */ './bio/teacher-profile')
);

const TeacherHrEvaluation = React.lazy(() =>
  import(
    /* webpackChunkName: "hr-evaluation" */ '../hr-evaluation/teacher-hr-evaluation'
  )
);
const TeacherPromotionDemotion = React.lazy(() =>
  import(
    /* webpackChunkName: "promotion-demotion" */ './promotion-demotion-list/PromotionDemotionListMain'
  )
);
const TeacherTransfer = React.lazy(() =>
  import(/* webpackChunkName: "teacher-transfer" */ './bio/teacher-transfer')
);

const Test = React.lazy(() =>
  import(/* webpackChunkName: "teacher-transfer" */ './test')
);


const Teachers = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/teachers`} />
      <Route
        path={`${match.url}/teachers`}
        render={(props) => <TeacherList {...props} />}
      />

      {/* Teacher register sub menu is created */}
      <Route
        path={`${match.url}/register`}
        render={(props) => <TeacherRegister {...props} />}
      />
      <Route
        path={`${match.url}/teacher-hr-evalaution`}
        render={(props) => <TeacherHrEvaluation {...props} />}
      />
      <Route
        path={`${match.url}/teacher/:teacherId`}
        render={(props) => <TeacherProfile {...props} />}
      />
      <Route
        path={`${match.url}/teacher-evalaution`}
        render={(props) => <TeacherEvaluation {...props} />}
      />
      <Route
        path={`${match.url}/teacher-promotion-demotion`}
        render={(props) => <TeacherPromotionDemotion {...props} />}
      />

      <Route
        path={`${match.url}/teacher-transfer`}
        render={(props) => <TeacherTransfer {...props} />}
      />
      <Route
        path={`${match.url}/test`}
        render={(props) => <Test {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Teachers;
