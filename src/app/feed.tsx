import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  type ListViewToken,
} from 'react-native';
import { MomentView } from '../components/MomentView';
import { PlayerControls } from '../components/PlayerControls';
import type { Moment } from '../data/types';
import { useBookmarks } from '../lib/bookmarks';
import { getMoments } from '../lib/content';

/** Full-screen vertical feed: one moment per screen, swipe to move on. */
export default function Feed() {
  const { category, saved } = useLocalSearchParams<{ category?: string; saved?: string }>();
  const { height } = useWindowDimensions();
  const { savedIds } = useBookmarks();
  // Snapshot of saved moments when the feed opens, so un-bookmarking one
  // doesn't pull it out from under the person mid-view.
  const [savedSnapshot] = useState(savedIds);
  const [moments, setMoments] = useState<Moment[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    getMoments(category)
      .then((all) =>
        setMoments(
          saved
            ? savedSnapshot
                .map((id) => all.find((m) => m.id === id))
                .filter((m): m is Moment => m != null)
            : all,
        ),
      )
      .catch((e: Error) => setError(e.message));
  }, [category, saved, savedSnapshot]);

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
      <StatusBar style="light" />
      {moments === null && !error ? <ActivityIndicator style={styles.center} color="#fff" /> : null}
      {error ? <Text style={[styles.center, styles.message]}>Couldn't load moments: {error}</Text> : null}
      {moments?.length === 0 ? (
        <Text style={[styles.center, styles.message]}>
          {saved ? 'No saved moments yet.' : 'No moments in this category yet.'}
        </Text>
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
      <PlayerControls momentId={moments?.[activeIndex]?.id} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#000' },
  center: { position: 'absolute', top: '50%', alignSelf: 'center' },
  message: { color: '#fff', paddingHorizontal: 24, textAlign: 'center' },
});
