import Toast from "react-native-root-toast";
import { parseErrorObject } from "./utils";

export const apiToastMessage = (message: string) => {
  Toast.show(message, {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    textStyle: {
      fontFamily: "Inter-Medium",
      fontWeight: "normal",
      fontSize: 14,
    },
    opacity: 0.8,
  });
};

export const apiToastErrorMessage = (error: any) => {
  Toast.show(parseErrorObject(error), {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    textStyle: {
      fontFamily: "Inter-Medium",
      fontWeight: "normal",
      fontSize: 14,
    },
    opacity: 0.8,
  });
};
