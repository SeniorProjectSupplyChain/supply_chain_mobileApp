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
import { formatCurrency } from "../../helper/money";
import { useNavigation } from "@react-navigation/native";

type Props = {
  totalPrice?: number;
  orderStatus?: string;
};

const BottomSideOrderDetail: React.FC<Props> = ({
  totalPrice = 10,
  orderStatus,
}) => {
  const navigation = useNavigation();

  const user = useSelector((state: any) => state?.auth?.user?.user);

  return (
    <>
      {orderStatus?.toLowerCase() === "pending" ? (
        <View style={[styles.container, styles.shadow]}>
          <TouchableOpacity style={styles.cancelButton}>
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                fontFamily: "RobotoSlab-Bold",
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
          <View style={styles.price}>
            <Text
              style={{
                color: color.Primary,
                fontSize: 16,
                fontFamily: "RobotoSlab-Bold",
              }}
              numberOfLines={1}
            >
              {formatCurrency(totalPrice)} VND
            </Text>
          </View>
        </View>
      ) : (
        <View style={[styles.container_1, styles.shadow]}>
          <View style={styles.price_1}>
            <Text
              style={{
                color: "#fff",
                fontSize: 18,
                fontFamily: "RobotoSlab-Bold",
              }}
              numberOfLines={1}
            >
              Price: {formatCurrency(totalPrice)} VND
            </Text>
          </View>
        </View>
      )}
    </>
  );
};

export default BottomSideOrderDetail;

const styles = StyleSheet.create({
  container_1: {
    backgroundColor: color.Primary,
    paddingHorizontal: 18,
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  price_1: {
    // backgroundColor: color.Primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    // width: 160,
    alignItems: "center",
  },
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
