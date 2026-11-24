import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { Category } from '../data/types';
import { useBookmarks } from '../lib/bookmarks';
import { getCategories } from '../lib/content';
import { colors, radius, spacing } from '../theme';

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

/**
 * Home: a large "Start now" card, a two-column grid of categories,
 * and a full-width card for saved moments.
 */
export default function Home() {
  const insets = useSafeAreaInsets();
  const { savedIds } = useBookmarks();
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch((e: Error) => setError(e.message));
  }, []);

  const savedCount = savedIds.length;

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 32 },
      ]}
    >
      <StatusBar style="dark" />
      <Text style={styles.greeting}>{greeting()}</Text>

      <Link href="/feed" asChild>
        <Card style={styles.hero} color={colors.heroCard}>
          <View style={styles.heroText}>
            <Text style={styles.heroEyebrow}>Today</Text>
            <Text style={styles.heroTitle}>Start now</Text>
            <Text style={styles.body}>Swipe through every moment</Text>
          </View>
          <View style={styles.playButton}>
            <MaterialCommunityIcons name="play" size={30} color={colors.onControl} />
          </View>
        </Card>
      </Link>

      {error ? <Text style={styles.error}>Couldn't load categories: {error}</Text> : null}

      <View style={styles.grid}>
        {categories.map((category, i) => (
          <Link
            key={category.id}
            href={{ pathname: '/feed', params: { category: category.id } }}
            asChild
          >
            <Card
              style={styles.tile}
              color={colors.cardTints[i % colors.cardTints.length]}
              imageUrl={category.coverUrl}
            >
              <Text style={styles.tileTitle}>{category.title}</Text>
              {category.description ? (
                <Text style={styles.tileBody} numberOfLines={2}>
                  {category.description}
                </Text>
              ) : null}
            </Card>
          </Link>
        ))}
      </View>

      {savedCount > 0 ? (
        <Link href={{ pathname: '/feed', params: { saved: '1' } }} asChild>
          <Card style={styles.saved} color={colors.card}>
            <SavedContent count={savedCount} />
          </Card>
        </Link>
      ) : (
        <Card style={styles.saved} color={colors.card}>
          <SavedContent count={0} />
        </Card>
      )}
    </ScrollView>
  );
}

function SavedContent({ count }: { count: number }) {
  return (
    <>
      <MaterialCommunityIcons
        name={count > 0 ? 'bookmark' : 'bookmark-outline'}
        size={26}
        color={colors.ink}
      />
      <Text style={[styles.tileTitle, styles.savedTitle]}>Saved moments</Text>
      <Text style={styles.body}>
        {count > 0
          ? `${count} saved ${count === 1 ? 'moment' : 'moments'}`
          : 'Tap the bookmark on any moment to keep it here'}
      </Text>
    </>
  );
}

type CardProps = {
  style: StyleProp<ViewStyle>;
  color: string;
  imageUrl?: string;
  children: React.ReactNode;
  onPress?: () => void;
};

/** Rounded, softly tinted card. Shows a cover image behind the text when there is one. */
function Card({ style, color, imageUrl, children, ...pressProps }: CardProps) {
  return (
    <Pressable
      {...pressProps}
      disabled={!pressProps.onPress}
      style={({ pressed }) => [styles.card, { backgroundColor: color }, style, pressed && styles.pressed]}
    >
      {imageUrl ? (
        <ImageBackground source={{ uri: imageUrl }} style={StyleSheet.absoluteFill} />
      ) : null}
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: spacing.gutter, gap: spacing.gap },
  greeting: { color: colors.ink, fontSize: 28, fontWeight: '700', marginBottom: 6 },
  card: { borderRadius: radius.card, overflow: 'hidden', padding: 20 },
  pressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  hero: {
    aspectRatio: 940 / 440,
    minHeight: 180,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  heroText: { flexShrink: 1 },
  heroEyebrow: {
    color: colors.inkSoft,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  heroTitle: { color: colors.ink, fontSize: 30, fontWeight: '700', marginTop: 4 },
  body: { color: colors.inkSoft, fontSize: 15, marginTop: 4 },
  playButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.control,
  },
  error: { color: colors.error },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.gap },
  tile: {
    flexBasis: '45%',
    flexGrow: 1,
    aspectRatio: 432 / 228,
    minHeight: 104,
    justifyContent: 'flex-end',
    borderRadius: radius.tile,
    padding: 16,
  },
  tileTitle: { color: colors.ink, fontSize: 17, fontWeight: '700' },
  tileBody: { color: colors.inkSoft, fontSize: 13, marginTop: 2 },
  saved: { minHeight: 150, justifyContent: 'flex-end' },
  savedTitle: { marginTop: 12, fontSize: 20 },
});
