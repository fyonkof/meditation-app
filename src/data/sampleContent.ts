import type { Category, Moment } from './types';

/**
 * Placeholder content so the app runs before the CMS is connected.
 * The media URLs are public sample files, not meditation footage.
 * Replace them with your own clips, or connect Sanity (see README).
 */
export const sampleCategories: Category[] = [
  { id: 'sleep', title: 'Sleep', description: 'Slow scenes to wind down' },
  { id: 'focus', title: 'Focus', description: 'Steady scenes for deep work' },
  { id: 'calm', title: 'Calm', description: 'A minute to reset' },
  { id: 'nature', title: 'Nature', description: 'Forests, oceans and snow' },
  { id: 'breathe', title: 'Breathe', description: 'Follow a slow, even rhythm' },
  { id: 'morning', title: 'Morning', description: 'Start the day gently' },
  { id: 'stress', title: 'Ease stress', description: 'Let tension drain away' },
  { id: 'evening', title: 'Evening', description: 'Close the day with ease' },
];

const music = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3';
const gtv = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample';

export const sampleMoments: Moment[] = [
  {
    id: 'cabin-snow',
    title: 'Snow on the cabin',
    caption: 'Breathe in as the snow falls',
    videoUrl: `${gtv}/ForBiggerBlazes.mp4`,
    musicUrl: music,
    categoryIds: ['sleep', 'nature', 'evening'],
  },
  {
    id: 'ocean',
    title: 'Evening tide',
    caption: 'Let each wave carry a thought away',
    videoUrl: `${gtv}/ForBiggerEscapes.mp4`,
    musicUrl: music,
    categoryIds: ['calm', 'nature', 'breathe', 'stress'],
  },
  {
    id: 'forest',
    title: 'Forest light',
    caption: 'Notice five things you can see',
    videoUrl: `${gtv}/ForBiggerJoyrides.mp4`,
    musicUrl: music,
    categoryIds: ['focus', 'nature', 'morning'],
  },
  {
    id: 'rain',
    title: 'Rain on glass',
    caption: 'Soften your shoulders',
    videoUrl: `${gtv}/ForBiggerMeltdowns.mp4`,
    musicUrl: music,
    categoryIds: ['sleep', 'calm', 'stress', 'evening'],
  },
];
