import BottomNavigationBar from "@/components/BottomNavigationBar";
import LanguageModal from "@/components/LanguageModal";
import SourceLanguageBlock from "@/components/SourceLanguageBlock";
import SwitchLanguageBlock from "@/components/SwitchLanguageBlock";
import TargetLanguageBlock from "@/components/TargetLanguageBlock";
import {
  APP_OS,
  DEFAULT_MODE,
  DEFAULT_SOURCE_LANGUAGE,
  DEFAULT_TARGET_LANGUAGE,
  MODES,
} from "@/constants";
import { ThemeColor } from "@/constants/Colors";
import { apiToastErrorMessage, apiToastMessage } from "@/lib/toast-utils";
import { endpoint } from "@/services";
import { request } from "@/services/request";
import { LanguageInterface, ModeInterface } from "@/types";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Platform,
  Pressable,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Speech from "expo-speech";
import {
  CAN_SPEAK_KEY,
  SOURCE_LANGUAGE_KEY,
  TARGET_LANGUAGE_KEY,
  getStorageItemAsync,
  setStorageItemAsync,
} from "@/lib/local-storage-utils";
import { AppContent } from "@/constants/AppContent";
import SettingsModal from "@/components/SettingsModal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Device from "expo-device";
import ConversationTranslateBlock from "@/components/ConversationTranslateBlock";
import * as Application from "expo-application";

