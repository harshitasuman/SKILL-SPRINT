
import React, { useState } from 'react';
import { Skill } from '../types';
import { AVAILABLE_SKILLS, CATEGORIES } from '../constants';

interface ExploreViewProps {
  onSelectSkill: (skill: Skill) => void;
}

const ExploreView: React.FC<ExploreViewProps> = ({ onSelectSkill }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const filteredSkills = selectedCategory === 'All' 
    ? AVAILABLE_SKILLS 
    : AVAILABLE_SKILLS.filter(s => s.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Explore Skills</h2>
        <p className="text-slate-500 text-sm">Pick a skill and start a sprint</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
        <button 
          onClick={() => setSelectedCategory('All')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            selectedCategory === 'All' ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600 border border-slate-200'
          }`}
        >
          All
        </button>
        {CATEGORIES.map(cat => (
          <button 
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredSkills.map(skill => (
          <div 
            key={skill.id}
            onClick={() => onSelectSkill(skill)}
            className="group bg-white rounded-2xl p-5 border border-slate-200 hover:border-indigo-500 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-indigo-50 transition-colors">
                <span className="text-3xl">{skill.icon}</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${
                skill.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                skill.level === 'Intermediate' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
              }`}>
                {skill.level}
              </span>
            </div>
            <h3 className="font-bold text-slate-800 text-lg group-hover:text-indigo-600 transition-colors">{skill.name}</h3>
            <p className="text-slate-500 text-sm line-clamp-2 mt-1">{skill.description}</p>
            <div className="mt-4 flex items-center gap-4 text-xs font-semibold text-slate-400">
              <span className="flex items-center gap-1">⏱️ 5 min / day</span>
              <span className="flex items-center gap-1">👤 12k learners</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreView;
