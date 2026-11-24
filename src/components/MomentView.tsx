import { useAudioPlayer } from 'expo-audio';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { Moment } from '../data/types';
import { useAudioPrefs } from '../lib/audioPrefs';
import { CONTROLS_MARGIN } from './PlayerControls';
import { ROUND_BUTTON_SIZE } from './RoundButton';

type Props = {
  moment: Moment;
  /** True when this moment fills the screen. Only the active moment plays. */
  active: boolean;
  height: number;
};

export function MomentView({ moment, active, height }: Props) {
  const { musicOn, voiceOn } = useAudioPrefs();
  const insets = useSafeAreaInsets();
  // Sit the title just above the back button in the bottom-left corner.
  const overlayBottom = insets.bottom + CONTROLS_MARGIN + ROUND_BUTTON_SIZE + 20;

  // Video carries no sound of its own; music and voiceover are separate tracks
  // so people can switch each one off.
  const video = useVideoPlayer(moment.videoUrl, (player) => {
    player.loop = true;
    player.muted = true;
    player.audioMixingMode = 'mixWithOthers';
  });
  const music = useAudioPlayer(moment.musicUrl ?? null);
  const voice = useAudioPlayer(moment.voiceoverUrl ?? null);

  useEffect(() => {
    music.loop = true;
  }, [music]);

  // Start or stop the video when the moment becomes active.
  useEffect(() => {
    if (active) {
      video.play();
    } else {
      video.pause();
      video.currentTime = 0;
      // Restart the voiceover next time this moment is shown.
      voice.pause();
      void voice.seekTo(0);
    }
  }, [active, video, voice]);

  useEffect(() => {
    if (active && musicOn && moment.musicUrl) music.play();
    else music.pause();
  }, [active, musicOn, music, moment.musicUrl]);

  useEffect(() => {
    if (active && voiceOn && moment.voiceoverUrl) voice.play();
    else voice.pause();
  }, [active, voiceOn, voice, moment.voiceoverUrl]);

  return (
    <View style={[styles.container, { height }]}>
      <VideoView
        player={video}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        nativeControls={false}
      />
      <View style={[styles.overlay, { bottom: overlayBottom }]} pointerEvents="none">
        <Text style={styles.title}>{moment.title}</Text>
        {moment.caption ? <Text style={styles.caption}>{moment.caption}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', backgroundColor: '#000' },
  overlay: { position: 'absolute', left: CONTROLS_MARGIN, right: CONTROLS_MARGIN + ROUND_BUTTON_SIZE + 16 },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowRadius: 8,
  },
  caption: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 16,
    marginTop: 6,
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowRadius: 8,
  },
});
