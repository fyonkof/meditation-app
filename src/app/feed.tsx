import { router, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  type ListViewToken,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AudioToggles } from '../components/AudioToggles';
import { MomentView } from '../components/MomentView';
import type { Moment } from '../data/types';
import { getMoments } from '../lib/content';

/** Full-screen vertical feed: one moment per screen, swipe to move on. */
export default function Feed() {
  const { category } = useLocalSearchParams<{ category?: string }>();
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [moments, setMoments] = useState<Moment[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    getMoments(category)
      .then(setMoments)
      .catch((e: Error) => setError(e.message));
  }, [category]);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ListViewToken[] }) => {
      const first = viewableItems[0];
      if (first?.index != null) setActiveIndex(first.index);
    },
  ).current;

  const renderItem = useCallback(
    ({ item, index }: { item: Moment; index: number }) => (
      <MomentView moment={item} active={index === activeIndex} height={height} />
    ),
    [activeIndex, height],
  );

  return (
    <View style={styles.screen}>
      {moments === null && !error ? <ActivityIndicator style={styles.center} color="#fff" /> : null}
      {error ? <Text style={[styles.center, styles.message]}>Couldn't load moments: {error}</Text> : null}
      {moments?.length === 0 ? (
        <Text style={[styles.center, styles.message]}>No moments in this category yet.</Text>
      ) : null}
      {moments && moments.length > 0 ? (
        <FlatList
          data={moments}
          keyExtractor={(m) => m.id}
          renderItem={renderItem}
          pagingEnabled
          showsVerticalScrollIndicator={false}
          decelerationRate="fast"
          getItemLayout={(_, index) => ({ length: height, offset: height * index, index })}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{ itemVisiblePercentThreshold: 80 }}
          // Keep only the current, previous and next moment mounted, so at most
          // three video players exist and the next one is already loading.
          windowSize={3}
          initialNumToRender={1}
          maxToRenderPerBatch={1}
        />
      ) : null}
      <Pressable
        onPress={() => router.back()}
        style={[styles.back, { top: insets.top + 12 }]}
        accessibilityRole="button"
        accessibilityLabel="Back to home"
      >
        <Text style={styles.backText}>‹ Home</Text>
      </Pressable>
      <AudioToggles top={insets.top + 12} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#000' },
  center: { position: 'absolute', top: '50%', alignSelf: 'center' },
  message: { color: '#fff', paddingHorizontal: 24, textAlign: 'center' },
  back: {
    position: 'absolute',
    left: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  backText: { color: '#fff', fontSize: 15, fontWeight: '600' },
});
