import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

import css from './app.module.css';
import { save, load } from './Storage/Storage';

const LOCALSTORAGE_KEY = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contactsFromStorage = load(LOCALSTORAGE_KEY);
    if (contactsFromStorage) {
      setContacts(contactsFromStorage);
    }
  }, []);

  const addNewContact = info => {
    const { name } = info;

    const allName = contacts.find(contact => contact.name === name);
    info.id = nanoid();

    if (allName) {
      return alert(`${name} is already in contacts`);
    } else return setContacts(prevContacts => [...prevContacts, info]);
  };

  useEffect(() => {
    return save(LOCALSTORAGE_KEY, contacts);
  }, [contacts]);

  const startFilter = name => {
    const filterQvery = name.currentTarget.value;
    setFilter(filterQvery);
  };

  const getFilteredElement = () => {
    const oneContact = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase().toString())
    );

    return oneContact;
  };

  const deletElement = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm addContact={addNewContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={startFilter} />
      <ContactList
        getFilteredElement={getFilteredElement()}
        toDelete={deletElement}
      />
    </div>
  );
};
