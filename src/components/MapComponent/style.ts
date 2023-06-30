import { StyleSheet } from "react-native";
import { windowHeight, windowWidth } from "../../utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: 260,
    borderRadius: 12,
    backgroundColor: "#fff",
    marginHorizontal: 4,
    alignItems: "center",
    marginVertical: 8,
  },
  map: {
    width: "96%",
    height: 220,
    borderRadius: 12,
    marginTop: 4,
    flex: 1,
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
  inforMap: {
    alignSelf: "flex-start",
    marginHorizontal: 8,
    marginVertical: 8,
  },
});

export default styles;
