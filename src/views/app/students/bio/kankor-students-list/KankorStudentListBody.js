import React from 'react';
import { Card, CustomInput, Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from 'components/common/CustomBootstrap';
import { BsPencilSquare } from 'react-icons/bs';
import { BsTrashFill } from 'react-icons/bs';

const KankorStudentListBody = ({ student, isSelect, collect, onCheckItem }) => {
  return (
    <Colxx xxs="12" key={student.id} className="mt-2">
      <ContextMenuTrigger id="menu_id" data={student.id} collect={collect}>
        <Card
          onClick={(event) => onCheckItem(event, student.id)}
          className={classnames('d-flex flex-row', {
            active: isSelect,
          })}
        >
          <div
            className="pl-2 d-flex flex-grow-1 min-width-zero"
            style={{ maxHeight: '50px', width: '100%' }}
          >
            <div
              className="py-3 card-body align-self-center d-flex flex-column flex-lg-row min-width-zero align-items-lg-center "
              style={{ width: '100%' }}
            >
              <p
                className="mb-1 text-small"
                style={{ width: '12%', textAlign: 'right', fontSize: '20px' }}
              >
                {student.id}
              </p>

              <p
                className="list-item-heading mb-1 truncate"
                style={{ width: '12%', textAlign: 'right', fontSize: '20px' }}
              >
                {student.id}
              </p>
              <NavLink
                to={`kankor-student/${student.id}`}
                style={{ width: '15%', fontSize: '20px' }}
              >
                <p
                  className="list-item-heading mb-1 truncate"
                  style={{ marginLeft: 5, fontSize: '20px' }}
                >
                  {student.name}
                </p>
              </NavLink>
              <p
                className="mb-1 text-small"
                style={{ width: '17%', textAlign: 'right', fontSize: '20px' }}
              >
                {student.institute.name}
              </p>
              <p
                className="mb-1 text-small"
                style={{ width: '14%', textAlign: 'right', fontSize: '20px' }}
              >
                {student.department.name}
              </p>
              <p
                className="mb-1 text-small"
                style={{ width: '12%', textAlign: 'right', fontSize: '20px' }}
              >
                {student.marks}
              </p>
              <p
                className="mb-1 text-small"
                style={{ width: '15%', textAlign: 'right', fontSize: '20px' }}
              >
                {student.educational_year}
              </p>
              <div
                style={{ display: 'flex', flexDirection: 'row' }}
                className="align-self-center pr-4"
              >
                {/*
                <NavLink
                  to={`/students/register-kankor/${student.id}`}
                  // style={{ width: '10%' }}
                >
                  <div>
                    <BsPencilSquare
                      outline
                      style={{ fontSize: '20px' }}
                      id="updateIcon"
                    />
                  </div>
                </NavLink>
                <div className="ml-2">
                  <BsTrashFill
                    id="deleteIcon"
                    outline
                    // onClick={() => setModalBasic(true)}
                    style={{ fontSize: '20px' }}
                  />
                </div>
              */}
              </div>
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

export default React.memo(KankorStudentListBody);
