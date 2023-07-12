import React from 'react';
import { Card, CustomInput, Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from 'components/common/CustomBootstrap';

const StudentListBody = ({
  transferedStudents,
  isSelect,
  collect,
  onCheckItem,
  index,
}) => {
  return (
    <Colxx xxs="12" key={transferedStudents.id} className="mb-3">
      <ContextMenuTrigger
        id="menu_id"
        data={transferedStudents.id}
        collect={collect}
      >
        <Card
          onClick={(event) => onCheckItem(event, transferedStudents.id)}
          className={classnames('d-flex flex-row', {
            active: isSelect,
          })}
        >
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div
              className="py-3 card-body align-self-center d-flex flex-column flex-lg-row  min-width-zero align-items-lg-center"
              style={{ width: '100%' }}
            >
              {/* send this to localhost/transferedStudentss/:id */}
              <NavLink
                span
                style={{ width: '10%', fontSize: '20px' }}
                to={`transferedStudents/${transferedStudents.id}`}
              >
                <p
                  className="list-item-heading mb-1 truncate "
                  style={{ marginRight: '-8px', fontSize: '20px' }}
                >
                  {index + 1}
                </p>
              </NavLink>
              <p
                className="mb-1  w-9 w-sm-100"
                style={{ width: '10%', fontSize: '20px' }}
              >
                {transferedStudents.student.student_id}
              </p>
              <p
                className="mb-1 text-small w-9 w-sm-100"
                style={{ width: '15.4%', fontSize: '20px' }}
              >
                {transferedStudents.student.name}
              </p>

              <p
                className="mb-1  "
                style={{ width: '18.5%', fontSize: '20px' }}
              >
                {/* {transferedStudents.student_id.father_name} */}
                Integrate
              </p>

              <p style={{ width: '18%', fontSize: '20px' }} className="mb-1">
                {transferedStudents.institute.name}
              </p>
              <p
                style={{ marginLeft: '0px', fontSize: '20px' }}
                className="mb-1 text-small w-10 w-sm-100"
              >
                {transferedStudents.educational_year}
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
