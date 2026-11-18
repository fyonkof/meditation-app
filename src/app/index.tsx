import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { Category } from '../data/types';
import { getCategories } from '../lib/content';

/** Home screen: start the full feed, or discover moments by category. */
export default function Home() {
  const insets = useSafeAreaInsets();
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch((e: Error) => setError(e.message));
  }, []);

  return (
    <FlatList
      data={categories}
      keyExtractor={(c) => c.id}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + 24 }]}
      ListHeaderComponent={
        <View>
          <Text style={styles.heading}>Find your moment</Text>
          <Link href="/feed" asChild>
            <Pressable style={styles.hero}>
              <Text style={styles.heroTitle}>Start now</Text>
              <Text style={styles.heroBody}>Swipe through every moment</Text>
            </Pressable>
          </Link>
          <Text style={styles.section}>Categories</Text>
          {error ? <Text style={styles.error}>Couldn't load categories: {error}</Text> : null}
        </View>
      }
      renderItem={({ item }) => (
        <Link href={{ pathname: '/feed', params: { category: item.id } }} asChild>
          <Pressable style={styles.tile}>
            <Text style={styles.tileTitle}>{item.title}</Text>
            {item.description ? <Text style={styles.tileBody}>{item.description}</Text> : null}
          </Pressable>
        </Link>
      )}
    />
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 16, paddingBottom: 40 },
  heading: { color: '#fff', fontSize: 30, fontWeight: '700', marginBottom: 20 },
  hero: { backgroundColor: '#1F3A4D', borderRadius: 20, padding: 24, marginBottom: 28 },
  heroTitle: { color: '#fff', fontSize: 22, fontWeight: '600' },
  heroBody: { color: 'rgba(255,255,255,0.75)', fontSize: 15, marginTop: 4 },
  section: { color: '#fff', fontSize: 18, fontWeight: '600', marginBottom: 12 },
  error: { color: '#F2A7A7', marginBottom: 12 },
  row: { gap: 12, marginBottom: 12 },
  tile: { flex: 1, backgroundColor: '#18212B', borderRadius: 16, padding: 16, minHeight: 110 },
  tileTitle: { color: '#fff', fontSize: 17, fontWeight: '600' },
  tileBody: { color: 'rgba(255,255,255,0.65)', fontSize: 13, marginTop: 6 },
});
