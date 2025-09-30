import axios from 'axios';

const API_URL = 'http://localhost:3000/books';

export const getAllBooks = async () => {
  const token = localStorage.getItem('authToken');
  const response = await axios.get('http://localhost:3000/books', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};


export const addBook = async (book) => {
  try {
    const response = await axios.post(API_URL, book);
    return response.data;
  } catch (error) {
    console.error('Error adding book:', error);
    throw error;
  }
};
