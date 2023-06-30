import React from "react";
import { windowHeight, windowWidth } from "../../utils";
import { useNavigation } from "@react-navigation/native";
import { formatNumberWithCommas } from "../../helper/money";
import {
  ProductCommercialItem,
  ProductItem as ProductItemType,
} from "../../types/models";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
type Props = {
  item: ProductCommercialItem;
};

const ProductItem: React.FC<Props> = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={[styles.container, styles.shadow]}
      onPress={() => {
        navigation.navigate("ProductScreen", {
          isProduct: false,
          id: item.product.productCommercialId,
        });
      }}
    >
      <Image
        style={styles.image}
        source={{
          uri: item?.product.image[0],
        }}
        resizeMode="cover"
      />
      <View
        style={{
          flex: 1,
          marginHorizontal: 12,
          //   borderWidth: 1,
          justifyContent: "space-evenly",
        }}
      >
        <Text style={styles.productName}>{item.product.productName}</Text>
        <Text style={styles.price}>
          {formatNumberWithCommas(item.product.price)}
        </Text>
        <Text style={styles.description} numberOfLines={1}>
          {item.product.description}
        </Text>
      </View>
      <Text style={styles.quantity}>x{item.quantity}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  image: {
    height: windowHeight * 0.08,
    width: windowWidth * 0.2,
    borderRadius: 12,
  },
  container: {
    backgroundColor: "#fff",
    marginVertical: 4,
    flexDirection: "row",
    borderRadius: 12,
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    // borderWidth: 1,
  },
  productName: {
    fontFamily: "RobotoSlab-Medium",
    fontSize: 16,
  },
  price: {
    fontFamily: "RobotoSlab-VariableFont_wght",
    fontSize: 14,
  },
  description: {
    fontFamily: "RobotoSlab-VariableFont_wght",
    fontSize: 14,
    width: "98%",
  },
  quantity: {
    fontFamily: "RobotoSlab-Medium",
    fontSize: 16,
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

export default ProductItem;
