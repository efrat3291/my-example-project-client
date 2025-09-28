import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getAllBooks = async () => {
    try{
        const response = await axios.get(`${API_URL}/books`);
        console.log('Books response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
}

export const addBook = async (book) =>{
    try{
        const response = await axios.post(`${API_URL}/books`, book);
        return response.data;
    } catch (error) {
        console.error('Error adding book:', error);
        throw error;
    }
}