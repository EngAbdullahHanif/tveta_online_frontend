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
import IntlMessages from 'helpers/IntlMessages';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from 'components/common/CustomBootstrap';
import { BsTrashFill } from 'react-icons/bs';
import { BsPencilSquare } from 'react-icons/bs';

const DormListBody = ({ dormStudent, isSelect, collect, onCheckItem }) => {
  const [modalBasic, setModalBasic] = useState(false);
  const [dataDeletion, setDeletion] = useState(false);

  const handleClick = (event) => {
    setDeletion(event);
    console.log('API should be called here');
  };
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
            <div
              className="py-3 card-body align-self-center d-flex flex-column flex-lg-row  min-width-zero align-items-lg-center"
              style={{ width: '100%' }}
            >
              <NavLink
                to={`${dormStudent.student.student_id}`}
                style={{ width: '10%', fontSize: '20px' }}
              >
                <p
                  className="list-item-heading mb-1 truncate"
                  style={{ fontSize: '20px' }}
                >
                  <span className="mr-5">{dormStudent.student.student_id}</span>
                </p>
              </NavLink>
              <NavLink
                to={`${dormStudent.student.student_id}`}
                style={{ width: '15%', fontSize: '20px' }}
              >
                <p
                  className="list-item-heading mb-1 truncate"
                  style={{ fontSize: '20px' }}
                >
                  {dormStudent.student.name}
                </p>
              </NavLink>

              <p
                className="mb-1 text-small"
                style={{ width: '15%', fontSize: '20px' }}
              >
                {dormStudent.dorm.province}
              </p>
              <p
                className="mb-1 text-small"
                style={{ width: '17%', fontSize: '20px' }}
              >
                {dormStudent.dorm.name}
              </p>
              <p
                className="mb-1 text-small"
                style={{ width: '9%', fontSize: '20px' }}
              >
                {dormStudent.educational_year}
              </p>
              {dormStudent.dorm_type == 'in_dorm' ? (
                <p
                  className="mb-1 text-small "
                  style={{ width: '13%', fontSize: '18px' }}
                >
                  <Badge color="primary" pill>
                    بدل عاشه
                  </Badge>
                </p>
              ) : (
                <p
                  className="mb-1 text-small"
                  style={{ width: '15%', fontSize: '18px' }}
                >
                  <Badge color="secondary" pill>
                    بدیل عاشه
                  </Badge>
                </p>
              )}

              {/* Status */}
              {dormStudent.status == 'active' ? (
                <p
                  className="mb-1 text-small "
                  style={{ width: '15%', fontSize: '18px' }}
                >
                  <Badge color="primary" pill>
                    <IntlMessages id="forms.StudyTypeInrolled" />
                  </Badge>
                </p>
              ) : (
                <p
                  className="mb-1 text-small"
                  style={{ width: '15%', fontSize: '18px' }}
                >
                  <Badge color="danger" pill>
                    <IntlMessages id="forms.StudyTypeDismissed" />
                  </Badge>
                </p>
              )}
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
export default React.memo(DormListBody);
