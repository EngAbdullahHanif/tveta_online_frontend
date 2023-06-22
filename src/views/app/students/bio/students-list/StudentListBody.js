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
import callApi from 'helpers/callApi';

import { BsTrashFill } from 'react-icons/bs';
import { BsPencilSquare } from 'react-icons/bs';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from 'components/common/CustomBootstrap';

const StudentListBody = (
  { student, isSelect, collect, onCheckItem },
  props
) => {
  const [modalBasic, setModalBasic] = useState(false);
  const [Deletion, setDeletion] = useState(false);

  const handleClick = async (event, student_id) => {
    console.log(student_id, 'student_id');
    const response = await callApi(
      `api/student_delete/${student_id}/`,
      'patch',
      null
    );
    if (response.data && response.status === 200) {
      setDeletion(event);
      const deletedStudent = student.student_id;
    } else {
      console.log('student delete error');
    }
  };
  return (
    <Colxx xxs="12" key={student.id} className="mb-3">
      <ContextMenuTrigger id="menu_id" data={student.id} collect={collect}>
        <Card
          onClick={(event) => onCheckItem(event, student.id)}
          className={classnames('d-flex flex-row', {
            active: isSelect,
          })}
        >
          {/* <NavLink to={`?p=${student.id}`} className="d-flex">
            <img
              alt={student.title}
              src={student.img}
              className="list-thumbnail responsive border-0 card-img-left"
            />
          </NavLink> */}
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div
              className="py-3 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
              style={{ width: '100%' }}
            >
              {/* send this to localhost/students/:id */}

              <NavLink
                to={`student/${student.student_id}`}
                style={{ width: '10%' }}
              >
                <p
                  className="list-item-heading mb-1 truncate"
                  style={{ fontSize: '20px', marginInline: '-7px' }}
                >
                  {student.student_id}
                </p>
              </NavLink>
              <NavLink
                to={`student/${student.student_id}`}
                style={{ width: '15%' }}
              >
                <p
                  className="list-item-heading mb-1 truncate"
                  style={{ fontSize: '20px' }}
                >
                  {student.name}
                </p>
              </NavLink>

              <p
                className="mb-1 text-small"
                style={{ width: '15%', textAlign: 'right', fontSize: '20px' }}
              >
                {student.father_name}
              </p>

              <p
                className="mb-1 text-small"
                style={{ width: '15%', textAlign: 'right', fontSize: '20px' }}
              >
                {student.current_province}
              </p>

              <p
                className="mb-1 text-small"
                style={{ width: '15%', fontSize: '20px', textAlign: 'right' }}
              >
                {student.phone_number}
              </p>

              {/* UN COMMINT IT WHEN THE API IS COMPLETED */}
              {/* <p className="mb-1 text-small">{student.class}</p>
              <p className="mb-1 text-small">{student.department}</p>
              <p className="mb-1 text-small">{student.institute}</p> */}

              {/* <p className="mb-1 text-small">{student.internse_type}</p> */}
              {student.internse_type === 1 ? (
                <p
                  className="mb-1 text-small"
                  style={{ width: '15%', textAlign: 'right', fontSize: '20px' }}
                >
                  حکمی
                </p>
              ) : student.internse_type === 2 ? (
                <p
                  className="mb-1 text-small"
                  style={{ width: '15%', textAlign: 'right', fontSize: '20px' }}
                >
                  کانکور اختصاصی
                </p>
              ) : (
                <p
                  className="mb-1 text-small"
                  style={{ width: '15%', textAlign: 'right', fontSize: '20px' }}
                >
                  کانکور تحصیلات عالی
                </p>
              )}

              {student.graduat_14_types === '1' ? (
                <div
                  className="mb-1 text-small "
                  style={{ fontSize: '20px', width: '15%' }}
                >
                  <Badge color="success" pill>
                    فارغ التحصیل
                  </Badge>
                </div>
              ) : student.graduat_14_types == '3' ? (
                <div
                  className="mb-1 text-small"
                  style={{ fontSize: '20px', width: '10%' }}
                >
                  <Badge color="danger" pill>
                    منفک
                  </Badge>
                </div>
              ) : (
                <div
                  className="mb-1 text-small"
                  style={{ fontSize: '20px', width: '10%' }}
                >
                  <Badge color="warning" pill>
                    جاری
                  </Badge>
                </div>
              )}
            </div>
            <>
              {/* the update and delete buttons */}
              <div
                style={{ display: 'flex', flexDirection: 'row' }}
                className="align-self-center pr-4"
              >
                <NavLink
                  to={`/app/students/register/${student.student_id}`}
                  // style={{ width: '10%' }}
                >
                  <div>
                    <BsPencilSquare
                      outline
                      style={{ fontSize: '20px' }}
                      id="updateIcon"
                    />
                  </div>
                </NavLink>
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
                      handleClick(true, student.student_id);
                    }}
                    style={{ marginLeft: '5%' }}
                  >
                    هو / بلی
                  </Button>{' '}
                </ModalFooter>
              </Modal>{' '}
            </>
            {/* <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
              <CustomInput
                className="item-check mb-0"
                type="checkbox"
                id={`check_${student.id}`}
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
export default React.memo(StudentListBody);
