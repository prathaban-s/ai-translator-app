import { AppContent } from "@/constants/AppContent";
import { ThemeColor } from "@/constants/Colors";
import { commonStyles } from "@/styles/commonStyles";
import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  Text,
  View,
  Modal,
  StyleSheet,
  Pressable,
  Switch,
  Platform,
} from "react-native";
import { APP_OS, MODES } from "@/constants";
import { ModeInterface } from "@/types";
import Picker from "./Picker";

interface SettingsModalProps {
  showSettingsModal: boolean;
  setShowSettingsModal: (show: boolean) => void;
  canAutoSpeak: boolean;
  setAutoSpeak: (value: boolean) => void;
  onPressReset: () => void;
  mode: ModeInterface;
  setMode: (mode: ModeInterface) => void;
}

const SettingsModal = ({
  showSettingsModal,
  setShowSettingsModal,
  canAutoSpeak,
  setAutoSpeak,
  onPressReset,
  mode,
  setMode,
}: SettingsModalProps) => {
  const [showPicker, setShowPicker] = useState(false);

  const openModeModal = () => {
    if (Platform.OS === APP_OS.IOS) {
      // Ios doesn't support 2 modals in a time
      setShowSettingsModal(false);
    }
    setShowPicker(true);
  };

  const onUpdateMode = (option: ModeInterface) => {
    setMode(option);
    setShowSettingsModal(false);
    setShowPicker(false);
  };
  return (
    <>
      <Modal
        visible={showSettingsModal}
        transparent={true}
        onRequestClose={() => setShowSettingsModal(false)}
        animationType="slide"
      >
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>{AppContent.en.settings}</Text>
              <View style={styles.headerCloseIcon}>
                <Pressable onPress={() => setShowSettingsModal(false)}>
                  <Ionicons
                    name="close"
                    size={24}
                    color={ThemeColor.dark.iconColor}
                  />
                </Pressable>
              </View>
            </View>
            <View style={styles.listItem}>
              <View style={[commonStyles.flexRow, commonStyles.alignCenter]}>
                <Ionicons
                  name="volume-high-outline"
                  size={24}
                  color={ThemeColor.dark.text}
                />
                <Text style={styles.listLeftItemText}>
                  {AppContent.en.autoSpeak}
                </Text>
              </View>
              <Switch
                style={{ height: 20 }}
                trackColor={{
                  false: ThemeColor.dark.textMuted,
                  true: ThemeColor.dark.statusBarBackground,
                }}
                removeClippedSubviews={false}
                thumbColor={ThemeColor.dark.primary}
                value={canAutoSpeak}
                onValueChange={setAutoSpeak}
              />
            </View>
            <View style={styles.listItem}>
              <View style={[commonStyles.flexRow, commonStyles.alignCenter]}>
                <Ionicons name="eye" size={24} color={ThemeColor.dark.text} />
                <Text style={styles.listLeftItemText}>
                  {AppContent.en.displayMode}
                </Text>
              </View>
              <Pressable onPress={openModeModal}>
                <View style={[commonStyles.flexRow, commonStyles.flexCenter]}>
                  <Text style={styles.listRightItemText}>
                    {mode.LABEL || AppContent.en.standard}
                  </Text>
                  <Ionicons
                    name="chevron-down"
                    size={20}
                    color={ThemeColor.dark.secondaryForegroundIconColor}
                    style={{ paddingLeft: 5, paddingTop: 2 }}
                  />
                </View>
              </Pressable>
            </View>
            <Pressable onPress={onPressReset}>
              <View style={styles.listItem}>
                <View style={[commonStyles.flexRow, commonStyles.alignCenter]}>
                  <Ionicons
                    name="refresh-outline"
                    size={24}
                    color={ThemeColor.dark.text}
                  />
                  <Text style={styles.listLeftItemText}>
                    {AppContent.en.reset}
                  </Text>
                </View>
              </View>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Picker
        showPicker={showPicker}
        setShowPicker={setShowPicker}
        selectedValue={mode.VALUE}
        options={Object.values(MODES)}
        onSelect={onUpdateMode}
      />
    </>
  );
};

export default SettingsModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColor.dark.modalBackground,
    justifyContent: "flex-end",
  },
  innerContainer: {
    height: "90%",
    backgroundColor: ThemeColor.dark.background,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
  listItem: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 0.4,
    borderColor: ThemeColor.dark.borderColor,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  list: {},
  headerContainer: {
    alignItems: "center",
    width: "100%",
    paddingBottom: 10,
  },
  headerText: {
    color: ThemeColor.dark.text,
    textAlign: "center",
    fontSize: 18,
    paddingRight: 20,
    fontFamily: "Inter-Medium",
  },
  headerCloseIcon: {
    position: "absolute",
    right: 0,
  },
  listRightItemText: {
    fontFamily: "Inter-Medium",
    color: ThemeColor.dark.secondaryForegroundIconColor,
  },
  listLeftItemText: {
    fontFamily: "Inter-Medium",
    color: ThemeColor.dark.text,
    paddingLeft: 10,
  },
});
