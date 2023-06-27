import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

import css from './app.module.css';
import { save, load } from './Storage/Storage';

const LOCALSTORAGE_KEY = 'contacts';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contactsFromStorage = load(LOCALSTORAGE_KEY);

    if (contactsFromStorage) {
      this.setState({ contacts: contactsFromStorage });
    }
  }

  addNewContact = info => {
    const { name } = info;
    const { contacts } = this.state;
    const allName = contacts.find(contact => contact.name === name);
    info.id = nanoid();

    if (allName) {
      return alert(`${name} is already in contacts`);
    } else
      return this.setState(prevState => ({
        contacts: [...prevState.contacts, info],
      }));
  };

  componentDidUpdate() {
    return save(LOCALSTORAGE_KEY, this.state.contacts);
  }

  startFilter = name => {
    this.setState({ filter: name.currentTarget.value });
  };

  getFilteredElement = () => {
    const { contacts, filter } = this.state;

    const oneContact = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase().toString())
    );

    return oneContact;
  };

  deletElement = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { filter } = this.state;
    return (
      <div className={css.container}>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addNewContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.startFilter} />
        <ContactList
          getFilteredElement={this.getFilteredElement()}
          toDelete={this.deletElement}
        />
      </div>
    );
  }
}
