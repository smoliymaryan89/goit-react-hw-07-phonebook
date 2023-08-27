import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/contacts/contactsSlice';
import { selectFilter } from 'redux/contacts/selectors';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const handleFilter = ({ target: { value } }) => {
    dispatch(setFilter(value));
  };

  return (
    <label>
      <p>Find contacts by name</p>
      <input type="text" value={filter} onChange={handleFilter} />
    </label>
  );
};

export default Filter;
