import React from 'react';
import { Card, CustomInput, Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from 'components/common/CustomBootstrap';

const InstituteListBody = ({ classs, isSelect, collect, onCheckItem }) => {
  return (
    <Colxx xxs="12" key={classs.id} className="mb-3">
      <ContextMenuTrigger id="menu_id" data={classs.id} collect={collect}>
        <Card
          onClick={(event) => onCheckItem(event, classs.id)}
          className={classnames('d-flex flex-row', {
            active: isSelect,
          })}
        >
          {/* <NavLink to={`?p=${classs.id}`} className="d-flex">
            <img
              alt={classs.title}
              src={classs.img}
              className="list-thumbnail responsive border-0 card-img-left"
            />
          </NavLink> */}
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <NavLink to={`${classs.id}`} className="">
                <p className="list-item-heading mb-1 truncate">
                  <span className="mr-5">{classs.id}</span>
                  {classs.name}
                </p>
              </NavLink>
              <p className="mb-1 text-small">{classs.semester}</p>
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(InstituteListBody);
