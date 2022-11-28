import axios from 'axios';
import { useState } from 'react';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([])

  const getUsers = () => {
    axios.get('http://localhost:8080/contacts')
      .then(res => {
        console.log(res.data.contacts)
        setContacts(res.data.contacts)
      }).catch(err => {
        console.log(err)
      })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8080/contacts')
      .then(res => {
        console.log(res.data.message)
        throw alert("You add a new contact")
        // setContacts(res.data.contacts)
      }).catch(err => {
        console.log(err)
      })
  }
  
  return (
    <div className="App">
      <form action="" onSubmit={handleSubmit}>
        <label>Name:
      <input 
        type="text" 
        name="username" 

      />
      </label>
      <label>Phone number:
        <input 
          type="number" 
          name="number" 

        />
        </label>
       <button type='submit'>Add contact</button>
      </form>
      <button onClick={getUsers}>Show Contacts</button>
      {contacts ? contacts.map((contact, i) => (
        <div key={i} className="contacts-container">
          <img src={contact.avatar} alt="avatar" />
          <h4>{contact.username}</h4>
          <span>{contact.phone}</span>
</div>
      ))  : null}
    </div>
  );
}

export default App;
