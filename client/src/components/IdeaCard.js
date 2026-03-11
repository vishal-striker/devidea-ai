import React, { useState } from 'react';
import { 
  FiCopy, FiCheck, FiSave, FiTrash2, FiTag, FiLayers, FiZap, FiChevronDown, FiChevronUp 
} from 'react-icons/fi';

const IdeaCard = ({ idea, onSave, onDelete, showSaveButton = true, showDeleteButton = true }) => {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleCopy = async () => {
    const text = `${idea.title}

Description:
${idea.description}

Features:
${idea.features.map(f => `- ${f}`).join('\n')}

Architecture:
${idea.architecture}

${idea.extensions ? `Possible Extensions:\n${idea.extensions.map(e => `- ${e}`).join('\n')}` : ''}`.trim();

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const difficultyColors = {
    Beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
    Intermediate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    Advanced: 'bg-red-500/20 text-red-400 border-red-500/30'
  };

  const techStackColors = {
    MERN: 'bg-blue-500/20 text-blue-400',
    MEAN: 'bg-purple-500/20 text-purple-400',
    Python: 'bg-yellow-500/20 text-yellow-400',
    Java: 'bg-orange-500/20 text-orange-400',
    'AI/ML': 'bg-pink-500/20 text-pink-400',
    'Mobile App': 'bg-teal-500/20 text-teal-400'
  };

  const handleSaveClick = () => {
    alert('IdeaCard Save clicked! Title: ' + idea.title);
    if (onSave) {
      onSave(idea);
    } else {
      alert('onSave is NOT defined!');
    }
  };

  return (
    <div className="card p-6 hover:border-primary-500/30 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2">{idea.title}</h3>
          <div className="flex flex-wrap gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${difficultyColors[idea.difficulty]}`}>
              {idea.difficulty}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${techStackColors[idea.techStack]}`}>
              {idea.techStack}
            </span>
          </div>
        </div>
      </div>

      <p className="text-gray-300 mb-4">{idea.description}</p>

      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-400 mb-2 flex items-center">
          <FiLayers className="w-4 h-4 mr-2" />
          Key Features
        </h4>
        <ul className="space-y-1">
          {idea.features.slice(0, expanded ? idea.features.length : 3).map((feature, index) => (
            <li key={index} className="text-gray-300 text-sm flex items-start">
              <span className="text-primary-400 mr-2">•</span>
              {feature}
            </li>
          ))}
          {idea.features.length > 3 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-primary-400 text-sm flex items-center mt-2 hover:text-primary-300"
            >
              {expanded ? (
                <>Show less <FiChevronUp className="ml-1" /></>
              ) : (
                <>Show {idea.features.length - 3} more <FiChevronDown className="ml-1" /></>
              )}
            </button>
          )}
        </ul>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-400 mb-2 flex items-center">
          <FiZap className="w-4 h-4 mr-2" />
          Architecture
        </h4>
        <p className="text-gray-300 text-sm">{idea.architecture}</p>
      </div>

      {idea.extensions && idea.extensions.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-400 mb-2 flex items-center">
            <FiTag className="w-4 h-4 mr-2" />
            Possible Extensions
          </h4>
          <div className="flex flex-wrap gap-2">
            {idea.extensions.slice(0, 3).map((ext, index) => (
              <span key={index} className="px-2 py-1 bg-dark-700 rounded text-xs text-gray-300">
                {ext}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-3 pt-4 border-t border-dark-700">
        <button
          onClick={handleCopy}
          className="btn-secondary flex items-center space-x-2 flex-1 justify-center"
        >
          {copied ? <FiCheck className="w-4 h-4" /> : <FiCopy className="w-4 h-4" />}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
        
        {showSaveButton && (
          <button
            onClick={handleSaveClick}
            className="btn-primary flex items-center space-x-2 flex-1 justify-center"
          >
            <FiSave className="w-4 h-4" />
            <span>Save</span>
          </button>
        )}
        
        {showDeleteButton && idea._id && (
          <button
            onClick={() => onDelete(idea._id)}
            className="btn-danger flex items-center justify-center"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default IdeaCard;

