import React from 'react';
import { Card, CustomInput, Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from 'components/common/CustomBootstrap';

const KankorStudentListBody = ({ student, isSelect, collect, onCheckItem }) => {
  return (
    <Colxx xxs="12" key={student.kankorId} className="mt-2">
      <ContextMenuTrigger
        id="menu_id"
        data={student.kankorId}
        collect={collect}
      >
        <Card
          onClick={(event) => onCheckItem(event, student.kankorId)}
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
              <NavLink to={`students/${student.id}`} style={{ width: '10%' }}>
                <p className="list-item-heading mb-1 truncate">{student.id}</p>
              </NavLink>
              <NavLink to={`students/${student.id}`} style={{ width: '15%' }}>
                <p
                  className="list-item-heading mb-1 truncate"
                  style={{ marginLeft: 5 }}
                >
                  {student.name}
                </p>
              </NavLink>
              <p
                className="mb-1 text-small"
                style={{ width: '15%', textAlign: 'right' }}
              >
                {student.father_name}
              </p>
              <p
                className="mb-1 text-small"
                style={{ width: '15%', textAlign: 'right' }}
              >
                {student.Institute.name}
              </p>
              <p
                className="mb-1 text-small"
                style={{ width: '15%', textAlign: 'right' }}
              >
                {student.score}
              </p>
              <p
                className="mb-1 text-small"
                style={{ width: '15%', textAlign: 'right' }}
              >
                {student.department_id.name}
              </p>
              <p
                className="mb-1 text-small"
                style={{ width: '15%', textAlign: 'right' }}
              >
                {student.score}
              </p>
              <p
                className="mb-1 text-small"
                style={{ width: '15%', textAlign: 'right' }}
              >
                {student.field_id.name}
              </p>
              <p
                className="mb-1 text-small"
                style={{ width: '15%', textAlign: 'right' }}
              >
                {student.created_date}
              </p>
              {/* <p
                className="mb-1 text-small"
                style={{ width: '14%', textAlign: 'right' }}
              >
                {teacher.grade}
              </p>
              {teacher.status_type === '2' && (
                <div className="mb-1 text-small">
                  <Badge color="danger" pill>
                    منفک
                  </Badge>
                </div>
              )} */}
            </div>
            {/* <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
              <CustomInput
                className="item-check mb-0"
                type="checkbox"
                id={`check_${teacher.id}`}
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

export default React.memo(KankorStudentListBody);
