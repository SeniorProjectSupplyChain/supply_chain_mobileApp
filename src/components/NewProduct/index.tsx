import Space from "../Space";
import React, { useState } from "react";
import { ManufacturedProduct, Product } from "../../types/models";
import { color, windowWidth } from "../../utils";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { formatNumberWithCommas } from "../../helper/money";
import { convertTimeString, convertToUTC } from "../../helper/formatDate";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

type Props = {
  product: ManufacturedProduct;
};

const NewProduct: React.FC<Props> = ({ product }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate("ProductScreen", {
          isProduct: true,
          id: product?.product.productId,
        })
      }
    >
      <Image
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/supply-chain-9ea64.appspot.com/o/mobileApp%2Fnew.png?alt=media&token=72880922-c6bf-4f1b-bf1c-ff94a95936cb&_gl=1*fgpw0z*_ga*MjQ1MDY3NTA3LjE2ODQ5MTY0MzI.*_ga_CW55HF8NVT*MTY4NjIxMTM3NS4yMC4xLjE2ODYyMTE0MDIuMC4wLjA.",
        }}
        style={styles.labelNew}
        resizeMode="cover"
      />
      <Image
        style={styles.image}
        source={{ uri: product?.product?.image[0] }}
        resizeMode="cover"
      />
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <Text
          style={{
            fontFamily: "RobotoSlab-Bold",
            // marginBottom: 28,
            fontSize: 16,
          }}
          numberOfLines={1}
        >
          {product?.product?.productName}
        </Text>

        <Text
          style={{
            fontFamily: "RobotoSlab-Bold",
            marginVertical: 4,
            fontSize: 16,
            color: color.Primary,
          }}
        >
          {convertTimeString(convertToUTC(product?.date)).date}
        </Text>
        <Text
          style={{
            fontFamily: "RobotoSlab-SemiBold",
            // marginBottom: 28,
            fontSize: 14,
            color: color.Primary,
          }}
          numberOfLines={1}
        >
          {product?.product?.supplier.fullName}
        </Text>
      </View>
      <Text
        style={{
          fontFamily: "RobotoSlab-Bold",
          color: color.Primary,
          fontSize: 16,
        }}
      >
        {formatNumberWithCommas(product?.product?.price)} VND
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    marginBottom: 8,
    marginHorizontal: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  labelNew: {
    width: 36,
    height: 36,
    position: "absolute",
    zIndex: 3,
    top: -6,
    right: -6,
  },
  image: {
    width: 90,
    height: 90,
    // padding:12,
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#F3F3F3",
  },
});

export default NewProduct;
