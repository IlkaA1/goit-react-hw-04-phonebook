import css from './list.module.css';
import PropTypes from 'prop-types';

const ContactList = ({ getFilteredElement, toDelete }) => {
  return (
    <ul className={css.list}>
      {getFilteredElement.map(contact => (
        <li key={contact.id} className={css.li}>
          {contact.name}: {contact.number}{' '}
          <button onClick={() => toDelete(contact.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  getFilteredElement: PropTypes.arrayOf(PropTypes.object).isRequired,
  toDelete: PropTypes.func.isRequired,
};
export default ContactList;
