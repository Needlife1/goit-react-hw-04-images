import { useState } from 'react';
import { FormStyled } from './Form.styled';
import { nanoid } from 'nanoid';

export const Form = ({ createContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const addContact = e => {
    e.preventDefault();
    const id = nanoid();

    const newContact = {
      name,
      number,
      id,
    };

    createContact(newContact);

    setName('');
    setNumber('');
  };

  return (
    <FormStyled onSubmit={addContact}>
      <label htmlFor="Name">
        Name
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChange}
          value={name}
          id="Name"
        />
      </label>

      <label htmlFor="Number">
        Number
        <input
          id="Number"
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
          value={number}
        />
      </label>
      <button type="submit">Add contact</button>
    </FormStyled>
  );
};
