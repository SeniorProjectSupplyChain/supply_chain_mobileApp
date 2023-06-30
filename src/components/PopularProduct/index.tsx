import Space from "../Space";
import React, { useState } from "react";
import { Product } from "../../types/models";
import { color, windowWidth } from "../../utils";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { formatNumberWithCommas } from "../../helper/money";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

type Props = {
  product: Product;
  index: number;
};

const PopularProduct: React.FC<Props> = ({ product, index }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[styles.container, { marginLeft: index == 0 ? 20 : 0 }]}
      onPress={() =>
        navigation.navigate("ProductScreen", {
          isProduct: true,
          id: product.productId,
        })
      }
    >
      <View style={styles.container_child1}>
        <View style={styles.companyBox}>
          <Image
            style={styles.image}
            source={{
              uri: product.image[0],
            }}
            resizeMode="cover"
          />
          <View
            style={{
              justifyContent: "space-between",
            }}
          >
            <Text numberOfLines={1} style={styles.company}>
              {product.productName}
            </Text>
            {/* <Text
              numberOfLines={1}
              style={{
                fontFamily: "RobotoSlab-VariableFont_wght",
                fontSize: 14,
              }}
            >
              Amount: {product.amount}
            </Text> */}
            <Text
              numberOfLines={1}
              style={{
                fontFamily: "RobotoSlab-SemiBold",
                fontSize: 14,
                color: color.Primary,
              }}
            >
              {product.supplier.fullName}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            marginLeft: 8,
            marginBottom: 12,
            width: 80,
          }}
        >
          {/* <MaterialIcons name="attach-money" size={24} color={color.Primary} /> */}
          <Text
            style={{
              color: color.Primary,
              fontFamily: "RobotoSlab-Medium",
            }}
            numberOfLines={1}
          >
            {formatNumberWithCommas(product?.price)} VND
          </Text>
        </View>
      </View>
      <Space />
      <Text numberOfLines={3} style={styles.description}>
        {product.description}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    marginRight: 8,
    marginTop: 4,
    marginLeft: 4,
    marginBottom: 8,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  container_child1: {
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 54,
    height: 54,
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  company: {
    fontSize: 16,
    fontFamily: "RobotoSlab-Bold",
    width: 120,
  },
  companyBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  description: {
    width: 250,
    height: 60,
    fontSize: 14,
    fontFamily: "RobotoSlab-Medium",
    color: "#616161",
  },
});

export default PopularProduct;
