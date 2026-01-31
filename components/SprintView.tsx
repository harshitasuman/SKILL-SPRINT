
import React, { useState, useEffect } from 'react';
import { Skill, SprintContent } from '../types';
import { generateDailySprint } from '../services/geminiService';

interface SprintViewProps {
  skill: Skill;
  onComplete: () => void;
  onExit: () => void;
}

const SprintView: React.FC<SprintViewProps> = ({ skill, onComplete, onExit }) => {
  const [step, setStep] = useState(0); // 0: loading, 1: concept, 2: task, 3: quiz, 4: result
  const [content, setContent] = useState<SprintContent | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await generateDailySprint(skill);
        setContent(data);
        setStep(1);
      } catch (err) {
        console.error(err);
        alert("Oops! Could not load the sprint. Please try again later.");
        onExit();
      }
    };
    loadContent();
  }, [skill]);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const checkAnswer = () => {
    if (selectedOption === content?.quiz.answer) {
      setIsCorrect(true);
      setStep(4);
    } else {
      setIsCorrect(false);
    }
  };

  if (step === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] space-y-6 text-center">
        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-800">Crafting your sprint...</h3>
          <p className="text-slate-500 text-sm px-10">Gemini is picking the perfect concept for {skill.name}</p>
        </div>
      </div>
    );
  }

  const progressPercent = (step / 4) * 100;

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={onExit} className="text-slate-400 hover:text-slate-600">✕</button>
        <div className="flex-1 mx-4 h-2 bg-slate-200 rounded-full overflow-hidden">
          <div className="bg-indigo-500 h-full transition-all duration-300" style={{ width: `${progressPercent}%` }}></div>
        </div>
        <span className="text-xs font-bold text-slate-400">{Math.round(progressPercent)}%</span>
      </div>

      <div className="flex-1">
        {step === 1 && content && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Concept</span>
            <h2 className="text-2xl font-bold text-slate-800">Learn this:</h2>
            <div className="bg-white p-6 rounded-2xl border border-indigo-100 shadow-sm leading-relaxed text-slate-700">
              {content.concept}
            </div>
            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
              <h4 className="font-bold text-amber-800 text-sm uppercase mb-2">Example</h4>
              <p className="text-amber-900">{content.example}</p>
            </div>
          </div>
        )}

        {step === 2 && content && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Quick Task</span>
            <h2 className="text-2xl font-bold text-slate-800">Try it now:</h2>
            <div className="bg-white p-8 rounded-2xl border-2 border-dashed border-green-200 text-center space-y-4">
              <p className="text-lg font-medium text-slate-700">{content.task}</p>
              <div className="text-4xl animate-bounce">👉 ⌨️ 👈</div>
            </div>
            <p className="text-center text-slate-400 text-xs">Do this in your mind or on a paper. Takes 1 minute.</p>
          </div>
        )}

        {step === 3 && content && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Knowledge Check</span>
            <h2 className="text-2xl font-bold text-slate-800">{content.quiz.question}</h2>
            <div className="space-y-3">
              {content.quiz.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedOption(idx)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    selectedOption === idx 
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm' 
                      : 'border-slate-100 bg-white hover:border-slate-300'
                  }`}
                >
                  <span className="inline-block w-6 h-6 rounded-full bg-slate-100 text-center text-xs font-bold mr-3 pt-1">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {opt}
                </button>
              ))}
            </div>
            {isCorrect === false && (
              <p className="text-red-500 text-sm font-medium animate-pulse text-center">Try again! You can do it.</p>
            )}
          </div>
        )}

        {step === 4 && content && (
          <div className="flex flex-col items-center justify-center space-y-6 text-center py-10 animate-in zoom-in duration-500">
            <div className="text-7xl">🎉</div>
            <div>
              <h2 className="text-3xl font-bold text-slate-800">Sprint Done!</h2>
              <p className="text-slate-500 mt-2">Awesome job! You've mastered a concept today.</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border w-full max-w-sm">
              <p className="text-sm font-semibold text-slate-600 mb-2">Did you know?</p>
              <p className="text-slate-700 italic">{content.quiz.explanation}</p>
            </div>
            <div className="flex gap-4">
              <div className="bg-orange-50 px-4 py-2 rounded-xl border border-orange-100">
                <p className="text-xs text-orange-600 font-bold uppercase">XP Earned</p>
                <p className="text-xl font-bold text-orange-700">+50</p>
              </div>
              <div className="bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100">
                <p className="text-xs text-indigo-600 font-bold uppercase">Concept</p>
                <p className="text-xl font-bold text-indigo-700">Mastered</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="sticky bottom-0 bg-slate-50 pt-4 pb-2">
        {step < 3 && (
          <button 
            onClick={handleNext}
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-indigo-700 active:scale-[0.98] transition-all"
          >
            Continue
          </button>
        )}
        {step === 3 && (
          <button 
            onClick={checkAnswer}
            disabled={selectedOption === null}
            className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg transition-all ${
              selectedOption !== null ? 'bg-indigo-600 text-white active:scale-[0.98]' : 'bg-slate-300 text-slate-500'
            }`}
          >
            Check Answer
          </button>
        )}
        {step === 4 && (
          <button 
            onClick={onComplete}
            className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg active:scale-[0.98] transition-all"
          >
            Claim Rewards
          </button>
        )}
      </div>
    </div>
  );
};

export default SprintView;
