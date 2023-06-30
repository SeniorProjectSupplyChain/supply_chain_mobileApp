import React from "react";
import { windowHeight, windowWidth } from "../../utils";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
type Props = {
  title: string;
  quantity: string;
  styleTitle: any;
  styleIcon: any;
  styleContainer: any;
  onActive: boolean;
};

const CardProduct: React.FC<Props> = ({
  title,
  quantity,
  styleTitle,
  styleIcon,
  styleContainer,
  onActive,
}) => {
  return (
    <View style={[styles.container, styleContainer]}>
      <Text style={[styles.title, styleTitle]} numberOfLines={1}>
        {title}
      </Text>
      <View style={[styles.iconAndQuantity]}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "RobotoSlab-SemiBold",
            color: "#fff",
            marginRight: 6,
          }}
        >
          x{quantity}
        </Text>
        <Ionicons
          name={onActive ? "ios-caret-up" : "ios-caret-down"}
          size={30}
          style={[styles.icon, styleIcon]}
        />
      </View>
    </View>
  );
};

export default CardProduct;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: windowWidth,
    height: windowHeight * 0.06,
    paddingHorizontal: windowHeight * 0.01,
    borderRadius: 15,
    borderLeftWidth: 4,
    borderLeftColor: "#0A3200",
    backgroundColor: "#0A3200",
  },
  title: {
    fontSize: 20,
    // fontWeight: "bold",
    fontFamily: "RobotoSlab-SemiBold",
    marginLeft: windowHeight * 0.02,
    marginTop: windowHeight * 0.015,
    maxWidth: 260,
  },
  icon: {},
  iconAndQuantity: {
    flexDirection: "row",
    alignItems: "center",
  },
});
