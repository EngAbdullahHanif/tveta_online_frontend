import React from 'react';
import { Card, CustomInput, Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from 'components/common/CustomBootstrap';

const DormListBody = ({ dormStudent, isSelect, collect, onCheckItem }) => {
  return (
    <Colxx xxs="12" key={dormStudent.id} className="mb-3">
      <ContextMenuTrigger id="menu_id" data={dormStudent.id} collect={collect}>
        <Card
          onClick={(event) => onCheckItem(event, dormStudent.id)}
          className={classnames('d-flex flex-row', {
            active: isSelect,
          })}
        >
          {/* <NavLink to={`?p=${dormStudent.id}`} className="d-flex">
            <img
              alt={dormStudent.title}
              src={dormStudent.img}
              className="list-thumbnail responsive border-0 card-img-left"
            />
          </NavLink> */}
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="py-3 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <NavLink to={`${dormStudent.student_id.student_id}`} className="">
                <p className="list-item-heading mb-1 truncate">
                  <span className="mr-5">
                    {dormStudent.student_id.student_id}
                  </span>
                  {dormStudent.student_id.name}
                </p>
              </NavLink>
              <p className="mb-1 text-small">{dormStudent.dorm_id.name}</p>
              <p className="mb-1 text-small">{dormStudent.educational_year}</p>
              {dormStudent.dorm_type == 1 ? (
                <p className="mb-1 text-small ">
                  <Badge color="primary" pill>
                    بدل عاشه
                  </Badge>
                </p>
              ) : (
                <p className="mb-1 text-small">
                  <Badge color="secondary" pill>
                    بدیل عاشه
                  </Badge>
                </p>
              )}
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(DormListBody);
