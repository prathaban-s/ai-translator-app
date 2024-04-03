import { AppContent } from "@/constants/AppContent";
import { ThemeColor } from "@/constants/Colors";
import { LanguageInterface } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import ThreeDotAnimation from "./ThreeDottedAnimation";
import { commonStyles } from "@/styles/commonStyles";

interface LanguageModalProps {
  showLanguageModal: boolean;
  setShowLanguageModal: (show: boolean) => void;
  selectedLanguage: LanguageInterface;
  setSelectLanguage: (language: LanguageInterface) => void;
  languages: LanguageInterface[];
  title?: string;
  isLoading?: boolean;
}

const LanguageModal = ({
  showLanguageModal,
  setShowLanguageModal,
  selectedLanguage,
  setSelectLanguage,
  languages,
  title = AppContent.en.selectLanguage,
  isLoading = false,
}: LanguageModalProps) => {
  const [languageSearchResults, setLanguageSearchResults] =
    useState<LanguageInterface[]>(languages);

  const [searchText, setSearchText] = useState("");

  const updateSearchResults = () => {
    const results = languages.filter((language) =>
      language.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setLanguageSearchResults(results);
  };

  useEffect(() => {
    updateSearchResults();
  }, [searchText]);

  useEffect(() => {
    setLanguageSearchResults(languages);
  }, [languages]);

  useEffect(() => {
    if (!showLanguageModal) {
      setSearchText("");
      updateSearchResults();
    }
  }, [showLanguageModal]);

  const renderItem = ({ item }: { item: LanguageInterface }) => {
    const isSelected = item.name === selectedLanguage.name;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setSelectLanguage(item)}
      >
        <View
          style={[
            styles.listItem,
            {
              borderColor: isSelected
                ? ThemeColor.dark.textSelectedColor
                : ThemeColor.dark.borderColor,
            },
          ]}
        >
          <Text
            style={{
              color: isSelected
                ? ThemeColor.dark.textSelectedColor
                : ThemeColor.dark.text,
              textTransform: "capitalize",
              fontFamily: "Inter-Medium",
            }}
          >
            {item.name}
          </Text>
          {isSelected && (
            <Ionicons
              name="checkmark-done-sharp"
              size={20}
              color={ThemeColor.dark.textSelectedColor}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <Modal
      visible={showLanguageModal}
      transparent={true}
      onRequestClose={() => setShowLanguageModal(false)}
      animationType="slide"
    >
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{title}</Text>
            <View style={styles.headerCloseIcon}>
              <Pressable onPress={() => setShowLanguageModal(false)}>
                <Ionicons name="close" size={24} color={ThemeColor.dark.text} />
              </Pressable>
            </View>
          </View>
          <View>
            <TextInput
              style={styles.searchInput}
              placeholder={AppContent.en.searchLanguage}
              placeholderTextColor={ThemeColor.dark.textMuted}
              value={searchText}
              onChangeText={setSearchText}
            />
            <Ionicons
              name="search"
              size={20}
              color={ThemeColor.dark.textMuted}
              style={styles.searchIcon}
            />
          </View>
          {isLoading ? (
            <View style={[commonStyles.h100, commonStyles.flexCenter]}>
              <ThreeDotAnimation />
            </View>
          ) : (
            <>
              <View style={styles.list}>
                <FlatList
                  data={languageSearchResults}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.nativeName}
                />
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default LanguageModal;

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
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 0.2,
    borderColor: ThemeColor.dark.borderColor,
    borderRadius: 10,
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  list: {
    marginBottom: 10,
  },
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
  searchInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: ThemeColor.dark.borderColor,
    borderRadius: 10,
    color: ThemeColor.dark.text,
    paddingEnd: 40,
    fontFamily: "Inter-Medium",
  },
  searchIcon: {
    position: "absolute",
    top: 15,
    right: 15,
  },
});
