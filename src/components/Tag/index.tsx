import React from "react";
import { View, Text, StyleSheet } from "react-native";
type Props = {
  text: string;
  backgroundColor: string;
  color: string;
  fontSize: number;
};

const Tag: React.FC<Props> = ({ text, backgroundColor, color, fontSize }) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: backgroundColor,
          //   borderColor: borderColor,
          //   borderWidth: borderWidth,
        },
      ]}
    >
      <Text style={[styles.text, { color: color, fontSize: fontSize }]}>
        {text}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 2,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  text: {
    // fontSize:10,
    fontFamily: "RobotoSlab-SemiBold",
    // lineHeight:14,
  },
});

export default Tag;
