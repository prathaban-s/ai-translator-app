import { LanguageInterface } from "@/types";

export const SILENCE_DURATION_THRESHOLD = 2000;

export const RECORDING_STOP_AMPLITUDE_VALUE = -30;

export const DEFAULT_SOURCE_LANGUAGE: LanguageInterface = {
  dir: "en",
  name: "English",
  nativeName: "English",
  code: "en",
};

export const DEFAULT_TARGET_LANGUAGE: LanguageInterface = {
  dir: "hi",
  name: "Hindi",
  nativeName: "हिन्दी",
  code: "hi",
};

export const MODES = {
  STANDARD: {
    LABEL: "Standard",
    VALUE: "standard",
  },
  CONVERSATION: {
    LABEL: "Conversation",
    VALUE: "conversation",
  },
};

export const DEFAULT_MODE = MODES.STANDARD;

export const APP_OS = {
  ANDROID: "android",
  IOS: "ios",
  WEB: "web",
};

export const REQUEST_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
};
