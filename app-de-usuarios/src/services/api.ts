import axios from 'axios';

const API_URL = 'https://randomuser.me/api/?nat=br'; 

export interface User {
  gender: 'male' | 'female';
  name: {
    first: string;
    last: string;
  };
  email: string;
  picture: {
    large: string;
  };
  location: {
    city: string;
    state: string;
  };
  phone: string;
  dob: {
    date: string;
    age: number;
  };
}

export const fetchRandomUser = async (): Promise<User> => {
  try {
    const response = await axios.get(API_URL);
    return response.data.results[0];
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    throw error;
  }
};