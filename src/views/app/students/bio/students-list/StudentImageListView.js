import React from 'react';
import {
  Row,
  Card,
  CardBody,
  CardSubtitle,
  CardImg,
  Badge,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from 'components/common/CustomBootstrap';

const ImageListView = ({ student, isSelect, collect, onCheckItem }) => {
  return (
    <Colxx sm="6" lg="4" xl="3" className="mb-3" key={student.student_id}>
      <ContextMenuTrigger id="menu_id" data={student.id} collect={collect}>
        <Card
          onClick={(event) => onCheckItem(event, student.student_id)}
          className={classnames({
            active: isSelect,
          })}
        >
          <div className="position-relative">
            <NavLink to={`?p=${student.student_id}`} className="w-40 w-sm-100">
              <CardImg top alt={student.name} src={student.student_photo}  style={{height:'200px'}}/>
            </NavLink>
           
             {student.graduat_14_types === '1' ? (
                <div className="position-absolute badge-top-left">
                  <Badge color="success" pill>
                    فارغ التحصیل
                  </Badge>
                </div>
              ) : student.graduat_14_types == '3' ? (
                <div className="position-absolute badge-top-left">
                  <Badge color="danger" pill>
                    منفک
                  </Badge>
                </div>
              ) : (
                <div className="position-absolute badge-top-left">
                  <Badge color="warning" pill>
                    جاری
                  </Badge>
                </div>
              )}
          </div>
          <CardBody style={{height:'130px'}}>
            <Row>
              <Colxx xxs="2">
                {/* <CustomInput
                  className="item-check mb-0"
                  type="checkbox"
                  id={`check_${student.student_id}`}
                  checked={isSelect}
                  onChange={() => {}}
                  label=""
                /> */}
              </Colxx>
              <Colxx xxs="10" className="mb-3" >
                <CardSubtitle style={{fontSize:'20px'}}>{student.student_id}</CardSubtitle>
                <CardSubtitle style={{fontSize:'20px'}}>{student.name}</CardSubtitle>
              </Colxx>
            </Row>
          </CardBody>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(ImageListView);
