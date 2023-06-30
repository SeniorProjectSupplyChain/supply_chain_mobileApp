import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import { color } from "../../utils";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Quantity from "../QuantityProduct";
import { Avatar } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { formatCurrency } from "../../helper/money";
import { useNavigation } from "@react-navigation/native";

type Props = {
  price: number;
};

const BottomSideProductDetail: React.FC<Props> = ({ price }) => {
  const navigation = useNavigation();

  const user = useSelector((state: any) => state.auth.user.user);

  return (
    <View style={[styles.container, styles.shadow]}>
      {/* <View style={styles.price}>
        <Text
          style={{
            color: color.Primary,
            fontSize: 16,
            fontFamily: "RobotoSlab-Bold",
          }}
          numberOfLines={1}
        >
          {price} VND
        </Text>
      </View> */}
      <Quantity quantity={1} />
      <TouchableOpacity style={styles.addCartButton}>
        <Text
          style={{ fontFamily: "RobotoSlab-Bold", color: "#fff", fontSize: 16 }}
        >
          Add to Cart
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomSideProductDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.Primary,
    paddingHorizontal: 18,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#C8C8C8",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    width: 160,
    alignItems: "center",
  },
  price: {
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    width: 160,
    alignItems: "center",
  },
  addCartButton: {
    backgroundColor: color.Secondary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    width: 160,
    alignItems: "center",
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
