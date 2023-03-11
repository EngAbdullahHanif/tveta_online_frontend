import React from 'react';
import { Card, CustomInput, Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from 'components/common/CustomBootstrap';

const StudentListBody = ({ attendance, isSelect, collect, onCheckItem }) => {
  return (
    <Colxx xxs="12" key={attendance.id} className="mb-3">
      <ContextMenuTrigger id="menu_id" data={attendance.id} collect={collect}>
        <Card
          onClick={(event) => onCheckItem(event, attendance.id)}
          className={classnames('d-flex flex-row', {
            active: isSelect,
          })}
        >
          {/* <NavLink to={`?p=${attendance.id}`} className="d-flex">
            <img
              alt={attendance.title}
              src={attendance.img}
              className="list-thumbnail responsive border-0 card-img-left"
            />
          </NavLink> */}
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="py-3 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              {/* send this to localhost/attendances/:id */}

              <NavLink
                to={`attendance/${attendance.attendance_id}`}
                className=""
              >
                <p className="list-item-heading mb-1 truncate ">
                  <span className="mr-5">{attendance.attendance_id}</span>
                  {attendance.id}
                </p>
              </NavLink>
              <p
                style={{ marginRight: '20px' }}
                className="mb-1 text-small w-10 w-sm-100"
              >
                {attendance.student_id.name}
              </p>
              <p
                style={{ marginRight: '30px' }}
                className="mb-1 text-small w-10 w-sm-100"
              >
                {attendance.department_id.name}
              </p>
              <p
                style={{ marginRight: '30px' }}
                className="mb-1 text-small w-10 w-sm-100"
              >
                {attendance.institute_id.name}
              </p>
              <p
                style={{ marginRight: '10px' }}
                className="mb-1 text-small w-10 w-sm-100"
              >
                {attendance.Present_days}
              </p>
              <p className="mb-1 text-small w-10 w-sm-100">
                {attendance.appsent_days}
              </p>
              <p className="mb-1 text-small w-10 w-sm-100">
                {attendance.sikness_days}
              </p>
              <p className="mb-1 text-small w-10 w-sm-100">
                {attendance.educational_days}
              </p>
              <p className="mb-1 text-small w-10 w-sm-100">
                {attendance.educational_year}
              </p>
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(StudentListBody);
