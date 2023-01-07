import React from 'react';
import { Card, CustomInput, Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from 'components/common/CustomBootstrap';

const KankorStudentListBody = ({ student, isSelect, collect, onCheckItem }) => {
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

              <NavLink to={`${student.id}`} className="">
                <p className="list-item-heading mb-1 truncate ">
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
                {student.Institute.name}
              </p>
              <p className="mb-1 text-small w-10 w-sm-100">
                {student.Institute.province}
              </p>
              <p className="mb-1 text-small w-10 w-sm-100">
                {student.department_id.name}
              </p>
              <p className="mb-1 text-small w-10 w-sm-100">{student.score}</p>
              <p className="mb-1 text-small ">{student.educational_year}</p>
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

export default React.memo(KankorStudentListBody);
