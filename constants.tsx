
import React from 'react';
import { Skill } from './types';

export const CATEGORIES = ['Coding', 'Business', 'Design', 'Soft Skills', 'Finance'];

export const AVAILABLE_SKILLS: Skill[] = [
  {
    id: 'python-101',
    name: 'Python for Beginners',
    category: 'Coding',
    description: 'Master the basics of programming using Python.',
    icon: '🐍',
    level: 'Beginner'
  },
  {
    id: 'public-speaking',
    name: 'Impactful Speaking',
    category: 'Soft Skills',
    description: 'Learn to present your ideas with confidence.',
    icon: '🎤',
    level: 'Beginner'
  },
  {
    id: 'excel-data',
    name: 'Advanced Excel',
    category: 'Business',
    description: 'Analyze data like a pro for internships.',
    icon: '📊',
    level: 'Intermediate'
  },
  {
    id: 'digital-marketing',
    name: 'Social Media Growth',
    category: 'Business',
    description: 'Build a personal brand on LinkedIn and Instagram.',
    icon: '📱',
    level: 'Beginner'
  },
  {
    id: 'ui-design',
    name: 'Mobile App Design',
    category: 'Design',
    description: 'Create beautiful interfaces using Figma.',
    icon: '🎨',
    level: 'Beginner'
  },
  {
    id: 'stock-market',
    name: 'Indian Stock Market',
    category: 'Finance',
    description: 'Basics of investing in Nifty and Sensex.',
    icon: '📈',
    level: 'Beginner'
  }
];
