import { nanoid } from 'nanoid';
// import { useState } from 'react';
import { useLocalStorage } from 'hooks/useLocalStorage.hooks';
import { PhonebookForm } from './PhonebookForm/PhonebookForm';
import { Section } from './Section/Section';
import { Filter } from './Filter/Filter';
import { ContactsList } from './ContactsList/ContactsList';
import { useDispatch, useSelector } from 'react-redux';
import { getFilter } from 'redux/selectors';
import { changeFilter } from 'redux/filterSlice';

const LOCAL_STORAGE_KEY = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useLocalStorage(LOCAL_STORAGE_KEY, []);
  // const [filter, setFilter] = useState('');

  const dispatch = useDispatch();

  const filter = useSelector(getFilter);

  const handleDelete = id => {
    const newArr = contacts.filter(el => {
      return el.id !== id;
    });
    return setContacts(newArr);
  };

  const handleFilterInput = ({ target: { value } }) => {
    // console.log(value);
    dispatch(changeFilter(value));
    // setFilter(value);
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
    setContacts(prevState => {
      return [...prevState, user];
    });
    return 'New contact has already in your list';
  };

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
