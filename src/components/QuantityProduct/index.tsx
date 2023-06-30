import React, { useState } from "react";
import { color, windowWidth } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

type Props = {
  data?: any;
  quantity: number;
  setQuantity: any;
  colorText?: string;
  amount?: string;
};
const Quantity: React.FC<Props> = ({
  data,
  setQuantity,
  quantity,
  // increaseQuantity,
  colorText,
  amount,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        width: windowWidth * 0.2,
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity
        disabled={quantity == 1 ? true : false}
        onPress={() => {
          setQuantity(quantity - 1);
        }}
        style={{
          height: 25,
          width: 25,
          borderRadius: 25 / 2,
          backgroundColor: quantity == 1 ? "gray" : "#F8F9FA",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 15, fontFamily: "RobotoSlab-Bold" }}>-</Text>
      </TouchableOpacity>

      <Text
        style={{
          fontSize: 16,
          fontFamily: "RobotoSlab-Bold",
          color: colorText ? colorText : "#fff",
        }}
      >
        {quantity}
      </Text>
      <TouchableOpacity
        disabled={quantity >= Number(amount) ? true : false}
        onPress={() => {
          setQuantity(quantity + 1);
        }}
        style={{
          height: 25,
          width: 25,
          borderRadius: 25 / 2,
          backgroundColor:
            quantity >= Number(amount) ? "gray" : color.Secondary,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{ fontSize: 15, color: "#fff", fontFamily: "RobotoSlab-Bold" }}
        >
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(Quantity);

const styles = StyleSheet.create({});
