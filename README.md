<div align="center">

<img src="assets/icon.png" width="96" alt="Heartprint icon" />

# Heartprint

**How well do your people really know you?**

Create a quick test about yourself, send it with a code, and get a funny, shareable result card.

[![Expo](https://img.shields.io/badge/Expo-57-000020?style=flat-square&logo=expo&logoColor=white)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React_Native-0.86-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactnative.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black)](https://firebase.google.com)

[Web version](https://heartprint-green.vercel.app)

<img src="store/screenshot-en-1-hook.png" width="19%" alt="Hook" />
<img src="store/screenshot-en-2-create.png" width="19%" alt="Create" />
<img src="store/screenshot-en-3-share.png" width="19%" alt="Share" />
<img src="store/screenshot-en-4-story.png" width="19%" alt="Story" />
<img src="store/screenshot-en-5-mytests.png" width="19%" alt="My tests" />

</div>

## How it works

1. **Pick a category:** partner, mom, dad, best friend, ex, or anonymous.
2. **Answer 12 short questions** about yourself (about a minute).
3. **Share your test** with a code over WhatsApp or Instagram.
4. **They play,** and both of you see how well they really know you.

Every result ends with a stylish, share-ready card made for Stories.

## Tech stack

| Layer | Tools |
|---|---|
| App | Expo SDK 57, React Native 0.86, React 19, TypeScript |
| Backend | Firebase (Firestore, Cloud Functions) |
| Monetization | Google Mobile Ads (interstitial and rewarded) |
| Web | Expo web build, deployed on Vercel |

## Project structure

```
src/
  screens/     Home, CreateQuiz, PlayQuiz, Result, Share, MyTests, EnterCode
  components/  Shared UI
  backend/     Firebase, quizzes, analytics, notifications
  ads/         Ad placement logic
  i18n/        Translations and locale detection
functions/     Firebase Cloud Functions
store/         Store listing copy, screenshots and setup guides
```

## Getting started

```bash
npm install
npx expo start
```

Ads only show in a development or production build (EAS), not in Expo Go or on the web.
Setup guides for Firebase, AdMob and the Play Store are in [`store/`](store/).

## License

[MIT](LICENSE)
