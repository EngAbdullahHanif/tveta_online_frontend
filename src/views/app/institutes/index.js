import { userRole } from 'constants/defaultValues';
import { ProtectedRoute } from 'helpers/authHelper';
import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const InstituteList = React.lazy(() =>
  import(
    // /* webpackChunkName: "institue-list" */ './bio/institute-list/InstituteListMain'
    './institute-list/InstituteListMain'
  )
);
const PromotionDemotionList = React.lazy(() =>
  import(
    // /* webpackChunkName: "institue-list" */ './bio/institute-list/InstituteListMain'
    './promotion-demotion-list/PromotionDemortionListMain'
  )
);
const InstituteRegister = React.lazy(() => import('./institute-register.js'));

const InstitueCreate = React.lazy(() =>
  import(/* webpackChunkName: "institue-create" */ './institute-create')
);
const InstituteUpgrade = React.lazy(() =>
  import(/* webpackChunkName: "institute-upgrade" */ './institute-upgrade')
);
const InstituteProfile = React.lazy(() =>
  import(/* webpackChunkName: "institute-details" */ './institute-profile')
);
const Institues = ({ match, props }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/institutes`} />
      <ProtectedRoute
        path={`${match.url}/institutes`}
        component={InstituteList}
        roles={[
          userRole.superUser,
          userRole.admin,
          userRole.provincial,
          userRole.institute,
        ]}
        props={props}
      />
      <ProtectedRoute
        path={`${match.url}/promotion-demotion-list`}
        component={PromotionDemotionList}
        roles={[
          userRole.superUser,
          userRole.admin,
          userRole.provincial,
          userRole.institute,
        ]}
        props={props}
      />

      <ProtectedRoute
        exact
        path={`${match.url}/register`}
        component={InstituteRegister}
        roles={[
          userRole.superUser,
          userRole.admin,
          userRole.provincial,
          userRole.institute,
        ]}
        props={props}
      />
      <ProtectedRoute
        path={`${match.url}/register/:instituteId`}
        component={InstituteRegister}
        roles={[
          userRole.superUser,
          userRole.admin,
          userRole.provincial,
          userRole.institute,
        ]}
        props={props}
      />
      <ProtectedRoute
        path={`${match.url}/institute-create`}
        component={InstitueCreate}
        roles={[
          userRole.superUser,
          userRole.admin,
          userRole.provincial,
          userRole.institute,
        ]}
        props={props}
      />

      <ProtectedRoute
        path={`${match.url}/institute-upgrade`}
        component={InstituteUpgrade}
        roles={[
          userRole.superUser,
          userRole.admin,
          userRole.provincial,
          userRole.institute,
        ]}
        props={props}
      />
      <ProtectedRoute
        path={`${match.url}/institute/:instituteId`}
        component={InstituteProfile}
        roles={[
          userRole.superUser,
          userRole.admin,
          userRole.provincial,
          userRole.institute,
        ]}
        props={props}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Institues;
