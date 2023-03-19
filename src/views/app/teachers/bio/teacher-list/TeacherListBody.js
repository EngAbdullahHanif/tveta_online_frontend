import React, { useState } from 'react';
import './list.css';
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

const TeacherListBody = ({ teacher, isSelect, collect, onCheckItem }) => {
  const [modalBasic, setModalBasic] = useState(false);
  const [dataDeletion, setDeletion] = useState(false);

  const handleClick = (event) => {
    setDeletion(event);
    console.log('API should be called here');
  };
  return (
    <Colxx xxs="12" key={teacher.id} className="mt-2">
      <ContextMenuTrigger id="menu_id" data={teacher.id} collect={collect}>
        <Card
          onClick={(event) => onCheckItem(event, teacher.id)}
          className={classnames('d-flex flex-row', {
            active: isSelect,
          })}
        >
          <div
            className="d-flex flex-grow-1 min-width-zero"
            style={{ maxHeight: '50px', width: '100%' }}
          >
            <div
              className=" py-3 card-body align-self-center d-flex flex-column flex-lg-row min-width-zero align-items-lg-center "
              style={{
                width: '100%',
              }}
            >
              <NavLink to={`teacher/${teacher.id}`} style={{ width: '10%' }}>
                <p className="list-item-heading mb-1 truncate ">{teacher.id}</p>
              </NavLink>
              <NavLink to={`teacher/${teacher.id}`} className="responsiveness">
                <p className="list-item-heading mb-1 truncate ">
                  {teacher.name}
                </p>
              </NavLink>
              <p
                className="mb-1 text-small"
                style={{ width: '15%', textAlign: 'right' }}
              >
                {teacher.father_name}
              </p>
              <p className="mb-1 text-small responsiveness1">
                {teacher.current_province}
              </p>
              <p className="mb-1 text-small responsiveness2">
                {teacher.phone_number}
              </p>
              <p className="mb-1 text-small responsiveness3">{teacher.major}</p>
              <p className="mb-1 text-small responsiveness4">{teacher.grade}</p>
              {teacher.status_type === '2' && (
                <div className="mb-1 text-small">
                  <Badge color="danger" pill>
                    منفک
                  </Badge>
                </div>
              )}
            </div>

            {/* Delete and update Icons */}
            <>
              <div
                style={{ display: 'flex', flexDirection: 'row' }}
                className="align-self-center pr-4"
              >
                <NavLink to={`/app/teachers/register/${teacher.id}`}>

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
                      handleClick(true);
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
export default React.memo(TeacherListBody);

const style1 = {
  maxWidth: '700px',
};