const Home = () => {
  const [sourceLanguage, setSourceLanguage] = useState<LanguageInterface>(
    DEFAULT_SOURCE_LANGUAGE
  );
  const [targetLanguage, setTargetLanguage] = useState<LanguageInterface>(
    DEFAULT_TARGET_LANGUAGE
  );
  const [mode, setMode] = useState<ModeInterface>(MODES.STANDARD);

  const [targetLanguageText, setTargetLanguageText] = useState("");
  const [sourceLanguageText, setSourceLanguageText] = useState("");

  const [languages, setLanguages] = useState<LanguageInterface[]>([]);

  // Modal visibility states
  const [isSourceLanguageModalVisible, setIsSourceLanguageModalVisible] =
    useState<boolean>(false);
  const [isTargetLanguageModalVisible, setIsTargetLanguageModalVisible] =
    useState<boolean>(false);
  const [isSettingsModalVisible, setIsSettingsModalVisible] =
    useState<boolean>(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isTranslating, setIsTranslating] = useState(false);

  const [showExpandedView, setShowExpandedView] = useState(false);
  const [canAutoSpeak, setCanAutoSpeak] = useState(true);

  const isStandardMode = mode.VALUE === MODES.STANDARD.VALUE;

  const onPressSwitch = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setSourceLanguageText(targetLanguageText);
    setTargetLanguageText(sourceLanguageText);
  };

  const onSelectSourceLanguage = async (language: LanguageInterface) => {
    if (targetLanguage.nativeName === language.nativeName) {
      apiToastMessage(AppContent.en.sameLanguageError);
      return;
    }
    setSourceLanguage(language);
    setIsSourceLanguageModalVisible(false);
    setTargetLanguageText("");
    await setStorageItemAsync(SOURCE_LANGUAGE_KEY, language);
  };

  const onSelectTargetLanguage = async (language: LanguageInterface) => {
    if (sourceLanguage.nativeName === language.nativeName) {
      apiToastMessage(AppContent.en.sameLanguageError);
      return;
    }
    setTargetLanguage(language);
    setIsTargetLanguageModalVisible(false);
    await setStorageItemAsync(TARGET_LANGUAGE_KEY, language);
    if (sourceLanguageText) {
      translateText(sourceLanguageText, sourceLanguage.code, language.code);
    }
  };

  const onSpeakText = async (
    text: string,
    languageCode: string,
    rate: number
  ) => {
    // TODO: Implement speech once the API is ready
    return;
    if (!text.trim()) return;
    const isSpeaking = await Speech.isSpeakingAsync();
    if (isSpeaking) {
      await Speech.stop();
      return;
    }
    try {
      Speech.speak(text, {
        language: languageCode,
        rate: rate,
      });
    } catch (error) {
      apiToastErrorMessage(error);
    }
  };

  const setAutoSpeak = async (value: boolean) => {
    setCanAutoSpeak(value);
    await setStorageItemAsync(CAN_SPEAK_KEY, value);
  };

  const onPressReset = () => {
    setSourceLanguageText("");
    setTargetLanguageText("");
    setIsSettingsModalVisible(false);
  };

  const getLanguages = async () => {
    setIsLoading(true);
    try {
      const res = await request(endpoint.language.get);
      setLanguages(res?.data?.data);
    } catch (error) {
      apiToastErrorMessage(error);
    } finally {
      setIsLoading(false);
    }
  };

  const translateText = async (
    text: string,
    sourceLanguageCode: string,
    targetLanguageCode: string
  ) => {
    if (!text.trim()) {
      return;
    }
    try {
      setIsTranslating(true);
      const payload = {
        sourceLanguage: sourceLanguageCode,
        targetLanguage: targetLanguageCode,
        text: text.trim(),
        deviceId:
          Platform.OS === "android"
            ? Application.getAndroidId()
            : Device.osBuildId,
        deviceType: Platform.OS,
        deviceTime: new Date().toISOString(),
      };
      const res = await request({ ...endpoint.translate.post, payload });
      if (res?.data?.data) {
        const translatedText = res.data.data;
        setTargetLanguageText(translatedText);
        if (canAutoSpeak) {
          onSpeakText(translatedText, targetLanguageCode, 1);
        }
      }
    } catch (error) {
      apiToastErrorMessage(error);
    } finally {
      setIsTranslating(false);
    }
  };

  const sourceMicIconButton = (
    <View style={[styles.sourceMicIconContainer]}>
      <Pressable
        onPress={() => {
          apiToastMessage(AppContent.en.speechErrorMessage);
        }}
      >
        <View style={styles.sourceMicIcon}>
          <Ionicons
            name="mic-outline"
            size={50}
            color={ThemeColor.dark.primaryForeground}
          />
        </View>
      </Pressable>
    </View>
  );

  const targetMicIconButton = (
    <Pressable
      onPress={() => {
        apiToastMessage(AppContent.en.speechErrorMessage);
      }}
    >
      <View style={styles.targetMicIcon}>
        <Ionicons
          name="mic-outline"
          size={50}
          color={ThemeColor.dark.primary}
        />
      </View>
    </Pressable>
  );

  const getRestoreItem = async () => {
    const sourceLanguage = await getStorageItemAsync(SOURCE_LANGUAGE_KEY);
    const targetLanguage = await getStorageItemAsync(TARGET_LANGUAGE_KEY);
    const canAutoSpeak = await getStorageItemAsync(CAN_SPEAK_KEY);
    if (sourceLanguage) {
      setSourceLanguage(sourceLanguage);
    }
    if (targetLanguage) {
      setTargetLanguage(targetLanguage);
    }
    if (canAutoSpeak !== null) {
      setCanAutoSpeak(canAutoSpeak);
    }
  };

  useEffect(() => {
    (() => {
      getRestoreItem();
      getLanguages();
    })();
  }, []);

  useEffect(() => {
    if (!sourceLanguageText) {
      setTargetLanguageText("");
    }
  }, [sourceLanguageText]);

  useEffect(() => {
    if (!targetLanguageText) {
      setShowExpandedView(false);
    }
  }, [targetLanguageText]);

  const height = Dimensions.get("window").height;
  const insects = useSafeAreaInsets();

  const isAndroid = Platform.OS === APP_OS.ANDROID;

  const conversationMode = (
    <>
      <ScrollView
        style={[
          styles.container,
          { maxHeight: height },
          isAndroid && { marginTop: insects.top },
        ]}
      >
        <View style={[styles.textView, !isAndroid && { height: 80 }]}></View>
        <TargetLanguageBlock
          targetLanguageText={targetLanguageText}
          targetLanguage={targetLanguage}
          showExpandedView={showExpandedView}
          setShowExpandedView={setShowExpandedView}
          onSpeakText={onSpeakText}
          isLoading={isTranslating}
        />
        <SwitchLanguageBlock
          sourceLanguage={sourceLanguage}
          targetLanguage={targetLanguage}
          onPressSwitchLanguage={onPressSwitch}
          onPressSourceLanguage={() => {
            setIsSourceLanguageModalVisible(true);
          }}
          onPressTargetLanguage={() => setIsTargetLanguageModalVisible(true)}
          mode={mode}
        />
        {showExpandedView ? null : (
          <>
            <SourceLanguageBlock
              sourceLanguage={sourceLanguage}
              targetLanguage={targetLanguage}
              sourceLanguageText={sourceLanguageText}
              setSourceLanguageText={setSourceLanguageText}
              translateText={translateText}
              onSpeakText={onSpeakText}
            />
            <BottomNavigationBar
              setIsSettingsModalVisible={setIsSettingsModalVisible}
            />
            {sourceMicIconButton}
          </>
        )}
        <View
          style={[
            styles.targetMicIconContainer,
            isAndroid ? { top: 15 } : { top: 50 },
          ]}
        >
          {targetMicIconButton}
        </View>
      </ScrollView>
    </>
  );

  const standardMode = (
    <>
      <ScrollView>
        {
          <View
            style={{
              height: insects.top,
              backgroundColor: ThemeColor.dark.primary,
            }}
          />
        }
        <SwitchLanguageBlock
          sourceLanguage={sourceLanguage}
          targetLanguage={targetLanguage}
          onPressSwitchLanguage={onPressSwitch}
          onPressSourceLanguage={() => {
            setIsSourceLanguageModalVisible(true);
          }}
          onPressTargetLanguage={() => setIsTargetLanguageModalVisible(true)}
          mode={mode}
        />
        <ConversationTranslateBlock
          sourceLanguageText={sourceLanguageText}
          setSourceLanguageText={setSourceLanguageText}
          targetLanguageText={targetLanguageText}
          setTargetLanguageText={setTargetLanguageText}
          translateText={translateText}
          onSpeakText={onSpeakText}
          sourceLanguage={sourceLanguage}
          targetLanguage={targetLanguage}
          showExpandedView={showExpandedView}
          setShowExpandedView={setShowExpandedView}
          isTranslating={isTranslating}
          mode={mode}
        />
        {!showExpandedView && (
          <>
            <BottomNavigationBar
              setIsSettingsModalVisible={setIsSettingsModalVisible}
            />
            {sourceMicIconButton}
          </>
        )}
      </ScrollView>
    </>
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
          statusBarColor: isStandardMode
            ? ThemeColor.dark.primary
            : ThemeColor.dark.statusBarBackground,
          contentStyle: { backgroundColor: ThemeColor.dark.background },
        }}
      />
      <>
        {isStandardMode ? standardMode : conversationMode}
        <LanguageModal
          title={AppContent.en.selectSouceLanguage}
          languages={languages}
          selectedLanguage={sourceLanguage}
          setSelectLanguage={onSelectSourceLanguage}
          showLanguageModal={isSourceLanguageModalVisible}
          setShowLanguageModal={setIsSourceLanguageModalVisible}
          isLoading={isLoading}
        />
        <LanguageModal
          title={AppContent.en.selectTargetLanguage}
          languages={languages}
          selectedLanguage={targetLanguage}
          setSelectLanguage={onSelectTargetLanguage}
          showLanguageModal={isTargetLanguageModalVisible}
          setShowLanguageModal={setIsTargetLanguageModalVisible}
          isLoading={isLoading}
        />
        <SettingsModal
          showSettingsModal={isSettingsModalVisible}
          setShowSettingsModal={setIsSettingsModalVisible}
          canAutoSpeak={canAutoSpeak}
          setAutoSpeak={setAutoSpeak}
          onPressReset={onPressReset}
          mode={mode}
          setMode={setMode}
        />
      </>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textView: {
    height: 40,
    backgroundColor: ThemeColor.dark.statusBarBackground,
  },
  sourceMicIconContainer: {
    position: "absolute",
    bottom: 15,
    left: "41%",
    zIndex: 10,
  },
  sourceMicIcon: {
    backgroundColor: ThemeColor.dark.primary,
    height: 60,
    width: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  targetMicIconContainer: {
    position: "absolute",
    left: "41%",
    zIndex: 100,
  },
  targetMicIcon: {
    backgroundColor: ThemeColor.dark.bottomNavigationBackground,
    height: 60,
    width: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ rotate: "180deg" }],
  },
});
