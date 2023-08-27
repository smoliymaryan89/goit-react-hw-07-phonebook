import React, { useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from 'redux/contacts/operations';
import Filter from './Filter/Filter';
import { selectIsLoading } from 'redux/contacts/selectors';
import Loader from './Loader/Loader';

const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm />

      {isLoading && <Loader />}
      <h2>Contacts</h2>
      <Filter />
      <ContactList />
    </>
  );
};

export default App;
