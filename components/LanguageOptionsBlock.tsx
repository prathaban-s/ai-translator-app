import { ThemeColor } from "@/constants/Colors";
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { apiToastMessage } from "@/lib/toast-utils";
import * as Clipboard from "expo-clipboard";
import { ModeInterface } from "@/types";
import { DEFAULT_MODE, MODES } from "@/constants";

interface LanguageOptionsBlockProps {
  onPressExpandIcon?: () => void;
  onPressPasteIcon?: () => void;
  type?: "source" | "target";
  text?: string;
  onSpeakText: (rate: number) => void;
  iconColor?: string;
  mode?: ModeInterface;
  showExpandedView?: boolean;
}

const LanguageOptionsBlock = ({
  onPressExpandIcon = () => {},
  onPressPasteIcon = () => {},
  type = "source",
  text,
  onSpeakText,
  iconColor = ThemeColor.dark.secondaryForegroundIconColor,
  mode = MODES.CONVERSATION,
  showExpandedView = false,
}: LanguageOptionsBlockProps) => {
  const isSource = type === "source";

  const isStandardMode = mode === DEFAULT_MODE;
  const onPressCopyIcon = async () => {
    if (text) {
      await Clipboard.setStringAsync(text);
      apiToastMessage("Text copied to clipboard");
    }
  };

  return (
    <View
      style={[
        styles.container,
        isStandardMode && { backgroundColor: ThemeColor.dark.background },
      ]}
    >
      <View style={styles.iconsContainer}>
        <Pressable onPress={() => onSpeakText(1)}>
          <Ionicons name="volume-medium-outline" size={26} color={iconColor} />
        </Pressable>
        <Pressable onPress={() => onSpeakText(0.2)}>
          <MaterialCommunityIcons name="snail" size={26} color={iconColor} />
        </Pressable>
      </View>
      <View style={styles.iconsContainer}>
        <Pressable onPress={onPressCopyIcon}>
          <Ionicons name="copy-outline" size={24} color={iconColor} />
        </Pressable>
        {isSource ? (
          <Pressable onPress={onPressPasteIcon}>
            <Ionicons name="clipboard-outline" size={24} color={iconColor} />
          </Pressable>
        ) : (
          <Pressable onPress={onPressExpandIcon}>
            {showExpandedView ? (
              <FontAwesome5 name="compress-alt" size={24} color={iconColor} />
            ) : (
              <MaterialCommunityIcons
                name="arrow-expand"
                size={26}
                color={iconColor}
              />
            )}
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default LanguageOptionsBlock;

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
});
