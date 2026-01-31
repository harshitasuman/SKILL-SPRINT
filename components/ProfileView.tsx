
import React from 'react';
import { UserProgress } from '../types';

interface ProfileViewProps {
  progress: UserProgress;
}

const ProfileView: React.FC<ProfileViewProps> = ({ progress }) => {
  return (
    <div className="space-y-8 pb-4">
      <div className="flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center text-4xl border-4 border-white shadow-md mb-4">
          👨‍🎓
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Rahul Sharma</h2>
        <p className="text-slate-500 text-sm">Future Tech Leader</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-sm">
          <p className="text-2xl font-bold text-indigo-600">{progress.points}</p>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-tighter">Total XP</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-sm">
          <p className="text-2xl font-bold text-orange-500">{progress.streak}</p>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-tighter">Streak</p>
        </div>
      </div>

      <section>
        <h3 className="font-bold text-slate-800 mb-4">Mastered Skills</h3>
        {progress.completedSkills.length > 0 ? (
          <div className="space-y-3">
            {progress.completedSkills.map(id => (
              <div key={id} className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                <span className="font-medium text-slate-700">{id.replace('-', ' ')}</span>
                <span className="text-green-500 font-bold text-xs uppercase">Level 1 Complete</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center">
            <p className="text-slate-400 text-sm">No skills completed yet. Finish a sprint to see them here!</p>
          </div>
        )}
      </section>

      <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
        <h3 className="font-bold text-indigo-900 mb-2">Invite Friends</h3>
        <p className="text-indigo-800 text-sm mb-4">Learn together and get 500 XP bonus for every friend who starts a streak.</p>
        <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold text-sm shadow-sm hover:bg-indigo-700 transition-colors">
          Share Link
        </button>
      </div>

      <button className="w-full text-red-500 font-bold text-sm py-4">
        Log Out
      </button>
    </div>
  );
};

export default ProfileView;
