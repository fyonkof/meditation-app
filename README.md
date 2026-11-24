# Meditation App

Full-screen, swipeable meditation "moments": a looping video with separate
music and voiceover tracks that each can be switched off, plus a home screen
to discover moments by category.

- **App:** Expo (React Native) with Expo Router, one codebase for iOS and Android
- **Video:** `expo-video` (use HLS streams from Mux or Cloudflare Stream in production)
- **Audio:** `expo-audio`, music and voiceover as separate files
- **CMS:** Sanity (schema in [`sanity/`](sanity/README.md)); the app shows sample content until it's connected

## Run it on your phone

1. Install [Node.js](https://nodejs.org) (LTS) and the **Expo Go** app on your phone.
2. In this folder, run:
   ```
   npm install
   npx expo start
   ```
3. Scan the QR code with your phone's camera (iPhone) or the Expo Go app (Android).

## Project layout

```
src/app/            Screens (each file is a route)
  _layout.tsx       App shell and audio setup
  index.tsx         Home: "Start now" and categories
  feed.tsx          Full-screen swipe feed
src/components/     MomentView (video + audio), PlayerControls, RoundButton
src/lib/            Content loading (Sanity or sample), audio prefs, bookmarks
src/theme/          Shared colors and sizes
src/data/           Content types and sample content
sanity/             CMS content model and setup steps
```

## Shipping to the app stores

Builds and store submissions use [EAS](https://docs.expo.dev/eas/):
`npx eas-cli@latest build` and `npx eas-cli@latest submit`. You'll need an
Apple Developer account and a Google Play Console account.
