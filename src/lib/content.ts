import { sampleCategories, sampleMoments } from '../data/sampleContent';
import type { Category, Moment } from '../data/types';

/**
 * Content source. When EXPO_PUBLIC_SANITY_PROJECT_ID is set, content comes
 * from Sanity's public CDN API. Otherwise the app uses the sample content.
 */
const projectId = process.env.EXPO_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.EXPO_PUBLIC_SANITY_DATASET ?? 'production';
const apiVersion = '2025-02-19';

async function sanityQuery<T>(query: string): Promise<T> {
  const url = `https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(query)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Sanity request failed: ${res.status}`);
  const json = (await res.json()) as { result: T };
  return json.result;
}

export async function getCategories(): Promise<Category[]> {
  if (!projectId) return sampleCategories;
  return sanityQuery<Category[]>(
    `*[_type == "category"] | order(order asc) {
      "id": slug.current, title, description, "coverUrl": cover.asset->url
    }`,
  );
}

export async function getMoments(categoryId?: string): Promise<Moment[]> {
  if (!projectId) {
    return categoryId
      ? sampleMoments.filter((m) => m.categoryIds.includes(categoryId))
      : sampleMoments;
  }
  const filter = categoryId
    ? `&& "${categoryId.replace(/"/g, '')}" in categories[]->slug.current`
    : '';
  return sanityQuery<Moment[]>(
    `*[_type == "moment" && published == true ${filter}] | order(_createdAt desc) {
      "id": _id, title, caption, videoUrl,
      "musicUrl": music.asset->url,
      "voiceoverUrl": voiceover.asset->url,
      "categoryIds": categories[]->slug.current
    }`,
  );
}
