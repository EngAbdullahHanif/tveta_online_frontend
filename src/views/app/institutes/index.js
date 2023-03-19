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
const Institues = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/institutes`} />
      <Route
        path={`${match.url}/institutes`}
        render={(props) => <InstituteList {...props} />}
      />
         <Route
        path={`${match.url}/promotion-demotion-list`}
        render={(props) => <PromotionDemotionList {...props} />}
      />

      <Route
        exact
        path={`${match.url}/register`}
        render={(props) => <InstituteRegister {...props} />}
      />
      <Route
        path={`${match.url}/register/:instituteId`}
        render={(props) => <InstituteRegister {...props} />}
      />
      <Route
        path={`${match.url}/institute-create`}
        render={(props) => <InstitueCreate {...props} />}
      />

      <Route
        path={`${match.url}/institute-upgrade`}
        render={(props) => <InstituteUpgrade {...props} />}
      />
      <Route
        path={`${match.url}/institute/:instituteId`}
        render={(props) => <InstituteProfile {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Institues;
