import React from 'react';
import { Card } from 'reactstrap';
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

              <NavLink to={`attendance-list/${attendance.id}`} className="">
                <p
                  className="list-item-heading mb-1 truncate "
                  style={{ fontSize: 18 }}
                >
                  <span className="mr-5">{attendance.id}</span>
                </p>
              </NavLink>
              <p
                style={{ marginRight: '20px', fontSize: 18 }}
                className="mb-1 text-small w-10 w-sm-100"
              >
                {attendance.student.name}
              </p>
              <p
                style={{ marginRight: '30px', fontSize: 18 }}
                className="mb-1 text-small w-10 w-sm-100"
              >
                {attendance.department.name}
              </p>
              <p
                style={{ marginRight: '30px', fontSize: 18 }}
                className="mb-1 text-small w-10 w-sm-100"
              >
                {attendance.institute.name}
              </p>
              <p
                style={{ marginRight: '10px', fontSize: 18 }}
                className="mb-1 text-small w-10 w-sm-100"
              >
                {attendance.present_hours}
              </p>
              <p
                className="mb-1 text-small w-10 w-sm-100"
                style={{ fontSize: 18 }}
              >
                {attendance.absent_hours}
              </p>
              <p
                className="mb-1 text-small w-10 w-sm-100"
                style={{ fontSize: 18 }}
              >
                {attendance.sickness_hours}
              </p>
              {/* <p className="mb-1 text-small w-10 w-sm-100">
                {attendance.educational_days}
              </p> */}
              <p
                className="mb-1 text-small w-10 w-sm-100"
                style={{ fontSize: 18 }}
              >
                {attendance.educational_year}
              </p>
              <p
                className="mb-1 text-small w-10 w-sm-100"
                style={{ fontSize: 18 }}
              >
                {attendance.is_short_attendance ? 'محروم' : 'غیر محروم'}
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
