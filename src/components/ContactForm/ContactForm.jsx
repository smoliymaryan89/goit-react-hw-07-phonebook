import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contacts/operations';
import { selectContacts } from 'redux/contacts/selectors';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Required!')
        .matches(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/, {
          message:
            "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan",
          excludeEmptyString: true,
        }),
      phone: Yup.string()
        .required('Required!')
        .matches(
          /^\+?\d{1,4}[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
          {
            message:
              'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +',
            excludeEmptyString: true,
          }
        ),
    }),
    onSubmit: data => {
      const isDuplicate = contacts.find(contact => contact.name === data.name);
      if (isDuplicate) return alert(`${data.name} is already in contacts.`);

      dispatch(addContact(data));
      formik.resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <input
          type="text"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <div>{formik.errors.name}</div>
        ) : null}
      </div>

      <div>
        <input
          type="text"
          name="phone"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
        />
        {formik.touched.phone && formik.errors.phone ? (
          <div>{formik.errors.phone}</div>
        ) : null}
      </div>

      <button type="submit">Add contact</button>
    </form>
  );
};

export default ContactForm;
