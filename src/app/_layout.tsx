import { setAudioModeAsync } from 'expo-audio';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { AudioPrefsProvider } from '../lib/audioPrefs';

export default function RootLayout() {
  useEffect(() => {
    // Play music and voiceover even when the phone's silent switch is on.
    void setAudioModeAsync({ playsInSilentMode: true, interruptionMode: 'duckOthers' });
  }, []);

  return (
    <AudioPrefsProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#0B0F14' },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="feed" options={{ animation: 'fade' }} />
      </Stack>
    </AudioPrefsProvider>
  );
}
