import { NavLink } from 'react-router-dom';
import Register from './register';
const Random = () => {
  return (
    <NavLink to={'/app/students/register'} style={{ width: '10%' }}>
      <div>
        <Register />
      </div>
    </NavLink>
  );
};

export default Random;
