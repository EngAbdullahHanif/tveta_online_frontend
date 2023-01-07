import React from 'react';
import { Card, CustomInput, Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from 'components/common/CustomBootstrap';

const StudentListBody = ({ student, isSelect, collect, onCheckItem }) => {
  return (
    <Colxx xxs="12" key={student.id} className="mb-3">
      <ContextMenuTrigger id="menu_id" data={student.id} collect={collect}>
        <Card
          onClick={(event) => onCheckItem(event, student.id)}
          className={classnames('d-flex flex-row', {
            active: isSelect,
          })}
        >
          {/* <NavLink to={`?p=${student.id}`} className="d-flex">
            <img
              alt={student.title}
              src={student.img}
              className="list-thumbnail responsive border-0 card-img-left"
            />
          </NavLink> */}
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              {/* send this to localhost/students/:id */}

              <NavLink to={`${student.student_id}`} className="">
                <p className="list-item-heading mb-1 truncate ">
                  <span className="mr-5">{student.student_id}</span>
                  {student.name}
                </p>
              </NavLink>
              <p className="mb-1 text-small w-10 w-sm-100">
                {student.father_name}
              </p>

              {/* UN COMMINT IT WHEN THE API IS COMPLETED */}
              {/* <p className="mb-1 text-small">{student.class}</p>
              <p className="mb-1 text-small">{student.department}</p>
              <p className="mb-1 text-small">{student.institute}</p> */}

              <p className="mb-1 text-small w-10 w-sm-100">
                {student.current_province}
              </p>
              {/* <p className="mb-1 text-small">{student.internse_type}</p> */}
              {student.internse_type === 1 ? (
                <p className="mb-1 text-small w-10 w-sm-100">حکمی</p>
              ) : student.internse_type === 2 ? (
                <p className="mb-1 text-small w-10 w-sm-100">کانکور اختصاصی</p>
              ) : (
                <p className="mb-1 text-small w-10 w-sm-100">
                  کانکور تحصیلات عالی
                </p>
              )}

              {student.graduat_14_types === '1' ? (
                <div className="mb-1 text-small ">
                  <Badge color="success" pill>
                    فارغ التحصیل
                  </Badge>
                </div>
              ) : student.graduat_14_types == '3' ? (
                <div className="mb-1 text-small">
                  <Badge color="danger" pill>
                    منفک
                  </Badge>
                </div>
              ) : (
                <div className="mb-1 text-small">
                  <Badge color="warning" pill>
                    جاری
                  </Badge>
                </div>
              )}
            </div>
            {/* <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
              <CustomInput
                className="item-check mb-0"
                type="checkbox"
                id={`check_${student.id}`}
                checked={isSelect}
                onChange={() => {}}
                label=""
              />
            </div> */}
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(StudentListBody);
