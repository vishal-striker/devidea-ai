import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL ? `${process.env.REACT_APP_API_URL}/api/ideas` : '/api/ideas';

// Create axios instance
const api = axios.create({
  baseURL: API_URL
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('API: Added token to request');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      console.log('API: Token expired, logged out');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Generate a new project idea (public)
export const generateIdea = async (techStack, difficulty) => {
  try {
    console.log('API: Calling generateIdea', { techStack, difficulty });
    const response = await api.post('/generate', { techStack, difficulty });
    console.log('API: generateIdea response:', response.data);
    return response.data;
  } catch (error) {
    console.error('API: generateIdea error:', error.response?.data || error.message);
    throw error.response?.data?.message || 'Failed to generate idea';
  }
};

// Save an idea to database (protected)
export const saveIdea = async (ideaData) => {
  try {
    console.log('API: Calling saveIdea with data:', ideaData);
    const response = await api.post('/save', ideaData);
    console.log('API: saveIdea response:', response.data);
    return response.data;
  } catch (error) {
    console.error('API: saveIdea error:', error.response?.data || error.message);
    throw error.response?.data?.message || 'Failed to save idea';
  }
};

// Get current user's saved ideas (protected)
export const getIdeas = async (search = '') => {
  try {
    console.log('API: Calling getIdeas', { search });
    const response = await api.get(search ? `?search=${search}` : '');
    console.log('API: getIdeas response:', response.data.length, 'ideas');
    return response.data;
  } catch (error) {
    console.error('API: getIdeas error:', error.response?.data || error.message);
    throw error.response?.data?.message || 'Failed to fetch ideas';
  }
};

// Delete an idea (protected)
export const deleteIdea = async (id) => {
  try {
    console.log('API: Calling deleteIdea', id);
    const response = await api.delete(`/${id}`);
    console.log('API: deleteIdea success');
    return response.data;
  } catch (error) {
    console.error('API: deleteIdea error:', error.response?.data || error.message);
    throw error.response?.data?.message || 'Failed to delete idea';
  }
};

export default {
  generateIdea,
  saveIdea,
  getIdeas,
  deleteIdea
};

