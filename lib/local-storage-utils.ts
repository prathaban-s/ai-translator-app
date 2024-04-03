import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import * as React from "react";
import { Platform } from "react-native";

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, null]
): UseStateHook<T> {
  return React.useReducer(
    (
      state: [boolean, T | null],
      action: T | null = null
    ): [boolean, T | null] => [false, action],
    initialValue
  ) as UseStateHook<T>;
}

export async function setStorageItemAsync(key: string, value: any | null) {
  if (Platform.OS === "web") {
    return;
  }
  await SecureStore.setItemAsync(key, JSON.stringify(value));
}

export async function getStorageItemAsync(key: string) {
  if (Platform.OS === "web") {
    return null;
  }
  const value = await SecureStore.getItemAsync(key);
  if (value) {
    return JSON.parse(value);
  }
  return null;
}

export function useStorageState(key: string): UseStateHook<string> {
  // Public
  const [state, setState] = useAsyncState<string>();

  // Get
  React.useEffect(() => {
    if (Platform.OS === "web") {
      try {
        if (typeof localStorage !== "undefined") {
          setState(localStorage.getItem(key));
        }
      } catch (e) {
        console.error("Local storage is unavailable:", e);
      }
    } else {
      SecureStore.getItemAsync(key).then((value) => {
        setState(value);
      });
    }
  }, [key]);

  // Set
  const setValue = React.useCallback(
    (value: string | null) => {
      setState(value);
      setStorageItemAsync(key, value);
    },
    [key]
  );

  return [state, setValue];
}

export const setAccessToken = async (accessToken: string) => {
  try {
    await AsyncStorage.setItem("accessToken", accessToken);
  } catch (e) {
    console.error("Error storing access token", e);
  }
};

export const getAccessToken = async () => {
  try {
    return await AsyncStorage.getItem("accessToken");
  } catch (e) {
    console.error("Error getting access token", e);
  }
  return null;
};

export const SOURCE_LANGUAGE_KEY = "sourceLanguage";
export const TARGET_LANGUAGE_KEY = "targetLanguage";
export const CAN_SPEAK_KEY = "canSpeak";
