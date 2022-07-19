import React, { Fragment, useContext, useEffect } from 'react';
import Spinner from '../layout/Spinner';
import BugItem from './BugItem';
import BugContext from '../../context/bug/bugContext';
import axiosInstance from '../utils/axiosInstance';

const Bugs = () => {
  const bugContext = useContext(BugContext);

  const { bugs, filtered, getBugs, loading } = bugContext;

  useEffect(() => {
    console.log(axiosInstance.defaults.headers.common['x-auth-token'])
    getBugs();
    // eslint-disable-next-line
  }, []);

  if (bugs !== null && bugs.length === 0 && !loading) {
    return <h4>Please add a bug</h4>;
  }
  return (
    <Fragment>
      {bugs !== null && !loading ? (
        <Fragment>
          {filtered !== null
            ? filtered.map((bug) => <BugItem key={bug._id} bug={bug} />)
            : bugs
                .sort((a, b) => (a.priority > b.priority ? 1 : -1))
                .map((bug) => <BugItem key={bug._id} bug={bug} />)}
        </Fragment>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Bugs;
