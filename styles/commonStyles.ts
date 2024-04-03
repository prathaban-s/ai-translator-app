import { ThemeColor } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
  },
  flexColumn: {
    flexDirection: "column",
  },
  flexCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  flexStart: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  flexEnd: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  flexBetween: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  flexAround: {
    justifyContent: "space-around",
    alignItems: "center",
  },
  flexEvenly: {
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  justifyCenter: {
    justifyContent: "center",
  },
  justifyStart: {
    justifyContent: "flex-start",
  },
  justifyEnd: {
    justifyContent: "flex-end",
  },
  justifyBetween: {
    justifyContent: "space-between",
  },
  justifyAround: {
    justifyContent: "space-around",
  },
  justifyEvenly: {
    justifyContent: "space-evenly",
  },
  alignCenter: {
    alignItems: "center",
  },
  alignStart: {
    alignItems: "flex-start",
  },
  alignEnd: {
    alignItems: "flex-end",
  },
  alignStretch: {
    alignItems: "stretch",
  },
  alignBaseline: {
    alignItems: "baseline",
  },
  container: {
    flex: 1,
  },
  wAuto: {
    width: "auto",
  },
  hAuto: {
    height: "auto",
  },
  w100: {
    width: "100%",
  },
  h100: {
    height: "100%",
  },
  w50: {
    width: "50%",
  },
  h50: {
    height: "50%",
  },
  w75: {
    width: "75%",
  },
  h75: {
    height: "75%",
  },
  w25: {
    width: "25%",
  },
  h25: {
    height: "25%",
  },
  w10: {
    width: "10%",
  },
  h10: {
    height: "10%",
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderColor: ThemeColor.dark.borderColor,
  },
});
