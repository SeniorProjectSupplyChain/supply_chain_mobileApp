import { StyleSheet } from "react-native";
import { windowHeight, windowWidth } from "../../utils";

const styles = StyleSheet.create({
  logo: {
    width: windowWidth * 0.18,
    // height: windowWidth * 0.2,
    marginLeft: 8,
    marginRight: 16,
  },
  container: {
    backgroundColor: "#fff",
    flexDirection: "row",
    marginHorizontal: 6,
    marginVertical: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    justifyContent: "space-between",
  },
  content: {
    // marginHorizontal: 24,
    // flex: 1,
    justifyContent: "space-around",
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
  price: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
