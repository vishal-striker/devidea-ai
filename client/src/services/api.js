import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL ? `${process.env.REACT_APP_API_URL}/api/ideas` : '/api/ideas';

// Generate a new project idea
export const generateIdea = async (techStack, difficulty) => {
  try {
    console.log('API: Calling generateIdea', { techStack, difficulty });
    const response = await axios.post(`${API_URL}/generate`, {
      techStack,
      difficulty
    });
    console.log('API: generateIdea response:', response.data);
    return response.data;
  } catch (error) {
    console.error('API: generateIdea error:', error);
    throw error.response?.data?.message || 'Failed to generate idea';
  }
};

// Save an idea to database
export const saveIdea = async (ideaData) => {
  try {
    console.log('API: Calling saveIdea with data:', ideaData);
    const response = await axios.post(`${API_URL}/save`, ideaData);
    console.log('API: saveIdea response:', response.data);
    return response.data;
  } catch (error) {
    console.error('API: saveIdea error:', error.response?.data || error.message);
    throw error.response?.data?.message || 'Failed to save idea';
  }
};

// Get all saved ideas
export const getIdeas = async (search = '') => {
  try {
    console.log('API: Calling getIdeas');
    const response = await axios.get(`${API_URL}${search ? `?search=${search}` : ''}`);
    console.log('API: getIdeas response:', response.data);
    return response.data;
  } catch (error) {
    console.error('API: getIdeas error:', error);
    throw error.response?.data?.message || 'Failed to fetch ideas';
  }
};

// Delete an idea
export const deleteIdea = async (id) => {
  try {
    console.log('API: Calling deleteIdea', id);
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to delete idea';
  }
};

export default {
  generateIdea,
  saveIdea,
  getIdeas,
  deleteIdea
};

