import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useAudioPrefs } from '../lib/audioPrefs';

export function AudioToggles({ top }: { top: number }) {
  const { musicOn, voiceOn, toggleMusic, toggleVoice } = useAudioPrefs();
  return (
    <View style={[styles.column, { top }]}>
      <Toggle label="Music" on={musicOn} onPress={toggleMusic} />
      <Toggle label="Voice" on={voiceOn} onPress={toggleVoice} />
    </View>
  );
}

function Toggle({ label, on, onPress }: { label: string; on: boolean; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="switch"
      accessibilityState={{ checked: on }}
      accessibilityLabel={label}
      style={[styles.button, !on && styles.off]}
    >
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.state}>{on ? 'On' : 'Off'}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  column: { position: 'absolute', right: 16, gap: 12 },
  button: {
    width: 64,
    paddingVertical: 10,
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  off: { opacity: 0.5 },
  label: { color: '#fff', fontSize: 13, fontWeight: '600' },
  state: { color: 'rgba(255,255,255,0.8)', fontSize: 11, marginTop: 2 },
});
