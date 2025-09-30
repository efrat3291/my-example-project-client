import React, { useState } from 'react';
import { getAllBooks, addBook } from './Services/booksService';
import { login, logout, register } from './Services/AuthService';

function App() {
  const [books, setBooks] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(localStorage.getItem('authToken') || null);
  const [newBook, setNewBook] = useState('');

  const handleLogin = async () => {
    try {
      const recievedToken = await login(username, password);
      setToken(recievedToken);
      alert('Login successful');
    } catch {
      alert('Login failed');
    }
  };

  const handleLogout = async () => {
    await logout();
    setToken(null);
    setBooks([]);
    alert('Logged out');
  };

  const handleRegister = async () => {
    try {
      await register(username, password);
      alert('Registered successfully! Now login with your credentials.');
    } catch {
      alert('Register failed');
    }
  };

  const fetchBooks = async () => {
    try {
      const data = await getAllBooks();
      setBooks(data);
    } catch {
      alert('Failed to fetch books');
    }
  };

  const handleAddBook = async () => {
    try {
      const book = { name: newBook };
      await addBook(book);
      setNewBook('');
      fetchBooks();
    } catch {
      alert('Failed to add book');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      {!token && (
        <div>
          <h2>Login or Register</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <div style={{ marginTop: '10px' }}>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleRegister} style={{ marginLeft: '10px' }}>Register</button>
          </div>
        </div>
      )}

      {token && (
        <div>
          <h2>Welcome, {username}</h2>
          <button onClick={handleLogout}>Logout</button>
          <hr />
          <button onClick={fetchBooks}>Get Books</button>
          <ul>
            {books.map(b => (
              <li key={b.id}>{b.name}</li>
            ))}
          </ul>
          <input
            type="text"
            placeholder="New book name"
            value={newBook}
            onChange={e => setNewBook(e.target.value)}
          />
          <button onClick={handleAddBook}>Add Book</button>
        </div>
      )}
    </div>
  );
}

export default App;
