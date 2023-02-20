import React from 'react';
import { Card, CustomInput, Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from 'components/common/CustomBootstrap';

const DepartmentListBody = ({ department, isSelect, collect, onCheckItem }) => {
  console.log('inside body', department)
  return (
    <Colxx xxs="12" key={department.departmentId} className="mt-2">
      <ContextMenuTrigger id="menu_id" data={department.departmentId} collect={collect}>
        <Card
          onClick={(event) => onCheckItem(event, department.departmentId)}
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
              style={{ width: '100%' }}
            >
              <NavLink to={`departments/${department.departmentId}`} style={{ width: '25%' }}>
                <p className="list-item-heading mb-1 truncate">{department.departmentId}</p>
              </NavLink>
             
              <p
                className="mb-1 text-small"
                style={{ width: '26%', textAlign: 'right' }}
              >
              {department.departmentField}
              </p>
              <p
                className="mb-1 text-small"
                style={{ width: '25%', textAlign: 'right' }}
              >
                {department.departmentName}
              </p>
              <p
                className="mb-1 text-small"
                style={{ width: '15%', textAlign: 'right' }}
              >
                {department.departmentEnglishName}
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
