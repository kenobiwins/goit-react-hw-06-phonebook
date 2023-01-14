import { nanoid } from 'nanoid';
import { PhonebookForm } from './PhonebookForm/PhonebookForm';
import { Section } from './Section/Section';
import { Filter } from './Filter/Filter';
import { ContactsList } from './ContactsList/ContactsList';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
import { changeFilter } from 'redux/filterSlice';
import { addContact, deleteContact } from 'redux/contactsSlice';
import { useMemo } from 'react';
import debounce from 'lodash.debounce';

export const App = () => {
  const dispatch = useDispatch();

  const filter = useSelector(getFilter);
  const contacts = useSelector(getContacts);

  const handleDelete = id => {
    dispatch(deleteContact(id));
  };

  const handleFilterInput = ({ target: { value } }) => {
    dispatch(changeFilter(value));
  };

  const handleSubmit = newUser => {
    const user = {
      id: nanoid(),
      ...newUser,
    };

    const usersInclude = contacts.some(el => el.name === user.name);

    if (usersInclude) {
      alert(`${user.name} is already in contacts`);
      return null;
    }

    dispatch(addContact(user));

    return 'New contact has already in your list';
  };
  console.log(contacts);
  const filterContacts = () => {
    return [...contacts].filter(el => {
      return el.name.toLowerCase().includes(filter.toLowerCase().trim());
    });
  };

  return (
    <>
      <Section majorTitle={'Phonebook'}>
        <PhonebookForm onSubmit={handleSubmit} />
      </Section>

      <Section title={'Contacts'}>
        <Filter handlerFilterInput={handleFilterInput} filterValue={filter} />
        <ContactsList contacts={filterContacts()} deleteData={handleDelete} />
      </Section>
    </>
  );
};
