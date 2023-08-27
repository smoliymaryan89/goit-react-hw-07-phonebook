import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/contacts/operations';
import { selectFilteredContacts } from 'redux/contacts/selectors';

const ContactList = () => {
  const dispatch = useDispatch();

  const filteredContacts = useSelector(selectFilteredContacts);

  return (
    <ul>
      {filteredContacts.map(({ id, name, phone }) => (
        <li key={id}>
          <span>
            {name}: {phone}
            <button onClick={() => dispatch(deleteContact(id))} type="button">
              Delete
            </button>
          </span>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
