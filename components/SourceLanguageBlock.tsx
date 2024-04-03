import { ThemeColor } from "@/constants/Colors";
import { LanguageInterface } from "@/types";
import React, { createRef, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import LanguageOptionsBlock from "./LanguageOptionsBlock";
import * as Clipboard from "expo-clipboard";
import { AppContent } from "@/constants/AppContent";
import { APP_OS } from "@/constants";

interface SourceLanguageBlockProps {
  sourceLanguage: LanguageInterface;
  targetLanguage: LanguageInterface;
  sourceLanguageText: string;
  setSourceLanguageText: (sourceLanguageText: string) => void;
  translateText: (
    text: string,
    sourceLanguage: string,
    targetLanguage: string
  ) => void;
  onSpeakText: (text: string, languageCode: string, rate: number) => void;
}

const SourceLanguageBlock = ({
  sourceLanguage,
  targetLanguage,
  sourceLanguageText,
  setSourceLanguageText,
  translateText,
  onSpeakText,
}: SourceLanguageBlockProps) => {
  const sourceLanguageTextInputRef = createRef<TextInput>();

  const [isInputFocused, setIsInputFocused] = useState(false);

  const height = Dimensions.get("window").height;

  const onPressPasteIcon = async () => {
    const text = await Clipboard.getStringAsync();
    const copiedText = sourceLanguageText + text;
    setSourceLanguageText(copiedText);
    translateText(copiedText, sourceLanguage.code, targetLanguage.code);
  };

  const onChangeText = (text: string) => {
    if (text[text.length - 1] === "\n" && text.length > 1) {
      sourceLanguageTextInputRef.current?.blur();
      text = text.trim();
      translateText(text, sourceLanguage.code, targetLanguage.code);
    }
    setSourceLanguageText(text);
  };
  const inpuBlockHeight =
    Platform.OS === APP_OS.IOS ? height * 0.41 : height * 0.43;
  return (
    <View>
      <View style={{ paddingHorizontal: 10 }}>
        <LanguageOptionsBlock
          onPressPasteIcon={onPressPasteIcon}
          type="source"
          text={sourceLanguageText}
          onSpeakText={(rate) =>
            onSpeakText(sourceLanguageText, sourceLanguage.code, rate)
          }
        />
      </View>
      <View style={[styles.container, { height: inpuBlockHeight }]}>
        <TextInput
          ref={sourceLanguageTextInputRef}
          style={styles.sourceTextInput}
          placeholder={AppContent.en.translateInputPlaceHolder(
            sourceLanguage.name,
            targetLanguage.name
          )}
          placeholderTextColor={ThemeColor.dark.textMuted}
          multiline
          value={sourceLanguageText}
          onChangeText={onChangeText}
          onFocus={() => {
            setIsInputFocused(true);
          }}
          onBlur={() => {
            setIsInputFocused(false);
          }}
        />
      </View>
    </View>
  );
};

export default SourceLanguageBlock;

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    backgroundColor: ThemeColor.dark.background,
    paddingHorizontal: 20,
    paddingBottom: 50,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  sourceTextInput: {
    fontSize: 28,
    textAlignVertical: "center",
    textAlign: "center",
    fontFamily: "Inter-Medium",
    minHeight: 200,
    width: "100%",
    alignSelf: "center",
    paddingBottom: 25,
  },
  optionsBlock: {
    // position: "absolute",
    top: 0,
  },
});
