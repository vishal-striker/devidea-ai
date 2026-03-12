import React, { useState } from 'react';
import { FiZap, FiChevronRight, FiCode, FiTarget, FiStar } from 'react-icons/fi';
import IdeaCard from '../components/IdeaCard';
import Loading from '../components/Loading';
import { generateIdea, saveIdea } from '../services/api';

const techStacks = [
  { value: 'MERN', label: 'MERN Stack', icon: '⚛️' },
  { value: 'MEAN', label: 'MEAN Stack', icon: '🅰️' },
  { value: 'Python', label: 'Python', icon: '🐍' },
  { value: 'Java', label: 'Java', icon: '☕' },
  { value: 'AI/ML', label: 'AI/ML', icon: '🤖' },
  { value: 'Mobile App', label: 'Mobile App', icon: '📱' }
];

const difficulties = [
  { value: 'Beginner', label: 'Beginner', description: 'Perfect for starters' },
  { value: 'Intermediate', label: 'Intermediate', description: 'Good challenge' },
  { value: 'Advanced', label: 'Advanced', description: 'Expert level' }
];

const Home = ({ showToast, onIdeaSaved }) => {
  const [selectedTechStack, setSelectedTechStack] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [generatedIdea, setGeneratedIdea] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleGenerate = async () => {
    if (!selectedTechStack || !selectedDifficulty) {
      showToast('Please select both tech stack and difficulty', 'warning');
      return;
    }

    setLoading(true);
    try {
      const idea = await generateIdea(selectedTechStack, selectedDifficulty);
      setGeneratedIdea(idea);
      showToast('Project idea generated successfully!', 'success');
    } catch (error) {
      showToast(error || 'Failed to generate idea', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (idea) => {
    setSaving(true);
    try {
      const saved = await saveIdea({
        title: idea.title,
        description: idea.description,
        features: idea.features,
        architecture: idea.architecture,
        techStack: idea.techStack,
        difficulty: idea.difficulty,
        extensions: idea.extensions || []
      });
      showToast('Idea saved successfully!', 'success');
      onIdeaSaved();
      setGeneratedIdea(null); // Clear generated idea
    } catch (error) {
      showToast(error || 'Failed to save idea. Please login first.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-primary-500/10 rounded-2xl mb-6">
              <FiZap className="w-10 h-10 text-primary-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">AI-Powered</span> Project Ideas
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Generate innovative software project ideas with detailed descriptions, features, and architecture suggestions.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <FiStar className="w-6 h-6 mr-2 text-yellow-400" />
                Configure Your Project
              </h2>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-300 mb-3 flex items-center">
                  <FiCode className="w-4 h-4 mr-2" />
                  Select Technology Stack
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {techStacks.map((stack) => (
                    <button
                      key={stack.value}
                      onClick={() => setSelectedTechStack(stack.value)}
                      className={`p-4 rounded-lg border transition-all duration-200 flex flex-col items-center ${
                        selectedTechStack === stack.value
                          ? 'border-primary-500 bg-primary-500/10 text-primary-400'
                          : 'border-dark-600 bg-dark-700/30 text-gray-400 hover:border-dark-500 hover:bg-dark-700'
                      }`}
                    >
                      <span className="text-2xl mb-1">{stack.icon}</span>
                      <span className="font-medium">{stack.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-300 mb-3 flex items-center">
                  <FiTarget className="w-4 h-4 mr-2" />
                  Select Difficulty Level
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {difficulties.map((diff) => (
                    <button
                      key={diff.value}
                      onClick={() => setSelectedDifficulty(diff.value)}
                      className={`p-4 rounded-lg border transition-all duration-200 ${
                        selectedDifficulty === diff.value
                          ? 'border-primary-500 bg-primary-500/10'
                          : 'border-dark-600 bg-dark-700/30 hover:border-dark-500'
                      }`}
                    >
                      <div className={`font-semibold mb-1 ${
                        selectedDifficulty === diff.value ? 'text-primary-400' : 'text-gray-300'
                      }`}>
                        {diff.label}
                      </div>
                      <div className="text-xs text-gray-500">{diff.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full btn-primary text-lg flex items-center justify-center"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </span>
                ) : (
                  <>
                    <FiZap className="w-5 h-5 mr-2" />
                    Generate Project Idea
                    <FiChevronRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {loading && (
        <div className="max-w-3xl mx-auto px-4 pb-16">
          <Loading />
        </div>
      )}

      {generatedIdea && !loading && (
        <div className="max-w-3xl mx-auto px-4 pb-16 animate-fade-in">
          <IdeaCard 
            idea={generatedIdea} 
            onSave={handleSave}
            showDeleteButton={false}
          />
        </div>
      )}
    </div>
  );
};

export default Home;

