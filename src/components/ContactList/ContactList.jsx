import { ContactListStyled } from './ContactList.styled';

export function ContactList({ contacts }) {
  return (
    <>
      <ContactListStyled>
        {contacts.map(contact => (
          <li key={contact.id} id={contact.id}>
            <p style={{ color: 'pink' }}>
              {contact.name}: {contact.number}
            </p>
            <button onClick={() => this.props.deleteContact(contact.id)}>
              Delete
            </button>
          </li>
        ))}
      </ContactListStyled>
    </>
  );
}
