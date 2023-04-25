import { NavLink } from 'react-router-dom';
import StudentRegister from './students/bio/register';
import TeacherRegister from './teachers/bio/teacher-register';

const Random = () => {
  return (
  <>
    <NavLink to={'/app/students/register'}>
      <div>
        <StudentRegister />
      </div>
    </NavLink>
      {/* <NavLink to={'/app/teachers/register'}>
      <div>
        <TeacherRegister />
      </div>
    </NavLink> */}
    </>
  );
};

export default Random;
