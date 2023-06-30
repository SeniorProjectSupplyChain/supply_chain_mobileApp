import React from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import AnimatedLottieView from "lottie-react-native";
import { color, windowHeight, windowWidth } from "../../utils";
import AwesomeButton from "react-native-really-awesome-button";

const ConfirmModal = ({
  funCancel,
  funSuccess,
  title,
}: {
  funCancel: any;
  funSuccess: any;
  title: string;
}) => (
  <TouchableOpacity
    style={styles.container}
    activeOpacity={1}
    onPressOut={funCancel}
  >
    <TouchableWithoutFeedback onPress={funCancel}>
      <View style={styles.content}>
        <TouchableOpacity
          style={{ position: "absolute", top: 20, right: 20 }}
          onPress={funCancel}
        >
          <AntDesign name="closecircleo" size={24} color="red" />
        </TouchableOpacity>
        <Text style={styles.contentTitle}>{title}</Text>
        {Platform.OS === "ios" ? (
          <AnimatedLottieView
            source={require("../../../assets/question/question2.json")}
            autoPlay
            loop
            style={{ height: 200 }}
          />
        ) : (
          <Image
            source={require("../../../assets/question/question.png")}
            style={{ height: 200, width: 200 }}
          />
        )}
        <View style={styles.contentButton}>
          <AwesomeButton
            backgroundColor={"#ff271a"}
            textColor="#fff"
            backgroundActive="#ff7c74"
            backgroundShadow="#ff7c74"
            backgroundProgress="#ff7c74"
            backgroundDarker="#ff7c74"
            textSize={24}
            borderRadius={20}
            width={windowWidth * 0.3}
            // height={windowHeight * 0.07}
            onPressIn={funCancel}
          >
            No
          </AwesomeButton>
          <AwesomeButton
            backgroundColor={color.Primary}
            textColor="#fff"
            backgroundActive="#8CEC89"
            backgroundShadow="#8CEC89"
            backgroundProgress="#8CEC89"
            backgroundDarker="#8CEC89"
            textSize={24}
            borderRadius={20}
            width={windowWidth * 0.3}
            // height={windowHeight * 0.07}
            onPressIn={funSuccess}
          >
            Yes
          </AwesomeButton>
        </View>
      </View>
    </TouchableWithoutFeedback>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    // justifyContent: "center",
    // alignItems: "center",
  },
  content: {
    backgroundColor: "#fff",
    padding: 28,
    borderRadius: 20,
    borderColor: "rgba(0, 0, 0, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    width: windowWidth * 0.9,
  },
  contentTitle: {
    fontFamily: "RobotoSlab-Bold",
    fontSize: 26,
    color: color.Primary,
  },
  contentButton: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 12,
    width: "100%",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 4,
  },
});

export default ConfirmModal;
