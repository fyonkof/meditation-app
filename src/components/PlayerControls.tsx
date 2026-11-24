import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAudioPrefs } from '../lib/audioPrefs';
import { useBookmarks } from '../lib/bookmarks';
import { RoundButton } from './RoundButton';

export const CONTROLS_MARGIN = 24;

/**
 * Player controls: back in the bottom-left corner, and a stack of
 * music, voice and bookmark buttons in the bottom-right corner.
 */
export function PlayerControls({ momentId }: { momentId?: string }) {
  const insets = useSafeAreaInsets();
  const { musicOn, voiceOn, toggleMusic, toggleVoice } = useAudioPrefs();
  const { isSaved, toggleSaved } = useBookmarks();
  const saved = momentId ? isSaved(momentId) : false;
  const bottom = insets.bottom + CONTROLS_MARGIN;

  return (
    <>
      <View style={[styles.left, { bottom }]}>
        <RoundButton icon="chevron-left" label="Back to home" onPress={() => router.back()} />
      </View>
      <View style={[styles.right, { bottom }]}>
        <RoundButton
          icon={musicOn ? 'music-note' : 'music-note-off'}
          label="Music"
          role="switch"
          on={musicOn}
          onPress={toggleMusic}
        />
        <RoundButton
          icon={voiceOn ? 'account-voice' : 'account-voice-off'}
          label="Voice guidance"
          role="switch"
          on={voiceOn}
          onPress={toggleVoice}
        />
        {momentId ? (
          <RoundButton
            icon={saved ? 'bookmark' : 'bookmark-outline'}
            label={saved ? 'Remove bookmark' : 'Bookmark this moment'}
            onPress={() => toggleSaved(momentId)}
          />
        ) : null}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  left: { position: 'absolute', left: CONTROLS_MARGIN },
  right: { position: 'absolute', right: CONTROLS_MARGIN, gap: 16, alignItems: 'center' },
});
