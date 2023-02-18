import React from 'react';
import { Card, CustomInput, Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from 'components/common/CustomBootstrap';

const TeacherListBody = ({ teacher, isSelect, collect, onCheckItem }) => {
  return (
    <Colxx xxs="12" key={teacher.id} className="mt-2">
      <ContextMenuTrigger id="menu_id" data={teacher.id} collect={collect}>
        <Card
          onClick={(event) => onCheckItem(event, teacher.id)}
          className={classnames('d-flex flex-row', {
            active: isSelect,
          })}
        >
          <div
            className="pl-2 d-flex flex-grow-1 min-width-zero"
            style={{ maxHeight: '50px', width: '100%' }}
          >
            <div
              className="card-body align-self-center d-flex flex-column flex-lg-row min-width-zero align-items-lg-center "
              style={{ width: '100%', paddingTop: 35 }}
            >
              <NavLink to={`teacher/${teacher.id}`} style={{ width: '10%' }}>
                <p className="list-item-heading mb-1 truncate">{teacher.id}</p>
              </NavLink>
              <NavLink to={`teacher/${teacher.id}`} style={{ width: '15%' }}>
                <p className="list-item-heading mb-1 truncate">
                  {teacher.name}
                </p>
              </NavLink>
              <p
                className="mb-1 text-small"
                style={{ width: '15%', textAlign: 'right',  }}
              >
                {teacher.father_name}
              </p>
              <p
                className="mb-1 text-small"
                style={{ width: '15%', textAlign: 'right' }}
              >
                {teacher.current_province}
              </p>
              <p
                className="mb-1 text-small"
                style={{ width: '15%', textAlign: 'right' }}
              >
                {teacher.phone_number}
              </p>
              <p
                className="mb-1 text-small"
                style={{ width: '15%', textAlign: 'right' }}
              >
                {teacher.major}
              </p>
              <p
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
              )}
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

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(TeacherListBody);
