import { StyleSheet } from "react-native";
import { color, windowHeight, windowWidth } from "../../utils";

const styles = StyleSheet.create({
  bottomImage: {
    bottom: -windowHeight * 0.04,
    position: "absolute",
  },
  welcomeText: {
    // fontFamily: "SF-Pro",
    // fontWeight: "700",
    fontFamily: "RobotoSlab-Bold",
    fontSize: 28,
    lineHeight: 56,
    color: color.Primary,
  },
  nameApp: {
    // fontWeight: "500",
    fontFamily: "RobotoSlab-Medium",
    fontSize: 24,
    lineHeight: 56,
    color: color.Primary,
  },
  logo: {
    width: windowWidth * 0.6,
    height: windowHeight * 0.24,
  },
  boxInput: {
    paddingHorizontal: windowWidth * 0.1,
    marginTop: windowHeight * 0.04,
  },
  boxForgotPassword: {
    flex: 1,
    alignItems: "flex-end",
    paddingHorizontal: windowWidth * 0.1,
    marginVertical: windowHeight * 0.015,
  },
  forgotPasswordText: {
    color: color.Primary,
    fontSize: 18,
    // fontWeight: "bold",
    fontFamily: "RobotoSlab-Bold",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: windowHeight * 0.015,
  },
});

export default styles;
