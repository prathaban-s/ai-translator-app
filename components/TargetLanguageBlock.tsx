import { ThemeColor } from "@/constants/Colors";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Platform,
} from "react-native";
import LanguageOptionsBlock from "./LanguageOptionsBlock";
import { LanguageInterface } from "@/types";
import ThreeDotAnimation from "./ThreeDottedAnimation";
import { commonStyles } from "@/styles/commonStyles";
import { APP_OS } from "@/constants";

interface TargetLanguageBlockProps {
  targetLanguageText: string;
  targetLanguage: LanguageInterface;
  showExpandedView: boolean;
  setShowExpandedView: (showExpandedView: boolean) => void;
  onSpeakText: (text: string, languageCode: string, rate: number) => void;
  isLoading?: boolean;
}

const TargetLanguageBlock = ({
  targetLanguageText,
  targetLanguage,
  onSpeakText,
  showExpandedView,
  setShowExpandedView,
  isLoading = false,
}: TargetLanguageBlockProps) => {
  const height = Dimensions.get("window").height;

  const expandedViewMinHeight =
    Platform.OS === APP_OS.IOS ? height * 0.86 : height * 0.88;

  return (
    <View
      style={[
        styles.container,
        showExpandedView
          ? { height: expandedViewMinHeight }
          : { height: height * 0.4 },
      ]}
    >
      {targetLanguageText && (
        <View style={styles.optionsBlock}>
          <LanguageOptionsBlock
            onPressExpandIcon={() => {
              setShowExpandedView(!showExpandedView);
            }}
            type="target"
            text={targetLanguageText}
            onSpeakText={(rate) =>
              onSpeakText(targetLanguageText, targetLanguage.code, rate)
            }
            iconColor={ThemeColor.dark.primaryForegroundIconColor}
            showExpandedView={showExpandedView}
          />
        </View>
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={commonStyles.w100}
        nestedScrollEnabled
      >
        <Text
          style={[
            styles.contentText,
            showExpandedView
              ? { minHeight: height * 0.75 }
              : { minHeight: height * 0.25 },
          ]}
        >
          {targetLanguageText}
        </Text>
      </ScrollView>
      {isLoading && !targetLanguageText && (
        <View style={styles.loadingBlock}>
          <ThreeDotAnimation />
        </View>
      )}
    </View>
  );
};

export default TargetLanguageBlock;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: ThemeColor.dark.primary,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: "auto",
    transform: [{ rotate: "180deg" }],
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  contentText: {
    color: ThemeColor.dark.primaryForeground,
    fontSize: 28,
    textAlign: "center",
    fontFamily: "Inter-Medium",
    width: "100%",
    textAlignVertical: "center",
    paddingBottom: 10,
  },
  optionsBlock: {
    backgroundColor: ThemeColor.dark.primary,
  },
  loadingBlock: {
    position: "absolute",
    top: 20,
    height: 40,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
