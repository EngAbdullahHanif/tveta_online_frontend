import React from 'react';
import { Card, CustomInput, Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from 'components/common/CustomBootstrap';

const DormListBody = ({ dorm, isSelect, collect, onCheckItem }) => {
  return (
    <Colxx xxs="12" key={dorm.id} className="mb-3">
      <ContextMenuTrigger id="menu_id" data={dorm.id} collect={collect}>
        <Card
          onClick={(event) => onCheckItem(event, dorm.id)}
          className={classnames('d-flex flex-row', {
            active: isSelect,
          })}
        >
          {/* <NavLink to={`?p=${dorm.id}`} className="d-flex">
            <img
              alt={dorm.title}
              src={dorm.img}
              className="list-thumbnail responsive border-0 card-img-left"
            />
          </NavLink> */}
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <NavLink to={`${dorm.id}`} className="">
                <p className="list-item-heading mb-1 truncate">
                  <span className="mr-5">{dorm.id}</span>
                  {dorm.name}
                </p>
              </NavLink>
              <p className="mb-1 text-small">{dorm.provence}</p>
              <p className="mb-1 text-small">{dorm.district}</p>
              <p className="mb-1 text-small">{dorm.dorm_capacity}</p>
              <p className="mb-1 text-small">{dorm.dorm_quota}</p>
              <p className="mb-1 text-small">{dorm.dorm_type}</p>
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(DormListBody);
