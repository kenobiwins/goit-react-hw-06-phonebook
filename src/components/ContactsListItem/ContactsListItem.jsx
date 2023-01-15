import PropTypes from 'prop-types';
import { ListItem } from './ContactsListItem.styled';
import { Button } from 'BaseStyles/BaseStyles.styled';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/contactsSlice';

export const ContactsListItem = ({ name, number, id }) => {
  const dispatch = useDispatch();

  return (
    <ListItem>
      {name}: {number}
      <Button
        onClick={() => {
          dispatch(deleteContact(id));
        }}
      >
        Delete
      </Button>
    </ListItem>
  );
};

ContactsListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  // deleteData: PropTypes.func.isRequired,
};
