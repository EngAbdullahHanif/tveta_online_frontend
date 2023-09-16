import React, { Suspense } from 'react';
import { withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from 'layout/AppLayout';
import { ProtectedRoute } from 'helpers/authHelper';
import { userRole } from 'constants/defaultValues';
import UsersList from './users/users-list';
const Dashboards = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './dashboards'),
);
const Pages = React.lazy(() =>
  import(/* webpackChunkName: "pages" */ './pages'),
);
const Applications = React.lazy(() =>
  import(/* webpackChunkName: "applications" */ './applications'),
);
const Students = React.lazy(() =>
  import(/* webpackChunkName: "students" */ './students'),
);

const Teachers = React.lazy(() =>
  import(/* webpackChunkName: "teachers" */ './teachers'),
);

const Institutes = React.lazy(() =>
  import(/* webpackChunkName: "institues" */ './institutes'),
);

const Subjects = React.lazy(() =>
  import(/* webpackChunkName: "subjects" */ './subjects'),
);

const Classes = React.lazy(() =>
  import(/* webpackChunkName: "classes" */ './classes'),
);

const Fields = React.lazy(() =>
  import(/* webpackChunkName: "fields" */ './fields'),
);
const Evaluations = React.lazy(() =>
  import(/* webpackChunkName: "evaluation" */ './evaluations'),
);
const Workshops = React.lazy(() =>
  import(/* webpackChunkName: "evaluation" */ './workshops'),
);
const Needs = React.lazy(() =>
  import(/* webpackChunkName: "evaluation" */ './needs'),
);
const HREvaluations = React.lazy(() =>
  import(/* webpackChunkName: "hr-evaluation" */ './hr-evaluation'),
);

const Dorms = React.lazy(() =>
  import(/* webpackChunkName: "dorms" */ './dorms'),
);

const Workers = React.lazy(() =>
  import(/* webpackChunkName: "workers" */ './workers'),
);

const Groups = React.lazy(() =>
  import(/* webpackChunkName: "group" */ './group'),
);

const Ui = React.lazy(() => import(/* webpackChunkName: "ui" */ './ui'));
const Menu = React.lazy(() => import(/* webpackChunkName: "menu" */ './menu'));
const BlankPage = React.lazy(() =>
  import(/* webpackChunkName: "blank-page" */ './blank-page'),
);

