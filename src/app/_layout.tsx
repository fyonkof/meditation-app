import { setAudioModeAsync } from 'expo-audio';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { AudioPrefsProvider } from '../lib/audioPrefs';
import { BookmarksProvider } from '../lib/bookmarks';
import { colors } from '../theme';

export default function RootLayout() {
  useEffect(() => {
    // Play music and voiceover even when the phone's silent switch is on.
    void setAudioModeAsync({ playsInSilentMode: true, interruptionMode: 'duckOthers' });
  }, []);

  return (
    <AudioPrefsProvider>
      <BookmarksProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.background },
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen
            name="feed"
            options={{ animation: 'fade', contentStyle: { backgroundColor: '#000' } }}
          />
        </Stack>
      </BookmarksProvider>
    </AudioPrefsProvider>
  );
}
