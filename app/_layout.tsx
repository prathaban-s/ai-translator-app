import React from "react";
import { Slot } from "expo-router";
import { RootSiblingParent } from "react-native-root-siblings";
export default function Root() {
  return (
    <RootSiblingParent>
      <Slot />
    </RootSiblingParent>
  );
}
