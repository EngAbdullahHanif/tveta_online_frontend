import React, { useState, useEffect } from 'react';
import './../dorms/dorm-register.css';
import { useParams } from 'react-router-dom';
import callApi from 'helpers/callApi';

import * as Yup from 'yup';

import IntlMessages from 'helpers/IntlMessages';
import { Separator } from 'components/common/CustomBootstrap';
import config from '../../../config';

import { useContext } from 'react';
import { AuthContext } from 'context/AuthContext';

const servicePath = config.API_URL;
const instituteApiUrl = `${servicePath}/institute/institute-teachers-students-statistics`;

const PrintScreen = (values) => {
  const { departments, classes: classs, institutes } = useContext(AuthContext);
  const [isNext, setIsNext] = useState(true);
  const { instituteId } = useParams();
  const [institute, setInstitute] = useState([]);
  const [instituteStatistics, setInstituteStatistics] = useState([]);
  // const [departments, setDepartments] = useState([]);
  const [instDepartments, setInstDepartments] = useState([]);
  const [InstDepClasses, setInstDepClasses] = useState([]);

  const schemaValidation = Yup.object().shape({
    class: Yup.object()
      .shape({
        value: Yup.string().required(),
      })
      .nullable()
      .required(<IntlMessages id="marks.ClassErr" />),

    department: Yup.object()
      .shape({
        value: Yup.string().required(),
      })
      .nullable()
      .required(<IntlMessages id="teacher.departmentIdErr" />),
  });
  const fetchInstDepts = async () => {
    await callApi(`institute/${instituteId}/departments/`).then((inst) => {
      console.log('Institutes Departments: ', inst.data);
      const newOptions = departments.filter((dep) => {
        // if department id is in data.department
        let department_ids = inst.data.reduce(
          (acc, cur, i) => acc.add(cur.department),
          new Set(),
        );
        console.log(department_ids);
        return department_ids.has(dep.value);
      });
      const new2Options = newOptions.map((op) => {
        op.instDeps = inst.data.filter(
          (instdep) => instdep.department === op.value,
        )[0];
        return op;
      });
      setInstDepClasses(inst.data);
      console.log('new2Options', new2Options);
      setInstDepartments(new2Options);
    });
  };

  async function fetchInstituteInformation() {
    const instituteResponse = await callApi(
      `institute/?institute=${instituteId}`,
      '',
      null,
    );
    if (instituteResponse.data && instituteResponse.status === 200) {
      const instituteData = await instituteResponse.data;
      console.log('instituteData', instituteData);
      setInstitute(instituteData);
    }

    const instituteStatisticsResponse = await callApi(
      `reports/institutes/${instituteId}/teacher-students/`,
      '',
      null,
    );
    if (
      instituteStatisticsResponse.data &&
      instituteStatisticsResponse.status === 200
    ) {
      const instituteStatisticsData = await instituteStatisticsResponse.data;
      setInstituteStatistics(instituteStatisticsData);
    }
  }

  async function fetchData() {
    await fetchInstDepts();
    await fetchInstituteInformation();
    printScreen();
  }
  const printScreen = () => {
    window.print();
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h2 className="mt-5 m-3">
        {<IntlMessages id="institute.detailsTitle" />}
      </h2>
      <h1>{institutes.find((op) => op.value == instituteId)?.label}</h1>
      <Separator className="mb-5" />

      {instituteStatistics && (
        <div>
          <div style={{ display: 'flex' }}>
            <div style={{ width: 300, height: 300 }}>
              <div>
                <div className="text-center">
                  <h1>
                    <IntlMessages id="institute.totalStudents" />
                  </h1>

                  <div className="">
                    <div>
                      <h2>
                        <IntlMessages id="institute.totalStudentsMale" />
                      </h2>
                      <h2>
                        {instituteStatistics.male_students_12 +
                          instituteStatistics.male_students_14}
                      </h2>
                    </div>
                    <div>
                      <h2>
                        <IntlMessages id="institute.totalStudentsFemale" />
                      </h2>
                      <h2>
                        {instituteStatistics.female_students_12 +
                          instituteStatistics.female_students_14}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ width: 300, height: 300 }}>
              <div>
                <div className="text-center">
                  <h1>
                    <IntlMessages id="institute.totalTeachers" />
                  </h1>

                  <div className="">
                    <div>
                      <h2>
                        {' '}
                        <IntlMessages id="institute.totalStudentsMale" />
                      </h2>
                      <p>{instituteStatistics.male_teachers}</p>
                    </div>
                    <div>
                      <h2>
                        <IntlMessages id="institute.totalStudentsFemale" />
                      </h2>
                      <p>{instituteStatistics.female_teachers}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ width: 300, height: 300 }}>
              <div>
                <div className="text-center">
                  <h1>
                    <IntlMessages id="institute.Greduated_12" />
                  </h1>

                  <div className="">
                    <div>
                      <h2>
                        {' '}
                        <IntlMessages id="institute.totalStudentsMale" />
                      </h2>
                      <p>{instituteStatistics.male_students_12}</p>
                    </div>
                    <div>
                      <h2>
                        <IntlMessages id="institute.totalStudentsFemale" />
                      </h2>
                      <p>{instituteStatistics.female_students_12}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ width: 300, height: 300 }}>
              <div>
                <div className="text-center">
                  <h1>
                    <IntlMessages id="institute.Greduated_14" />
                  </h1>

                  <div className="">
                    <div>
                      <h2>
                        {' '}
                        <IntlMessages id="institute.totalStudentsMale" />
                      </h2>
                      <p>{instituteStatistics.male_students_14}</p>
                    </div>
                    <div>
                      <h2>
                        <IntlMessages id="institute.totalStudentsFemale" />
                      </h2>
                      <p>{instituteStatistics.female_students_14}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ width: 300, height: 300 }}>
            <div>
              <div className="text-center">
                <h1>
                  <IntlMessages id="institute.totalDepartments" />
                </h1>

                <div className="d-block">
                  {console.log('DEPTS', instDepartments)}
                  {departments &&
                    instDepartments?.map((item) => {
                      return (
                        <div key={item.value}>
                          <h2>
                            <strong>{item?.label}</strong>
                          </h2>

                          {item.instDeps.classes.map((cl) => {
                            return (
                              <h2 key={cl.classs}>
                                {
                                  classs.find((cls) => cls.value === cl.classs)
                                    ?.label
                                }
                              </h2>
                            );
                          })}
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>

            <br />
          </div>
        </div>
      )}
    </>
  );
};

export default PrintScreen;
