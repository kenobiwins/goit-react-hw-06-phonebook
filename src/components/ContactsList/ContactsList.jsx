// import debounce from 'lodash.debounce';
import { ContactList } from './ContactsList.styled';
import { ContactsListItem } from 'components/ContactsListItem/ContactsListItem';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';

export const ContactsList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  // const filterContacts = useMemo(() => {
  //   return debounce(contacts => {
  //     return contacts.filter(el => {
  //       return el.name.toLowerCase().includes(filter.toLowerCase().trim());
  //     });
  //   }, 500);
  // });

  const visibleContacts = useMemo(() => {
    if (filter === '' || !filter) {
      return contacts;
    } else {
      return contacts.filter(el => {
        return el.name.toLowerCase().includes(filter.toLowerCase().trim());
      });
    }
  }, [contacts, filter]);

  return (
    <ContactList>
      {visibleContacts.map(({ id, name, number }) => {
        return (
          <ContactsListItem key={id} name={name} id={id} number={number} />
        );
      })}
    </ContactList>
  );
};
