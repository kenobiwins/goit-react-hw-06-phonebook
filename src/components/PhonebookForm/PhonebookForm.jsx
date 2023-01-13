import PropTypes from 'prop-types';
import { useState } from 'react';
import { Form, Label, Input } from './PhonebookForm.styled';
import { Button } from 'BaseStyles/BaseStyles.styled';

export const PhonebookForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleInput = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        return setName(value);
      case 'number':
        return setNumber(value);
      default:
        break;
    }
  };

  const submitForm = e => {
    e.preventDefault();
    const newUser = onSubmit({ name, number });

    if (newUser === null) {
      return;
    } else {
      setName('');
      setNumber('');
      return;
    }
  };

  return (
    <Form onSubmit={submitForm} autoComplete="off">
      <Label htmlFor="name">Name</Label>
      <Input
        id="name"
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={handleInput}
        value={name}
      />
      <Label htmlFor="number">Number</Label>
      <Input
        id="number"
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        onChange={handleInput}
        value={number}
      />
      <Button type="submit">Add contact</Button>
    </Form>
  );
};

PhonebookForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
