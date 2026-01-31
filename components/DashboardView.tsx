
import React from 'react';
import { UserProgress, Skill } from '../types';
import { AVAILABLE_SKILLS } from '../constants';

interface DashboardViewProps {
  progress: UserProgress;
  onStartSkill: (skill: Skill) => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({ progress, onStartSkill }) => {
  const continueSkill = AVAILABLE_SKILLS[0]; // Simple logic for demo

  return (
    <div className="space-y-6">
      <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-1">Namaste, Learner! 👋</h2>
          <p className="text-indigo-100 mb-4 text-sm">Ready for your 5-minute sprint today?</p>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs uppercase opacity-75 mb-1 font-semibold tracking-wider">Total XP</p>
              <p className="text-3xl font-bold">{progress.points}</p>
            </div>
            <button 
              onClick={() => onStartSkill(continueSkill)}
              className="bg-white text-indigo-600 px-6 py-2 rounded-xl font-bold shadow-md hover:bg-indigo-50 transition-colors"
            >
              Start Sprint
            </button>
          </div>
        </div>
        <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-indigo-500 rounded-full opacity-30 blur-xl"></div>
        <div className="absolute bottom-[-20px] left-[-20px] w-24 h-24 bg-violet-500 rounded-full opacity-30 blur-xl"></div>
      </div>

      <section>
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="p-1.5 bg-yellow-100 rounded-lg text-yellow-600">⚡</span>
          Continue Learning
        </h3>
        <div className="space-y-3">
          {AVAILABLE_SKILLS.slice(0, 2).map(skill => (
            <div 
              key={skill.id}
              onClick={() => onStartSkill(skill)}
              className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-4 cursor-pointer hover:border-indigo-300 transition-colors"
            >
              <div className="text-3xl">{skill.icon}</div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-800">{skill.name}</h4>
                <p className="text-xs text-slate-500">{skill.category} • {skill.level}</p>
                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2">
                  <div className="bg-indigo-500 h-full rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div className="text-indigo-600 text-xl font-bold">→</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold">Daily Streak</h3>
          <span className="text-xs font-semibold bg-white/10 px-2 py-1 rounded">GOAL: 7 DAYS</span>
        </div>
        <div className="flex justify-between">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => {
            const isCompleted = idx < progress.streak % 7;
            const isToday = idx === (new Date().getDay() + 6) % 7;
            return (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                  isCompleted ? 'bg-orange-500 text-white' : 
                  isToday ? 'border-2 border-indigo-400 text-indigo-400' : 'bg-white/5 text-slate-500'
                }`}>
                  {isCompleted ? '🔥' : day}
                </div>
                {isToday && <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default DashboardView;
