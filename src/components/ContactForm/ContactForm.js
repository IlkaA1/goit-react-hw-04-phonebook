import React, { Component } from 'react';

import css from './form.module.css';
import PropTypes from 'prop-types';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  onChangeState = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    this.props.addContact(this.state);

    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit} className={css.container}>
          <label>
            Name
            <input
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              value={name}
              onChange={this.onChangeState}
              required
            />
          </label>
          <label>
            Number
            <input
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              value={number}
              onChange={this.onChangeState}
              required
            />
          </label>

          <button type="submit" className={css.addContact}>
            Add contact
          </button>
        </form>
      </div>
    );
  }
}

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};

export default ContactForm;
