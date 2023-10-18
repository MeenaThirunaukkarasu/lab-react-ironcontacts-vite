import "./App.css";
import React, { useState } from 'react';
import contactsData from "./contacts.json";
function App() {
  // Create a state variable 'contacts' and initialize it with the first 5 contacts
  const [contacts, setContacts] = useState(contactsData.slice(0, 5));
  const remainingContacts = contactsData.slice(5); // Get the remaining contacts

  const addRandomContact = () => {
    if (remainingContacts.length === 0) {
      alert("No more contacts to add.");
      return;
    }

    // Step 2: Randomly select a contact from the remaining contacts
    const randomIndex = Math.floor(Math.random() * remainingContacts.length);
    const randomContact = remainingContacts[randomIndex];

    // Step 3: Add the selected contact to the 'contacts' array in the state
    setContacts((prevContacts) => [...prevContacts, randomContact]);

    // Remove the selected contact from the remainingContacts
    remainingContacts.splice(randomIndex, 1);
  };

  const removeContact = (id) => {
    // Filter out the contact with the given ID
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(updatedContacts);
  };

  // Sorting function for sorting by name (alphabetically)
  const sortByName = () => {
    const sortedContacts = [...contacts];
    sortedContacts.sort((a, b) => a.name.localeCompare(b.name));
    setContacts(sortedContacts);
  };

  // Sorting function for sorting by popularity (highest first)
  const sortByPopularity = () => {
    const sortedContacts = [...contacts];
    sortedContacts.sort((a, b) => b.popularity - a.popularity);
    setContacts(sortedContacts);
  };


  return (
    <div className="App">
      <h1>IronContacts</h1>
      <button onClick={addRandomContact}>Add Random Contact</button>
      <button onClick={sortByName}>Sort by Name</button>
      <button onClick={sortByPopularity}>Sort by Popularity</button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>
                <img src={contact.pictureUrl} alt={contact.name} width="50" height="50" />
              </td>
              <td>{contact.name}</td>
              <td>{contact.popularity.toFixed(2)}</td>
              <td>
                {contact.wonOscar ? (
                  <span role="img" aria-label="Trophy">
                    🏆
                  </span>
                ) : null}
              </td>
              <td>
                {contact.wonEmmy ? (
                  <span role="img" aria-label="Star">
                    🌟
                  </span>
                ) : null}
              </td>
              <td>
                <button onClick={() => removeContact(contact.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
