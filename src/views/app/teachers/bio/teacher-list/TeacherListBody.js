import React from 'react';
import { Card, CustomInput, Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from 'components/common/CustomBootstrap';

const TeacherListBody = ({ teacher, isSelect, collect, onCheckItem }) => {
  return (
    <Colxx xxs="12" key={teacher.id} className="mb-3">
      <ContextMenuTrigger id="menu_id" data={teacher.id} collect={collect}>
        <Card
          onClick={(event) => onCheckItem(event, teacher.id)}
          className={classnames('d-flex flex-row', {
            active: isSelect,
          })}
        >
          {/* <NavLink to={`?p=${teacher.id}`} className="d-flex">
            <img
              alt={teacher.title}
              src={teacher.img}
              className="list-thumbnail responsive border-0 card-img-left"
            />
          </NavLink> */}
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <NavLink to={`teacher/${teacher.id}`} className="">
                <p className="list-item-heading mb-1 truncate">
                  <span className="mr-5">{teacher.id}</span>
                  {teacher.name}
                </p>
              </NavLink>
              <p className="mb-1 text-small">{teacher.father_name}</p>
              <p className="mb-1 text-small">{teacher.current_province}</p>
              <p className="mb-1 text-small">{teacher.phone_number}</p>
              <p className="mb-1 text-small">{teacher.major}</p>
              <p className="mb-1 text-small">{teacher.grade}</p>
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
