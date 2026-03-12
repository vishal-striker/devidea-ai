import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL ? `${process.env.REACT_APP_API_URL}/api/auth` : '/api/auth';

// Register user
export const register = async (userData) => {
  try {
    console.log('Auth API: Registering user', userData.email);
    const response = await axios.post(`${API_URL}/register`, userData);
    console.log('Auth API: Register success', response.data);
    
    // Store user data
    localStorage.setItem('user', JSON.stringify(response.data));
    localStorage.setItem('token', response.data.token);
    
    return response.data;
  } catch (error) {
    console.error('Auth API: Register error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Registration failed' };
  }
};

// Login user
export const login = async (email, password) => {
  try {
    console.log('Auth API: Logging in user', email);
    const response = await axios.post(`${API_URL}/login`, { email, password });
    console.log('Auth API: Login success', response.data);
    
    // Store user data
    localStorage.setItem('user', JSON.stringify(response.data));
    localStorage.setItem('token', response.data.token);
    
    return response.data;
  } catch (error) {
    console.error('Auth API: Login error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Login failed' };
  }
};

export default { register, login };
