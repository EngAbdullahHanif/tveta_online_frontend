import React, { Suspense, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import AppLocale from './lang';
import ColorSwitcher from './components/common/ColorSwitcher';
import { NotificationContainer } from './components/common/react-notifications';
import { isMultiColorActive } from './constants/defaultValues';
import { getDirection, getCurrentUser } from './helpers/Utils';
import {
  AuthContext,
  ProvincesContext,
  DistrictsContext,
} from './context/AuthContext';
import Application from 'context/Application';
import Authentication from 'context/Authentication';
import callApi from 'helpers/callApi';

const App = ({ locale }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [provinces, setProvinces] = useState();
  const [districts, setDistricts] = useState();
  const [classes, setClasses] = useState();
  const [subjects, setSubjects] = useState();
  const [departments, setDepartments] = useState();
  const [institutes, setInstitutes] = useState();
  const [contextFields, setContextFields] = useState();
  const [options, setOptions] = useState({});
  const [isTokenValid, setIsTokenValid] = useState(false);

  const direction = getDirection();
  const currentAppLocale = AppLocale[locale];
  useEffect(() => {
    if (direction.isRtl) {
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    } else {
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
    }
  }, [direction]);

  const checkTokenValidity = async () => {
    setIsTokenValid(false);
    console.log('checking token validity');
    const token = localStorage.getItem('access_token');
    console.log('token is:', token);
    if (token) {
      const response = await callApi('auth/token/verify/', 'POST', {
        token: token,
      });
      if (!response) {
        console.log('cannot connect to server');
        return;
      }
      if (response.status >= 200 && response.status <= 299) {
        console.log('token is valid');
        setIsTokenValid(true);
      } else {
        setIsTokenValid(false);
        console.log('token is invalid. removing it from local storage');
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        setUser(null);
      }
    } else {
      localStorage.removeItem('user');
      setUser(null);
    }
  };

  const fetchProvinces = async () => {
    if (!user) return;
    const response = await callApi('core/provinces/', 'GET', null);
    if (response.data && response.status === 200) {
      const updatedData = await response.data.map((item) => ({
        value: item.id,
        label: item.native_name,
      }));

      setProvinces(updatedData);
      setOptions((prevOptions) => ({ ...prevOptions, provinces: updatedData }));
    } else {
      console.log('province error');
    }
  };

  const fetchDistricts = async (provinceId) => {
    if (!user) return;
    const response = await callApi(`core/districts/?province`, 'GET', null);
    if (response.data && response.status === 200) {
      const updatedData = await response.data.map((item) => ({
        value: item.id,
        label: item.native_name,
        province: item.province,
      }));
      setDistricts(updatedData);
    } else {
      console.log('district error');
    }
  };

  const fetchClasses = async (provinceId) => {
    if (!user) return;
    const response = await callApi(`institute/classs/`, 'GET', null);
    if (response.data && response.status === 200) {
      const updatedData = await response.data.map((item) => ({
        value: item.id,
        label: item.name + '-' + item.semester + '-' + item.section,
      }));
      setClasses(updatedData);
    } else {
      console.log('district error');
    }
  };

  const fetchSubjects = async (provinceId) => {
    if (!user) return;
    const response = await callApi(`institute/subject/`, 'GET', null);
    if (response.data && response.status === 200) {
      const updatedData = await response.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setSubjects(updatedData);
    } else {
      console.log('district error');
    }
  };

  const fetchDepartments = async (provinceId) => {
    if (!user) return;
    const response = await callApi(`institute/department/`, 'GET', null);
    if (response.data && response.status === 200) {
      const updatedData = await response.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setDepartments(updatedData);
    } else {
      console.log('district error');
    }
  };
  const fetchInstitutes = async (provinceId) => {
    const response = await callApi(`institute/`, 'GET', null);
    if (response.data && response.status === 200) {
      const updatedData = await response.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setInstitutes(updatedData);
      console.log('institues fetched in app.js: ', response.data);
    } else {
      console.log('institutes error');
    }
  };
  const fetchFields = async (provinceId) => {
    const response = await callApi(`institute/field/`, 'GET', null);
    if (response.data && response.status === 200) {
      const updatedData = await response.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setContextFields(updatedData);
    } else {
      console.log('district error');
    }
  };

  // check if token is still valid
  useEffect(async () => {
    checkTokenValidity();
  }, []);

  useEffect(async () => {
    if (!isTokenValid) {
      return;
    }
    fetchProvinces();
    fetchDistricts();
    fetchClasses();
    fetchSubjects();
    fetchDepartments();
    fetchInstitutes();
    fetchFields();
  }, [isTokenValid]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        provinces,
        districts,
        classes,
        subjects,
        departments,
        institutes,
        contextFields,
      }}
    >
      <ProvincesContext.Provider value={{ provinces }}>
        <DistrictsContext.Provider value={{ districts }}>
          <div className="h-100">
            <IntlProvider
              locale={currentAppLocale.locale}
              messages={currentAppLocale.messages}
            >
              <>
                <NotificationContainer />
                {isMultiColorActive && <ColorSwitcher />}
                <Suspense fallback={<div className="loading" />}>
                  <Router>
                    {!user ? <Authentication /> : <Application />}
                  </Router>
                </Suspense>
              </>
            </IntlProvider>
          </div>
        </DistrictsContext.Provider>
      </ProvincesContext.Provider>
    </AuthContext.Provider>
  );
};

const mapStateToProps = ({ authUser, settings }) => {
  // const { currentUser } = authUser;
  const currentUser = getCurrentUser();

  // const { currentUser } = '';

  const { locale } = settings;
  return { currentUser, locale };
};
const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(App);
