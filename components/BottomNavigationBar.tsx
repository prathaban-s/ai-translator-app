import { ThemeColor } from "@/constants/Colors";
import { commonStyles } from "@/styles/commonStyles";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Pressable, StyleSheet } from "react-native";

interface BottomNavigationBarProps {
  setIsSettingsModalVisible: (show: boolean) => void;
}

const BottomNavigationBar = ({
  setIsSettingsModalVisible,
}: BottomNavigationBarProps) => {
  return (
    <>
      <View style={styles.container}>
        <View style={[commonStyles.flexRow, commonStyles.alignCenter]}>
          <Pressable onPress={() => setIsSettingsModalVisible(true)}>
            <Ionicons
              name="settings-outline"
              size={30}
              color={ThemeColor.dark.iconColor}
            />
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default BottomNavigationBar;

const styles = StyleSheet.create({
  container: {
    height: 50,
    position: "absolute",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: ThemeColor.dark.bottomNavigationBackground,
    bottom: 0,
  },
});
