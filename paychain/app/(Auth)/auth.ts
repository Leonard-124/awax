
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const BASE_URL = 'https://paychain-backend.onrender.com';

export const TOKEN_KEYS = {
  access: 'accessToken',
  refresh: 'refreshToken',
} as const;

/**
 * Retrieve the stored access token.
 * Returns null — never the string "undefined" — if nothing is stored.
 */
export async function getAccessToken(): Promise<string | null> {
  const token = await AsyncStorage.getItem(TOKEN_KEYS.access);
  // Guard against corrupted storage (e.g. the string "undefined" or "null")
  if (!token || token === 'undefined' || token === 'null') return null;
  return token;
}

export async function getRefreshToken(): Promise<string | null> {
  const token = await AsyncStorage.getItem(TOKEN_KEYS.refresh);
  if (!token || token === 'undefined' || token === 'null') return null;
  return token;
}

export async function saveTokens(accessToken: string, refreshToken: string) {
  await AsyncStorage.setItem(TOKEN_KEYS.access, accessToken);
  await AsyncStorage.setItem(TOKEN_KEYS.refresh, refreshToken);
}

export async function clearTokens() {
  await AsyncStorage.removeItem(TOKEN_KEYS.access);
  await AsyncStorage.removeItem(TOKEN_KEYS.refresh);
}



/**
 * Try to get a new access token using the stored refresh token.
 * Returns the new access token on success, null on failure.
 */
export async function tryRefresh(): Promise<string | null> {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) return null;

  try {
    const res = await fetch(`${BASE_URL}/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: refreshToken }),
    });

    if (!res.ok) return null;

    const data = await res.json();

    if (!data.accessToken || !data.refreshToken) return null;

    await saveTokens(data.accessToken, data.refreshToken);
    return data.accessToken;
  } catch {
    return null;
  }
}

/**
 * Authenticated fetch — automatically refreshes the access token on 401.
 * Redirects to login and throws 'SESSION_EXPIRED' if refresh also fails.
 */
export async function authedFetch(
  path: string,
  options: RequestInit = {}
): Promise<Response> {
  let token = await getAccessToken();

  if (!token) {
    // No token at all — go to login
    await clearTokens();
    router.replace('/');
    throw new Error('SESSION_EXPIRED!');
  }

  const makeRequest = (t: string) =>
    fetch(`${BASE_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
        // This is the critical line — must be exactly "Bearer <token>"
        Authorization: `Bearer ${t}`,
      },
    });

  let res = await makeRequest(token);

  // Token expired — try a silent refresh
  if (res.status === 401) {
    const newToken = await tryRefresh();

    if (!newToken) {
      await clearTokens();
      router.replace('/');
      throw new Error('SESSION_EXPIRED');
    }

    // Retry with the fresh token
    res = await makeRequest(newToken);
  }

  return res;
}