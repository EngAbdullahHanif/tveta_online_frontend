import React from 'react';
import { Card, CustomInput, Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from 'components/common/CustomBootstrap';

const DepartmentListBody = ({ department, isSelect, collect, onCheckItem }) => {
  console.log('inside body', department);
  return (
    <Colxx xxs="12" key={department.id} className="mt-2">
      <ContextMenuTrigger id="menu_id" data={department.id} collect={collect}>
        <Card
          onClick={(event) => onCheckItem(event, department.id)}
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
              <NavLink
                to={`departments/${department.id}`}
                style={{ width: '25%' }}
              >
                <p className="list-item-heading mb-1 truncate">
                  {/* {department.id} */}
                </p>
              </NavLink>

              <p
                className="mb-1 text-small"
                style={{ width: '26%', textAlign: 'right' }}
              >
                {department.filed.name}
              </p>
              <p
                className="mb-1 text-small"
                style={{ width: '25%', textAlign: 'right' }}
              >
                {department.name}
              </p>
              <p
                className="mb-1 text-small"
                style={{ width: '15%', textAlign: 'right' }}
              >
                {department.english_name}
              </p>
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(DepartmentListBody);
