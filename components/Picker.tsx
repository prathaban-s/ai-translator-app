import { ThemeColor } from "@/constants/Colors";
import React from "react";
import { Modal, Pressable, View, Text, StyleSheet } from "react-native";

interface optionsInterface {
  LABEL: string;
  VALUE: string;
}

interface PickerProps {
  showPicker: boolean;
  setShowPicker: (showPicker: boolean) => void;
  selectedValue: string;
  options: optionsInterface[];
  onSelect: (selectedValue: optionsInterface) => void;
}

const Picker = ({
  showPicker,
  setShowPicker,
  selectedValue,
  options,
  onSelect,
}: PickerProps) => {
  const onPressOption = (option: optionsInterface) => {
    onSelect(option);
    setShowPicker(false);
  };
  return (
    <Modal
      transparent={true}
      visible={showPicker}
      onRequestClose={() => setShowPicker(false)}
      presentationStyle="overFullScreen"
    >
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          {options.map((option) => (
            <Pressable key={option.VALUE} onPress={() => onPressOption(option)}>
              <View style={styles.listItem}>
                <Text style={styles.listItemText}>{option.LABEL}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    </Modal>
  );
};

export default Picker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: ThemeColor.dark.modalBackground,
  },
  innerContainer: {
    backgroundColor: "white",
    width: "90%",
    paddingVertical: 5,
  },
  listItem: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    justifyContent: "center",
  },
  listItemText: {
    fontSize: 16,
    fontFamily: "Inter-Medium",
  },
});
