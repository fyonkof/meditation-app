import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

type AudioPrefs = {
  musicOn: boolean;
  voiceOn: boolean;
  toggleMusic: () => void;
  toggleVoice: () => void;
};

const AudioPrefsContext = createContext<AudioPrefs | null>(null);

export function AudioPrefsProvider({ children }: { children: ReactNode }) {
  const [musicOn, setMusicOn] = useState(true);
  const [voiceOn, setVoiceOn] = useState(true);
  const value = useMemo(
    () => ({
      musicOn,
      voiceOn,
      toggleMusic: () => setMusicOn((v) => !v),
      toggleVoice: () => setVoiceOn((v) => !v),
    }),
    [musicOn, voiceOn],
  );
  return <AudioPrefsContext.Provider value={value}>{children}</AudioPrefsContext.Provider>;
}

export function useAudioPrefs() {
  const ctx = useContext(AudioPrefsContext);
  if (!ctx) throw new Error('useAudioPrefs must be used inside AudioPrefsProvider');
  return ctx;
}
