import React, { Suspense, useEffect, useState } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { IntlProvider } from "react-intl";
import AppLocale from "./lang";
import ColorSwitcher from "./components/common/ColorSwitcher";
import { NotificationContainer } from "./components/common/react-notifications";
import { isMultiColorActive } from "./constants/defaultValues";
import { getDirection, getCurrentUser } from "./helpers/Utils";
import { AuthContext } from "./context/AuthContext";
import Application from "context/Application";
import Authentication from "context/Authentication";
const win = window.sessionStorage;
const App = ({ locale }) => {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const direction = getDirection();
  const currentAppLocale = AppLocale[locale];
  useEffect(() => {
    if (direction.isRtl) {
      document.body.classList.add("rtl");
      document.body.classList.remove("ltr");
    } else {
      document.body.classList.add("ltr");
      document.body.classList.remove("rtl");
    }
  }, [direction]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <div className="h-100">
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}
        >
          <>
            <NotificationContainer />
            {isMultiColorActive && <ColorSwitcher />}
            <Suspense fallback={<div className="loading" />}>
              <Router>{!user ? <Authentication /> : <Application />}</Router>
            </Suspense>
          </>
        </IntlProvider>
      </div>
    </AuthContext.Provider>
  );
};

const mapStateToProps = ({ authUser, settings }) => {
  // const { currentUser } = authUser;
  const { currentUser } = getCurrentUser();

  // const { currentUser } = '';

  const { locale } = settings;
  return { currentUser, locale };
};
const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(App);
