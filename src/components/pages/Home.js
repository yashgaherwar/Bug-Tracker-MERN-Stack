import React, { useContext, useEffect } from 'react';
import Bugs from '../bugs/Bugs';
import BugForm from '../bugs/BugForm';
import BugFilter from '../bugs/BugFilter';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='grid-2'>
      <div>
        <BugForm />
      </div>
      <div>
        <BugFilter />
        <Bugs />
      </div>
    </div>
  );
};

export default Home;
