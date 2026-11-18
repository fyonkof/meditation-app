import type { Category, Moment } from './types';

/**
 * Placeholder content so the app runs before the CMS is connected.
 * The clips and music are simple generated placeholders bundled with the app,
 * so they play offline. Replace them by connecting Sanity (see README).
 */
export const sampleCategories: Category[] = [
  { id: 'sleep', title: 'Sleep', description: 'Slow scenes to wind down' },
  { id: 'focus', title: 'Focus', description: 'Steady scenes for deep work' },
  { id: 'calm', title: 'Calm', description: 'A minute to reset' },
  { id: 'nature', title: 'Nature', description: 'Forests, oceans and snow' },
];

const music = require('../../assets/moments/ambient-pad.m4a');

export const sampleMoments: Moment[] = [
  {
    id: 'cabin-snow',
    title: 'Snow on the cabin',
    caption: 'Breathe in as the snow falls',
    videoUrl: require('../../assets/moments/snow-cabin.mp4'),
    musicUrl: music,
    categoryIds: ['sleep', 'nature'],
  },
  {
    id: 'ocean',
    title: 'Evening tide',
    caption: 'Let each wave carry a thought away',
    videoUrl: require('../../assets/moments/evening-tide.mp4'),
    musicUrl: music,
    categoryIds: ['calm', 'nature'],
  },
  {
    id: 'forest',
    title: 'Forest light',
    caption: 'Notice five things you can see',
    videoUrl: require('../../assets/moments/forest-light.mp4'),
    musicUrl: music,
    categoryIds: ['focus', 'nature'],
  },
  {
    id: 'rain',
    title: 'Rain on glass',
    caption: 'Soften your shoulders',
    videoUrl: require('../../assets/moments/rain-on-glass.mp4'),
    musicUrl: music,
    categoryIds: ['sleep', 'calm'],
  },
];
