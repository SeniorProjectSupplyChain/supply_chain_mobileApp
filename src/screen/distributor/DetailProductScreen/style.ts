import { StyleSheet } from "react-native";
import { windowHeight, windowWidth } from "../../utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
  },
  headerButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    height: 40,
    width: 40,
    borderRadius: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  renderListProduct: {
    backgroundColor: "#fff",
    width: "98%",
    marginHorizontal: 4,
    marginVertical: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 4,
  },
  swipe: {
    alignItems: "center",
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 4,
    marginVertical: 4,
  },
});

export default styles;
