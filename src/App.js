import React, { useEffect, useState } from 'react';
import { getAllBooks } from './Services/booksService';
import { login } from './Services/AuthService';

function App() {
  const [books, setBooks] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(localStorage.getItem('authToken'));

  const handleLogin = async () => {
    try {
      const recievedToken = await login(username, password);
      if (recievedToken) {
        setToken(recievedToken);
        localStorage.setItem('authToken', recievedToken);
        alert('Login successful');
      } else {
        alert('Login failed');
      }
    }
    catch (error) {
      alert('Login failed');
    }
  }
  useEffect(() => {


    fetchBooks();
  }, []);
      const fetchBooks = async () => {
      try {
        const data = await getAllBooks();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

  return (
    <div style={{ padding: '20px' }}>
      {!token && (
        <div>
          <button onClick={fetchBooks()}>books</button>

          <h2>Login</h2>
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
          <button onClick={handleLogin}>Login</button>
        </div>
      )}

      {token && <h2>Logged in! Your token: {token}</h2>}
    </div>
  );

}

export default App;
