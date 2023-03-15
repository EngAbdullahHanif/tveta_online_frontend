import React, { useState } from 'react';
import {
  Card,
  CustomInput,
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import IntlMessages from 'helpers/IntlMessages';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from 'components/common/CustomBootstrap';
import { BsTrashFill } from 'react-icons/bs';
import { BsPencilSquare } from 'react-icons/bs';

const EvaluationListBody = ({ evaluation, isSelect, collect, onCheckItem }) => {
  const [modalBasic, setModalBasic] = useState(false);
  const [dataDeletion, setDeletion] = useState(false);

  const handleClick = (event) => {
    setDeletion(event);
    console.log('API should be called here');
  };
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
          <div
            className="pl-2 d-flex flex-grow-1 min-width-zero "
            style={{ maxHeight: '50px', width: '100%' }}
          >
            <div
              className="card-body align-self-center d-flex flex-column flex-lg-row min-width-zero align-items-lg-center "
              style={{ width: '100%' }}
            >
              <NavLink to={`${evaluation.id}`} style={{ width: '10%' }}>
                <p className="list-item-heading mb-1 truncate">
                  {evaluation.id}
                </p>
              </NavLink>
              <NavLink
                to={`teacher/${evaluation.teacher_id.name}`}
                style={{ width: '15%' }}
              >
                <p className="list-item-heading mb-1 truncate">
                  {evaluation.teacher_id.name}
                </p>
              </NavLink>

              <p
                className="mb-1 text-small"
                style={{ width: '15%', textAlign: 'right' }}
              >
                {evaluation.institute_id.name}
              </p>
              <p
                className="mb-1 text-small"
                style={{ width: '15%', textAlign: 'right' }}
              >
                {evaluation.department_id.filed.name}
              </p>
              <p
                className="mb-1 text-small"
                style={{ width: '15%', textAlign: 'right' }}
              >
                {evaluation.department_id.name}
              </p>
              <p
                className="mb-1 text-small"
                style={{ width: '15%', textAlign: 'right' }}
              >
                {evaluation.class_id.name}
              </p>
              <p
                className="mb-1 text-small"
                style={{ width: '15%', textAlign: 'right' }}
              >
                {evaluation.subject_id.name}
              </p>
              <p
                className="mb-1 text-small"
                style={{ width: '15%', textAlign: 'right' }}
              >
                {evaluation.score}
              </p>
              <p
                className="mb-1 text-small"
                style={{ width: '15%', textAlign: 'right' }}
              >
                {evaluation.evaluation_date}
              </p>
            </div>
            <>
              <div
                style={{ display: 'flex', flexDirection: 'row' }}
                className="align-self-center pr-4"
              >
                <div>
                  <BsPencilSquare
                    outline
                    style={{ fontSize: '20px' }}
                    id="updateIcon"
                  />
                </div>
                <div className="ml-2">
                  <BsTrashFill
                    id="deleteIcon"
                    outline
                    onClick={() => setModalBasic(true)}
                    style={{ fontSize: '20px' }}
                  />
                </div>
              </div>
              <Modal
                isOpen={modalBasic}
                toggle={() => setModalBasic(!modalBasic)}
                style={{ marginTop: '10%' }}
              >
                <ModalHeader>
                  <IntlMessages id="modal.deletion-message-title" />
                </ModalHeader>
                <ModalBody className="text-center">
                  <IntlMessages id="modal.deletion-message-details" />
                </ModalBody>
                <ModalFooter>
                  <Button
                    onClick={() => setModalBasic(false)}
                    style={{ marginLeft: '55%' }}
                  >
                    نه/ نخیر
                  </Button>
                  <Button
                    color="danger"
                    onClick={() => {
                      setModalBasic(false);
                      handleClick(true);
                    }}
                    style={{ marginLeft: '5%' }}
                  >
                    هو / بلی
                  </Button>{' '}
                </ModalFooter>
              </Modal>{' '}
            </>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(EvaluationListBody);
