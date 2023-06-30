import * as Font from "expo-font";

const useFonts = async () =>
  await Font.loadAsync({
    "RobotoSlab-Black": require("../../assets/fonts/RobotoSlab-Black.ttf"),
    "RobotoSlab-Bold": require("../../assets/fonts/RobotoSlab-Bold.ttf"),
    "RobotoSlab-SemiBold": require("../../assets/fonts/RobotoSlab-SemiBold.ttf"),
    "RobotoSlab-ExtraBold": require("../../assets/fonts/RobotoSlab-ExtraBold.ttf"),
    "RobotoSlab-ExtraLight": require("../../assets/fonts/RobotoSlab-ExtraLight.ttf"),
    "RobotoSlab-Light": require("../../assets/fonts/RobotoSlab-Light.ttf"),
    "RobotoSlab-Medium": require("../../assets/fonts/RobotoSlab-Medium.ttf"),
    "RobotoSlab-Regular": require("../../assets/fonts/RobotoSlab-Regular.ttf"),
    "RobotoSlab-Thin": require("../../assets/fonts/RobotoSlab-Thin.ttf"),
    "RobotoSlab-VariableFont_wght": require("../../assets/fonts/RobotoSlab-VariableFont_wght.ttf"),
  });
export default useFonts;
