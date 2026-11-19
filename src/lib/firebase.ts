import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';

export interface FirebaseClientConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  appId: string;
}

function readFirebaseConfig(): FirebaseClientConfig | null {
  const apiKey = import.meta.env?.VITE_FIREBASE_API_KEY?.trim() || '';
  const authDomain = import.meta.env?.VITE_FIREBASE_AUTH_DOMAIN?.trim() || '';
  const projectId = import.meta.env?.VITE_FIREBASE_PROJECT_ID?.trim() || '';
  const appId = import.meta.env?.VITE_FIREBASE_APP_ID?.trim() || '';

  if (!apiKey || !authDomain || !projectId || !appId) {
    return null;
  }

  return { apiKey, authDomain, projectId, appId };
}

let cachedApp: FirebaseApp | null = null;
let cachedAuth: Auth | null = null;

/**
 * Safely initializes and returns the singleton Firebase App instance.
 * Returns null if VITE_FIREBASE_* environment variables are not configured.
 * Avoids duplicate initialization across HMR or repeated calls.
 */
export function getFirebaseApp(): FirebaseApp | null {
  if (cachedApp) {
    return cachedApp;
  }

  const config = readFirebaseConfig();
  if (!config) {
    return null;
  }

  cachedApp = getApps().length > 0 ? getApp() : initializeApp(config);
  return cachedApp;
}

/**
 * Safely initializes and returns the singleton Firebase Auth instance.
 * Returns null if Firebase is not configured.
 */
export function getFirebaseAuth(): Auth | null {
  if (cachedAuth) {
    return cachedAuth;
  }

  const app = getFirebaseApp();
  if (!app) {
    return null;
  }

  cachedAuth = getAuth(app);
  return cachedAuth;
}
