import React, { useState, useEffect } from 'react';
import { FiSearch, FiTrash2, FiGrid, FiZap, FiFilter } from 'react-icons/fi';
import IdeaCard from '../components/IdeaCard';
import { getIdeas, deleteIdea } from '../services/api';

const Dashboard = ({ ideas, showToast, onIdeaDeleted }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredIdeas, setFilteredIdeas] = useState(ideas);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    filterIdeas();
  }, [ideas, searchTerm, filter]);

  const filterIdeas = () => {
    let filtered = [...ideas];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(idea => 
        idea.title.toLowerCase().includes(term) ||
        idea.description.toLowerCase().includes(term) ||
        idea.techStack.toLowerCase().includes(term)
      );
    }

    // Apply difficulty filter
    if (filter !== 'all') {
      filtered = filtered.filter(idea => idea.difficulty === filter);
    }

    setFilteredIdeas(filtered);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this idea?')) return;

    setLoading(true);
    try {
      await deleteIdea(id);
      showToast('Idea deleted successfully!', 'success');
      onIdeaDeleted();
    } catch (error) {
      showToast(error || 'Failed to delete idea', 'error');
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    total: ideas.length,
    beginner: ideas.filter(i => i.difficulty === 'Beginner').length,
    intermediate: ideas.filter(i => i.difficulty === 'Intermediate').length,
    advanced: ideas.filter(i => i.difficulty === 'Advanced').length
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Manage your saved project ideas</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Ideas</p>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
              </div>
              <FiZap className="w-8 h-8 text-primary-400" />
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Beginner</p>
                <p className="text-2xl font-bold text-green-400">{stats.beginner}</p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                <span className="text-green-400">B</span>
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Intermediate</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.intermediate}</p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <span className="text-yellow-400">I</span>
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Advanced</p>
                <p className="text-2xl font-bold text-red-400">{stats.advanced}</p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                <span className="text-red-400">A</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="card p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search saved ideas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-12"
              />
            </div>

            {/* Filter */}
            <div className="flex items-center space-x-2">
              <FiFilter className="text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="input-field w-auto"
              >
                <option value="all">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>
        </div>

        {/* Ideas Grid */}
        {filteredIdeas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIdeas.map((idea) => (
              <IdeaCard
                key={idea._id}
                idea={idea}
                onDelete={handleDelete}
                showSaveButton={false}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-dark-700 rounded-full mb-4">
              <FiGrid className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No ideas found</h3>
            <p className="text-gray-500">
              {searchTerm || filter !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'Start by generating and saving some project ideas!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

