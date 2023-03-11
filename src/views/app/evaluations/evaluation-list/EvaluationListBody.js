import React from 'react';
import { Card, CustomInput, Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from 'components/common/CustomBootstrap';

const EvaluationListBody = ({ evaluation, isSelect, collect, onCheckItem }) => {
  return (
    <Colxx xxs="12" key={evaluation.id} className="mb-3">
      <ContextMenuTrigger id="menu_id" data={evaluation.id} collect={collect}>
        <Card
          onClick={(event) => onCheckItem(event, evaluation.id)}
          className={classnames('d-flex flex-row', {
            active: isSelect,
          })}
        >
          {/* <NavLink to={`?p=${evaluation.id}`} className="d-flex">
            <img
              alt={evaluation.title}
              src={evaluation.img}
              className="list-thumbnail responsive border-0 card-img-left"
            />
          </NavLink> */}
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="py-3 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <NavLink to={`${evaluation.id}`} className="">
                <p className="list-item-heading mb-1 truncate">
                  <span className="mr-5">{evaluation.id}</span>
                  {evaluation.teacher_id.name}
                </p>
              </NavLink>
              <p className="mb-1 text-small">{evaluation.institute_id.name}</p>
              <p className="mb-1 text-small">
                {evaluation.department_id.filed.name}
              </p>
              <p className="mb-1 text-small">{evaluation.department_id.name}</p>
              <p className="mb-1 text-small">{evaluation.class_id.name}</p>
              <p className="mb-1 text-small">{evaluation.subject_id.name}</p>
              <p className="mb-1 text-small">{evaluation.score}</p>
              <p className="mb-1 text-small">{evaluation.evaluation_date}</p>
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(EvaluationListBody);
