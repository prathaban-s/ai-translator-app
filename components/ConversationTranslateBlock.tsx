import { LanguageInterface, ModeInterface } from "@/types";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import LanguageOptionsBlock from "./LanguageOptionsBlock";
import * as Clipboard from "expo-clipboard";
import { ThemeColor } from "@/constants/Colors";
import { AppContent } from "@/constants/AppContent";
import ThreeDotAnimation from "./ThreeDottedAnimation";
import { commonStyles } from "@/styles/commonStyles";
import { APP_OS } from "@/constants";

interface ConversationTranslateBlockProps {
  sourceLanguageText: string;
  setSourceLanguageText: (sourceLanguageText: string) => void;
  targetLanguageText: string;
  setTargetLanguageText: (targetLanguageText: string) => void;
  translateText: (
    text: string,
    sourceLanguage: string,
    targetLanguage: string
  ) => void;
  onSpeakText: (text: string, languageCode: string, rate: number) => void;
  sourceLanguage: LanguageInterface;
  targetLanguage: LanguageInterface;
  showExpandedView: boolean;
  setShowExpandedView: (showExpandedView: boolean) => void;
  isTranslating: boolean;
  mode: ModeInterface;
}

const ConversationTranslateBlock = ({
  sourceLanguageText,
  setSourceLanguageText,
  targetLanguageText,
  translateText,
  onSpeakText,
  sourceLanguage,
  targetLanguage,
  showExpandedView,
  setShowExpandedView,
  isTranslating,
  mode,
}: ConversationTranslateBlockProps) => {
  const sourceLanguageTextInputRef = useRef<TextInput>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const height = Dimensions.get("window").height;

  const onChangeText = (text: string) => {
    if (text[text.length - 1] === "\n" && text.length > 1) {
      sourceLanguageTextInputRef.current?.blur();
      text = text.trim();
      translateText(text, sourceLanguage.code, targetLanguage.code);
    }
    setSourceLanguageText(text);
  };
  const onPressPasteIcon = async () => {
    const text = await Clipboard.getStringAsync();
    const copiedText = sourceLanguageText + text;
    setSourceLanguageText(copiedText);
    translateText(copiedText, sourceLanguage.code, targetLanguage.code);
  };

  const scrollViewHeight =
    Platform.OS === APP_OS.IOS ? height - 90 : height - 50;

  return (
    <ScrollView style={{ height: scrollViewHeight }}>
      {!showExpandedView && (
        <View
          style={[
            !targetLanguageText
              ? { height: height * 0.5, paddingBottom: 0 }
              : [
                  { maxHeight: height * 0.44, height: "auto" },
                  commonStyles.borderBottom,
                ],
          ]}
        >
          <View style={{ paddingHorizontal: 10 }}>
            <LanguageOptionsBlock
              type="source"
              text={sourceLanguageText}
              onSpeakText={(rate) =>
                onSpeakText(sourceLanguageText, sourceLanguage.code, rate)
              }
              onPressPasteIcon={onPressPasteIcon}
              mode={mode}
            />
          </View>

          <TextInput
            ref={sourceLanguageTextInputRef}
            style={[
              styles.sourceTextInput,
              !targetLanguageText && [commonStyles.h100],
            ]}
            placeholder={AppContent.en.translateInputPlaceHolder(
              sourceLanguage.name,
              targetLanguage.name
            )}
            returnKeyType="done"
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
      )}
      {targetLanguageText && (
        <>
          <View style={{ paddingHorizontal: 10 }}>
            <LanguageOptionsBlock
              onPressExpandIcon={() => {
                setShowExpandedView(!showExpandedView);
              }}
              text={targetLanguageText}
              onSpeakText={(rate) =>
                onSpeakText(targetLanguageText, targetLanguage.code, rate)
              }
              type="target"
              mode={mode}
              showExpandedView={showExpandedView}
            />
          </View>
          <ScrollView
            nestedScrollEnabled
            style={[
              {
                paddingVertical: 5,
                paddingHorizontal: 10,
                marginBottom: 15,
              },
              !showExpandedView
                ? { maxHeight: height * 0.45 }
                : { maxHeight: height * 0.98 },
            ]}
          >
            {isTranslating ? (
              <ThreeDotAnimation />
            ) : (
              <Text style={styles.contentText}>{targetLanguageText}</Text>
            )}
          </ScrollView>
        </>
      )}
    </ScrollView>
  );
};

export default ConversationTranslateBlock;

const styles = StyleSheet.create({
  sourceTextInput: {
    fontSize: 28,
    textAlignVertical: "center",
    textAlign: "center",
    color: ThemeColor.dark.text,
    paddingBottom: 40,
    fontFamily: "Inter-Medium",
  },
  contentText: {
    color: ThemeColor.dark.text,
    fontSize: 28,
    textAlign: "center",
    fontFamily: "Inter-Medium",
    paddingBottom: 60,
  },
});
