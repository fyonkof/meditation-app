# Sanity content model

These files define what you edit in the CMS: **Moments** (video, music,
voiceover, caption, categories) and **Categories** (shown on the home screen).

## Set up the Studio (one time)

1. From this `sanity/` folder, run `npm create sanity@latest -- --template clean --typescript --output-path studio`
   and sign in when asked. Note the **project ID** it prints.
2. Copy `schemaTypes/` into `studio/schemaTypes/`, replacing the empty one.
3. Run `npm run dev` inside `studio/` and open the local URL to add content.
   Run `npx sanity deploy` to host the Studio online.
4. In Sanity's project settings, under **API → CORS origins**, nothing is needed
   for the mobile app. Keep the `production` dataset **public** so the app can read it.

## Connect the app

Create `.env.local` in the repo root:

```
EXPO_PUBLIC_SANITY_PROJECT_ID=your-project-id
EXPO_PUBLIC_SANITY_DATASET=production
```

Restart `npx expo start`. The app now loads published moments from Sanity
instead of the sample content.
