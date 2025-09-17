# ProperForm (Expo + React Native)

ProperForm is a React Native app built with Expo for fitness tracking. It includes user authentication (Firebase), routines, nutrition tracking, chat, and more.

- React Native: 0.74.x
- Expo SDK: 51
- Firebase JS SDK: 10.x
- UI: react-native-paper, react-navigation


## Features
- Authentication with Firebase Email/Password
- Routine selection and generation
- Nutrition logging with remote API
- Various screens for account, friends, messages, etc.


## Project Structure
```
ProperForm/
├─ App.js
├─ app.json
├─ package.json
├─ Components/
│  ├─ firebase.js                # Firebase app + persistent Auth initialization
│  ├─ AsyncStorage/
│  │  └─ config.js              # Alternate Firebase config (unused)
│  ├─ Screens/
│  │  ├─ HomeScreen.js
│  │  ├─ LoginScreen.js
│  │  ├─ RegisterScreen.js
│  │  ├─ RoutineSelectGenerate.js
│  │  ├─ CreateNutrition.js
│  │  └─ ...
│  └─ ...
└─ assets/                       # App icons and splash (currently empty)
```


## Prerequisites
- Node 18+ recommended
- npm or yarn
- Android Studio (for Android emulator) or Xcode (for iOS simulator on macOS)
- Expo CLI via npx (no global install required)
- A Firebase project with Authentication enabled (Email/Password)


## Setup
1) Install dependencies
```
cd ProperForm
npm install
```

2) Configure Firebase
- File: `Components/firebase.js` already includes configuration for project `proper-form-2ccf0`.
- Ensure Firebase Authentication > Sign-in method enables Email/Password.
- If you need to change projects, replace the `firebaseConfig` in `Components/firebase.js` with your project settings from Firebase Console.

3) App icons and splash (optional but recommended)
- `app.json` references these files in `assets/`:
  - `./assets/icon.png`
  - `./assets/splash.png`
  - `./assets/adaptive-icon.png`
  - `./assets/favicon.png`
- Add images with those names to `ProperForm/assets/` to avoid startup warnings/errors. As a quick workaround, you can temporarily remove these fields from `app.json`.


## Running the App
- Start Metro + open Android emulator:
```
npx expo start --android
```
- iOS simulator (macOS only):
```
npx expo start --ios
```
- Web:
```
npx expo start --web
```
- Clear cache if you see stale code or odd bundling errors:
```
npx expo start -c
```

Notes:
- Ensure your terminal is in the app folder: `Proper-Form-Firebase/ProperForm`.
- If you see "Can't find react-native in package.json dependencies", you likely ran from the repo root instead of the app folder.


## Authentication (Firebase) Details
Persistent auth for React Native is set up via AsyncStorage:
- File: `Components/firebase.js`
- Uses `initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) })` and protects against double-initialization by trying `getAuth(app)` first.
- In screens, always use:
```js
import app from '../firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
const auth = getAuth(app);
```

Login example (see `Components/Screens/LoginScreen.js`):
```js
const auth = getAuth(app);
const response = await signInWithEmailAndPassword(auth, email, password);
const token = await response.user.getIdToken();
```


## Nutrition API Calls (Axios)
Several screens call a remote HTTP API (hosted at `http://52.53.203.248/ProperApi`).
- File: `Components/Screens/CreateNutrition.js`
- All Axios calls are wrapped in `try/catch` with timeouts and in-app Alerts to avoid unhandled promise rejections.

If you see `AxiosError: Network Error`:
- Verify the endpoint is reachable from your machine (open in desktop browser).
- Ensure the Android emulator has internet.
- HTTP is allowed in Expo Go. In a standalone Android build, you may need a network security config to allow cleartext HTTP, or switch to HTTPS.


## Common Issues & Troubleshooting
- Expo error: "Can't find react-native in package.json dependencies"
  - Run commands from `ProperForm/` directory.

- Missing assets referenced in `app.json`
  - Add the required images to `assets/` or remove the fields temporarily.

- Firebase Auth warning about AsyncStorage persistence
  - Already fixed in `Components/firebase.js`. Clear cache if you still see it: `npx expo start -c`.

- Register/Login errors
  - `RegisterScreen.js` now shows detailed Firebase error messages and validates inputs before calling Firebase.
  - Ensure Firebase Authentication > Email/Password is enabled.

- Unhandled promise rejection (Axios)
  - Calls are now wrapped. If you still see warnings, confirm API availability and network connectivity.

- OneDrive path issues on Windows
  - If you run into path syncing issues with Metro bundler, consider moving the project out of OneDrive-backed folders.


## Scripts (package.json)
- `npm run start` – `expo start`
- `npm run android` – `expo start --android`
- `npm run ios` – `expo start --ios`
- `npm run web` – `expo start --web`


## Contributing
- Use feature branches and open PRs.
- Keep imports at the top of files and avoid duplicate initialization of Firebase Auth.
- Add error handling for network calls and show user-friendly messages.


## License
This project does not currently specify a license. Add one if you plan to distribute.
