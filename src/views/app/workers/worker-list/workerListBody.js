import React from 'react';
import { Card, CustomInput, Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from 'components/common/CustomBootstrap';

const WorkerListBody = ({ worker, isSelect, collect, onCheckItem }) => {
  console.log('inside body', worker)
  return (
    <Colxx xxs="12" key={worker.workerId} className="mt-2">
      <ContextMenuTrigger id="menu_id" data={worker.workerId} collect={collect}>
        <Card
          onClick={(event) => onCheckItem(event, worker.workerId)}
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
              <NavLink to={`workers/${worker.workerId}`} style={{ width: '10%' }}>
                <p className="list-item-heading mb-1 truncate">{worker.workerId}</p>
              </NavLink>
              <NavLink to={`workers/${worker.workerId}`} style={{ width: '15%' }}>
                <p className="list-item-heading mb-1 truncate">
                 {worker.workerName}
                </p>
              </NavLink>
              <p
                className="mb-1 text-small"
                style={{ width: '15%', textAlign: 'right' }}
              >
              {worker.workerProvince}
              </p>
              <p
                className="mb-1 text-small"
                style={{ width: '15%', textAlign: 'right' }}
              >
                {worker.workerPosition}
              </p>
              <p
                className="mb-1 text-small"
                style={{ width: '15%', textAlign: 'right' }}
              >
                {worker.workerGradeType}
              </p>
              <p
                className="mb-1 text-small"
                style={{ width: '15%', textAlign: 'right' }}
              >
                {`${worker.workerStep}-${worker.workerGrade}`}
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

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(WorkerListBody);
