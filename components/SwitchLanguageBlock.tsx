import { MODES } from "@/constants";
import { ThemeColor } from "@/constants/Colors";
import { LanguageInterface, ModeInterface } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

interface SwitchLanguageBlockProps {
  sourceLanguage: LanguageInterface;
  targetLanguage: LanguageInterface;
  onPressSwitchLanguage: () => void;
  onPressSourceLanguage: () => void;
  onPressTargetLanguage: () => void;
  mode: ModeInterface;
}

const SwitchLanguageBlock = ({
  sourceLanguage,
  targetLanguage,
  onPressSwitchLanguage,
  onPressSourceLanguage,
  onPressTargetLanguage,
  mode,
}: SwitchLanguageBlockProps) => {
  const isStandardMode = mode.VALUE === MODES.STANDARD.VALUE;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.sourceLanguageContainer,
          isStandardMode
            ? { backgroundColor: ThemeColor.dark.primary }
            : { backgroundColor: ThemeColor.dark.background },
        ]}
      >
        <Pressable onPress={onPressSourceLanguage}>
          <Text
            style={[
              styles.sourceLanguageText,
              isStandardMode
                ? { color: ThemeColor.dark.primaryForeground }
                : { color: ThemeColor.dark.text },
            ]}
          >
            {sourceLanguage.name}
          </Text>
        </Pressable>
      </View>
      <View
        style={[
          styles.iconContainer,
          !isStandardMode && {
            backgroundColor: ThemeColor.dark.iconBackground,
          },
        ]}
      >
        <Pressable onPress={onPressSwitchLanguage}>
          <View>
            <Ionicons
              name="sync-outline"
              size={24}
              color={
                isStandardMode
                  ? ThemeColor.dark.primaryForeground
                  : ThemeColor.dark.primary
              }
            />
          </View>
        </Pressable>
      </View>
      <View style={[styles.targetLanguageContainer]}>
        <Pressable onPress={onPressTargetLanguage}>
          <Text
            style={[
              styles.targetLanguageText,
              !isStandardMode && { transform: [{ rotate: "180deg" }] },
            ]}
          >
            {targetLanguage.name}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SwitchLanguageBlock;

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    // paddingVertical: 5,
  },
  sourceLanguageContainer: {
    backgroundColor: ThemeColor.dark.background,
    height: 40,
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  sourceLanguageText: {
    fontSize: 16,
    fontFamily: "Inter-Medium",
  },
  targetLanguageContainer: {
    backgroundColor: ThemeColor.dark.primary,
    height: 40,
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  targetLanguageText: {
    color: ThemeColor.dark.primaryForeground,
    fontSize: 16,
    fontFamily: "Inter-Medium",
  },
  iconContainer: {
    position: "absolute",
    left: "45%",
    top: 0,
    zIndex: 100,
    height: 40,
    width: 40,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
