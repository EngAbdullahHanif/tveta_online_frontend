import { NavLink } from 'react-router-dom';
import Register from './students/bio/register';
const Random = () => {
  return (
    <NavLink to={'/app/students/register'}>
      <div>
        <Register />
      </div>
    </NavLink>
  );
};

export default Random;
