import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import BugContext from '../../context/bug/bugContext';

const BugItem = ({ bug }) => {
  const bugContext = useContext(BugContext);
  const { deleteBug, setCurrent, clearCurrent } = bugContext;

  const { _id, name, description, priority, status, location } = bug;

  const onDelete = () => {
    deleteBug(_id);
    clearCurrent();
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' + (priority === 'High' ? 'badge-danger' : 'badge-light')
          }
        >
          {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </span>
      </h3>
      <ul className='list'>
        <li>Status: {status}</li>
        <li>Location/File: {location}</li>
        <li>Notes: {description}</li>
      </ul>
      <div className='button-container'>
        <button
          style={{ marginRight: '1rem' }}
          className='btn btn-dark btn-sm'
          onClick={() => setCurrent(bug)}
        >
          Edit
        </button>
        <button
          style={{ float: 'right' }}
          className='btn btn-success btn-sm'
          onClick={onDelete}
        >
          Completed{' '}
          <i style={{ marginLeft: '0.5rem' }} className='fas fa-check'></i>
        </button>
      </div>
    </div>
  );
};

BugItem.propTypes = {
  bug: PropTypes.object.isRequired,
};

export default BugItem;
