import { ThemeColor } from "@/constants/Colors";
import React, { useState, useEffect } from "react";
import { View, Animated, Easing, StyleSheet } from "react-native";

const ThreeDotAnimation = () => {
  const [dot1Animation] = useState(new Animated.Value(0));
  const [dot2Animation] = useState(new Animated.Value(0));
  const [dot3Animation] = useState(new Animated.Value(0));

  useEffect(() => {
    const animate = (animation: Animated.Value) => {
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]).start(() => animate(animation));
    };

    animate(dot1Animation);
    setTimeout(() => animate(dot2Animation), 250);
    setTimeout(() => animate(dot3Animation), 500);
  }, [dot1Animation, dot2Animation, dot3Animation]);

  const renderDot = (animation: Animated.Value) => (
    <Animated.View style={[styles.dot, { opacity: animation }]}>
      <View style={styles.innerDot} />
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      {renderDot(dot1Animation)}
      {renderDot(dot2Animation)}
      {renderDot(dot3Animation)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
  dot: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  innerDot: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
    backgroundColor: ThemeColor.dark.primaryForegroundIconColor,
  },
});

export default ThreeDotAnimation;