const App = ({ match, props }) => {
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect
              exact
              from={`${match.url}/`}
              to={`${match.url}/dashboards`}
            />
            <ProtectedRoute
              path={`${match.url}/dashboards`}
              component={Dashboards}
              // roles={[
              //   userRole.superUser,
              //   userRole.admin,
              //   userRole.instituteDataentry,
              //   userRole.instituteManager,
              // ]}
              props={props}
            />
            <ProtectedRoute
              path={`${match.url}/users`}
              component={UsersList}
              roles={[
                userRole.superUser,
                userRole.admin,
                userRole.instituteDataentry,
                userRole.instituteManager,
                userRole.provinceSupervisor,
                userRole.provinceDataentry,
              ]}
              props={props}
            />
            <ProtectedRoute
              path={`${match.url}/applications`}
              component={Applications}
              roles={[
                userRole.superUser,
                userRole.admin,
                userRole.instituteDataentry,
                userRole.instituteManager,
                userRole.provinceSupervisor,
                userRole.provinceDataentry,
              ]}
              props={props}
            />

            <ProtectedRoute
              path={`${match.url}/pages`}
              component={Pages}
              roles={[
                userRole.superUser,
                userRole.admin,
                userRole.instituteDataentry,
                userRole.instituteManager,
                userRole.provinceSupervisor,
                userRole.provinceDataentry,
              ]}
              props={props}
            />

            <ProtectedRoute
              path={`${match.url}/ui`}
              component={Ui}
              roles={[
                userRole.superUser,
                userRole.admin,
                userRole.instituteDataentry,
                userRole.instituteManager,
                userRole.provinceSupervisor,
                userRole.provinceDataentry,
              ]}
              props={props}
            />

            <ProtectedRoute
              path={`${match.url}/menu`}
              component={Menu}
              roles={[
                userRole.superUser,
                userRole.admin,
                userRole.instituteDataentry,
                userRole.instituteManager,
                userRole.provinceSupervisor,
                userRole.provinceDataentry,
              ]}
              props={props}
            />

            <ProtectedRoute
              path={`${match.url}/students`}
              component={Students}
              roles={[
                userRole.superUser,
                userRole.admin,
                userRole.instituteDataentry,
                userRole.instituteManager,
                userRole.provinceSupervisor,
                userRole.provinceDataentry,
              ]}
              props={props}
            />

            <ProtectedRoute
              path={`${match.url}/dorms`}
              component={Dorms}
              roles={[
                userRole.admin,
                userRole.dormManager,
                userRole.provinceSupervisor,
                userRole.provinceDataentry,
              ]}
              props={props}
            />

            <ProtectedRoute
              path={`${match.url}/teachers`}
              component={Teachers}
              roles={[
                userRole.superUser,
                userRole.admin,
                userRole.instituteDataentry,
                userRole.instituteManager,
                userRole.provinceSupervisor,
                userRole.provinceDataentry,
              ]}
              props={props}
            />

            <ProtectedRoute
              path={`${match.url}/institutes`}
              component={Institutes}
              roles={[
                userRole.superUser,
                userRole.admin,
                userRole.instituteDataentry,
                userRole.instituteManager,
                userRole.provinceSupervisor,
                userRole.provinceDataentry,
              ]}
              props={props}
            />

            <ProtectedRoute
              path={`${match.url}/subjects`}
              component={Subjects}
              roles={[
                userRole.superUser,
                userRole.admin,
                userRole.instituteDataentry,
                userRole.instituteManager,
                userRole.provinceSupervisor,
                userRole.provinceDataentry,
              ]}
              props={props}
            />

            <ProtectedRoute
              path={`${match.url}/classes`}
              component={Classes}
              roles={[
                userRole.superUser,
                userRole.admin,
                userRole.instituteDataentry,
                userRole.instituteManager,
                userRole.provinceSupervisor,
                userRole.provinceDataentry,
              ]}
              props={props}
            />

            <ProtectedRoute
              path={`${match.url}/fields`}
              component={Fields}
              roles={[
                userRole.superUser,
                userRole.admin,
                userRole.instituteDataentry,
                userRole.instituteManager,
                userRole.provinceSupervisor,
                userRole.provinceDataentry,
              ]}
              props={props}
            />

            <ProtectedRoute
              path={`${match.url}/evaluations`}
              component={Evaluations}
              roles={[
                userRole.superUser,
                userRole.admin,
                userRole.instituteDataentry,
                userRole.instituteManager,
                userRole.provinceSupervisor,
                userRole.provinceDataentry,
              ]}
              props={props}
            />
            <ProtectedRoute
              path={`${match.url}/workshops`}
              component={Workshops}
              roles={[
                userRole.superUser,
                userRole.admin,
                userRole.instituteDataentry,
                userRole.instituteManager,
                userRole.provinceSupervisor,
                userRole.provinceDataentry,
              ]}
              props={props}
            />
            <ProtectedRoute
              path={`${match.url}/needs`}
              component={Needs}
              roles={[
                userRole.superUser,
                userRole.admin,
                userRole.instituteDataentry,
                userRole.instituteManager,
                userRole.provinceSupervisor,
                userRole.provinceDataentry,
              ]}
              props={props}
            />

            <ProtectedRoute
              path={`${match.url}/hr-evaluations`}
              component={HREvaluations}
              roles={[
                userRole.superUser,
                userRole.admin,
                userRole.instituteDataentry,
                userRole.instituteManager,
                userRole.provinceSupervisor,
                userRole.provinceDataentry,
              ]}
              props={props}
            />

            <ProtectedRoute
              path={`${match.url}/black-page`}
              component={BlankPage}
              roles={[
                userRole.superUser,
                userRole.admin,
                userRole.instituteDataentry,
                userRole.instituteManager,
                userRole.provinceSupervisor,
                userRole.provinceDataentry,
              ]}
              props={props}
            />

            <ProtectedRoute
              path={`${match.url}/workers`}
              component={Workers}
              roles={[
                userRole.superUser,
                userRole.admin,
                userRole.instituteDataentry,
                userRole.instituteManager,
                userRole.provinceSupervisor,
                userRole.provinceDataentry,
              ]}
              props={props}
            />

            <ProtectedRoute
              path={`${match.url}/groups`}
              component={Groups}
              roles={[
                userRole.superUser,
                userRole.admin,
                userRole.instituteDataentry,
                userRole.instituteManager,
                userRole.provinceSupervisor,
                userRole.provinceDataentry,
              ]}
              props={props}
            />

            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
    </AppLayout>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
