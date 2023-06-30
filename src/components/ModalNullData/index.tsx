import React from "react";
import { windowWidth } from "../../utils";
import { AntDesign } from "@expo/vector-icons";
import AnimatedLottieView from "lottie-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {};

const ModalNullData = ({ funCancel }: { funCancel: any }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ position: "absolute", top: 4, right: 4, padding: 20 }}
        onPress={funCancel}
      >
        <AntDesign name="closecircleo" size={24} color="red" />
      </TouchableOpacity>
      <AnimatedLottieView
        source={require("../../../assets/404/error-404.json")}
        autoPlay
        loop
        style={{ height: 200 }}
      />
      <Text
        style={{
          fontFamily: "RobotoSlab-Medium",
          color: "black",
          fontSize: 16,
        }}
      >
        This QR Code cannot be recognised,{" "}
      </Text>
      <Text
        style={{
          fontFamily: "RobotoSlab-Medium",
          color: "black",
          fontSize: 16,
        }}
      >
        Please try another QR code
      </Text>
    </View>
  );
};

export default ModalNullData;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 28,
    borderRadius: 20,
    borderColor: "rgba(0, 0, 0, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    width: windowWidth * 0.9,
  },
});
