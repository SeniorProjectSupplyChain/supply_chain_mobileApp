import React, { useEffect, useState } from "react";
import AnimatedLottieView from "lottie-react-native";
import { View, Platform, StyleSheet } from "react-native";

const Loading: React.FC<{}> = () => {
  return (
    <AnimatedLottieView
      source={require("../../../assets/load/load.json")}
      autoPlay
      loop
      style={styles.load}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    // backgroundColor: "transparent",
    zIndex: 100,
    // borderWidth: 1,
  },
  load: {
    width: 100,
    height: 100,
    // borderWidth: 1,
    zIndex: 100,
    // backgroundColor: "transparent",
  },
});
export default Loading;
