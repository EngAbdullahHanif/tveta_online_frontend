import React from 'react';
import { Card, CustomInput, Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from 'components/common/CustomBootstrap';
import { province } from 'lang/locales/fa_IR';

const StudentListBody = ({
  dismissedStudents,
  isSelect,
  collect,
  onCheckItem,
}) => {
  return (
    <Colxx xxs="12" key={dismissedStudents.student_id} className="mb-3">
      <ContextMenuTrigger
        id="menu_id"
        data={dismissedStudents.student_id}
        collect={collect}
      >
        <Card
          onClick={(event) => onCheckItem(event, dismissedStudents.student_id)}
          className={classnames('d-flex flex-row', {
            active: isSelect,
          })}
        >
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="py-3 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              {/* send this to localhost/dismissedStudentss/:id */}

              <NavLink
                span
                style={{ width: '8%' }}
                to={`dismissedStudents/${dismissedStudents.student_id}`}
                className=""
              >
                <p className="list-item-heading mb-1 truncate ">
                  <span className="mr-4">{dismissedStudents.student_id}</span>
                  {dismissedStudents.student_id}
                </p>
              </NavLink>
              <p className="mb-1 text-small w-9 w-sm-100">
                {dismissedStudents.name}
              </p>
              <p className="mb-1 text-small w-9 w-sm-100">
                {dismissedStudents.gender}
              </p>
              <p className="mb-1 text-small w-10 w-sm-100">
                {dismissedStudents.father_name}
              </p>
              <p className="mb-1 text-small w-10 w-sm-100">
                {dismissedStudents.main_province}
              </p>
              <p
                style={{ marginLef: '0px' }}
                className="mb-1 text-small w-10 w-sm-100"
              >
                {dismissedStudents.school}
              </p>
              <p
                style={{ marginLeft: '0px' }}
                className="mb-1 text-small w-10 w-sm-100"
              >
                {dismissedStudents.phone_number}
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
