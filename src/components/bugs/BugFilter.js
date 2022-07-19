import React, { useContext, useRef, useEffect } from 'react';
import BugContext from '../../context/bug/bugContext';

const BugFilter = () => {
  const bugContext = useContext(BugContext);
  const text = useRef('');
  const { filterBugs, clearFilter, filtered } = bugContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterBugs(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='Filter Bugs...'
        onChange={onChange}
      />
    </form>
  );
};

export default BugFilter;
