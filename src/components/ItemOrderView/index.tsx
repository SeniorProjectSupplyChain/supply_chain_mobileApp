import Tag from "../Tag";
import styles from "./style";
import { color } from "../../utils";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { Order } from "../../types/models";
import { Item } from "react-native-paper/lib/typescript/src/components/Drawer/Drawer";
import { calculateTotalAmount } from "../../helper/calculateMoneyCart";
import { formatNumberWithCommas } from "../../helper/money";
import { convertTimeString, convertToUTC } from "../../helper/formatDate";

type Props = {
  isShowStatus?: boolean;
  selectList?: number;
  item?: Order;
};

const ItemOrderView: React.FC<Props> = ({
  isShowStatus = false,
  selectList = 0,
  item,
}) => {
  const navigation = useNavigation();
  // console.log(item);

  return (
    <TouchableOpacity
      style={[styles.container, styles.shadow]}
      onPress={() => {
        navigation.navigate("DetailProductScreen", item?.orderId);
      }}
    >
      <Image
        source={{
          uri: item?.qrCode,
        }}
        style={styles.logo}
      />
      <View style={styles.content}>
        <Text
          style={{
            color: selectList == 0 ? color.Primary : color.Secondary,
            fontFamily: "RobotoSlab-Bold",
            fontSize: 18,
          }}
          numberOfLines={1}
        >
          {convertTimeString(convertToUTC(item?.updateDate || "")).date}{" "}
          {convertTimeString(convertToUTC(item?.updateDate || "")).time}
        </Text>
        <Text
          style={{ fontFamily: "RobotoSlab-SemiBold", fontSize: 16 }}
          numberOfLines={1}
        >
          {item?.retailer?.fullName}
        </Text>
        {isShowStatus ? (
          <View>
            <Tag
              backgroundColor={
                selectList == 0
                  ? "rgb(163, 255, 163)"
                  : selectList == 1
                  ? "#699ff0"
                  : "rgba(250, 204, 21, 0.32)"
              }
              color={
                selectList == 0
                  ? color.Primary
                  : selectList == 1
                  ? color.Shipping
                  : color.Secondary
              }
              fontSize={16}
              text={item?.status || ""}
            />
          </View>
        ) : (
          <Text>{item?.productItemList?.length} item</Text>
        )}
      </View>
      <View style={[styles.price, { paddingHorizontal: 4, width: 110 }]}>
        <Text
          style={{
            color:
              selectList == 0
                ? color.Primary
                : selectList == 1
                ? color.Shipping
                : color.Secondary,
            fontFamily: "RobotoSlab-Bold",
            fontSize: 16,
            textAlign: "left",
          }}
          numberOfLines={1}
        >
          {formatNumberWithCommas(
            calculateTotalAmount(item?.productItemList || [])
          )}{" "}
          VND
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ItemOrderView;
