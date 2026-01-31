
import React, { useState, useEffect } from 'react';
import { View, Skill, UserProgress } from './types';
import { AVAILABLE_SKILLS } from './constants';
import DashboardView from './components/DashboardView';
import ExploreView from './components/ExploreView';
import SprintView from './components/SprintView';
import ProfileView from './components/ProfileView';
import ChatView from './components/ChatView';
import BottomNav from './components/BottomNav';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('skill_sprint_progress');
    return saved ? JSON.parse(saved) : {
      streak: 0,
      lastCompletedDate: null,
      completedSkills: [],
      points: 0
    };
  });

  useEffect(() => {
    localStorage.setItem('skill_sprint_progress', JSON.stringify(progress));
  }, [progress]);

  const handleCompleteSprint = () => {
    const today = new Date().toDateString();
    setProgress(prev => {
      const isNewDay = prev.lastCompletedDate !== today;
      return {
        ...prev,
        streak: isNewDay ? prev.streak + 1 : prev.streak,
        lastCompletedDate: today,
        points: prev.points + 50,
        completedSkills: activeSkill ? [...new Set([...prev.completedSkills, activeSkill.id])] : prev.completedSkills
      };
    });
    setCurrentView('dashboard');
    setActiveSkill(null);
  };

  const startSprint = (skill: Skill) => {
    setActiveSkill(skill);
    setCurrentView('sprint');
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView progress={progress} onStartSkill={startSprint} />;
      case 'explore':
        return <ExploreView onSelectSkill={startSprint} />;
      case 'sprint':
        return activeSkill ? (
          <SprintView 
            skill={activeSkill} 
            onComplete={handleCompleteSprint} 
            onExit={() => setCurrentView('dashboard')} 
          />
        ) : <DashboardView progress={progress} onStartSkill={startSprint} />;
      case 'profile':
        return <ProfileView progress={progress} />;
      case 'chat':
        return <ChatView />;
      default:
        return <DashboardView progress={progress} onStartSkill={startSprint} />;
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 relative flex flex-col pb-20">
      <header className="bg-white border-b px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">S</div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">SkillSprint</h1>
        </div>
        <div className="flex items-center gap-2 bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
          <span className="text-orange-600">🔥</span>
          <span className="font-bold text-orange-700">{progress.streak}</span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6">
        {renderView()}
      </main>

      {currentView !== 'sprint' && (
        <BottomNav activeView={currentView} onViewChange={setCurrentView} />
      )}
    </div>
  );
};

export default App;
