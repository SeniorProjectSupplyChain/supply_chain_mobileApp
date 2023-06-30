import React from "react";
import { color } from "../../utils";
import { View, Text, StyleSheet } from "react-native";
type Props = {
  status?: string;
};

const StautsOrderComponent: React.FC<Props> = ({ status }) => {
  return (
    <View
      style={[
        styles.container,
        styles.shadow,
        {
          borderWidth: 2,
          borderColor:
            status === "SHIPPED"
              ? color.Primary
              : status === "SHIPPING"
              ? color.Shipping
              : status === "PENDING"
              ? color.Pending
              : status === "APPROVED"
              ? color.Pending
              : "#fff",
        },
      ]}
    >
      <Text
        style={{
          fontFamily: "RobotoSlab-Medium",
          color:
            status === "SHIPPED"
              ? color.Primary
              : status === "SHIPPING"
              ? color.Shipping
              : status === "PENDING"
              ? color.Pending
              : status === "APPROVED"
              ? color.Pending
              : "#000",
          fontSize: 16,
        }}
      >
        {status}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 2,
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
  text: {
    // fontSize:10,
    fontFamily: "RobotoSlab-SemiBold",
    // lineHeight:14,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.65,

    elevation: 4,
  },
});

export default React.memo(StautsOrderComponent);
