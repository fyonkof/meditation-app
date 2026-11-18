/** A remote URL (from the CMS) or a bundled file from `require()` (sample content). */
export type MediaSource = string | number;

export type Category = {
  id: string;
  title: string;
  description?: string;
  /** Optional cover image for the home screen tile. */
  coverUrl?: string;
};

export type Moment = {
  id: string;
  title: string;
  /** Short line shown over the video, e.g. "Breathe with the falling snow". */
  caption?: string;
  /** Looping video, up to 60 seconds. HLS (.m3u8) from Mux is best; MP4 works too. */
  videoUrl: MediaSource;
  /** Background music. Loops with the video. */
  musicUrl?: MediaSource;
  /** Guided voiceover. Plays once per view. */
  voiceoverUrl?: MediaSource;
  categoryIds: string[];
};
