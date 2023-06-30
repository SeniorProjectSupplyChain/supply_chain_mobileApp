import Tag from "../Tag";
import styles from "./style";
import { color, windowWidth } from "../../utils";
import React, { useState } from "react";
import { Order } from "../../types/models";
import { useNavigation } from "@react-navigation/native";
import { convertTimeString, convertToUTC } from "../../helper/formatDate";
import { formatNumberWithCommas } from "../../helper/money";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { calculateTotalAmount } from "../../helper/calculateMoneyCart";

type Props = {
  isShowStatus?: boolean;
  item: Order;
};

type ImageStatus = {
  [key: string]: any;
};

const IMAGE_STATUS: ImageStatus = {
  pending:
    "https://firebasestorage.googleapis.com/v0/b/supply-chain-9ea64.appspot.com/o/mobileApp%2Fpending-icon-512x504-9zrlrc78-removebg-preview.png?alt=media&token=db8619b0-1b40-41bb-b5e6-e01b93e284ab&_gl=1*isird*_ga*MjQ1MDY3NTA3LjE2ODQ5MTY0MzI.*_ga_CW55HF8NVT*MTY4NTc3MTMzMy4xMS4xLjE2ODU3NzEzNDAuMC4wLjA.",
  approved:
    "https://firebasestorage.googleapis.com/v0/b/supply-chain-9ea64.appspot.com/o/mobileApp%2F353078886_477557671236837_2532976276656416248_n.png?alt=media&token=a5bae90f-9b7e-4d89-adfc-5d71c67e3d2e",
  shipping:
    "https://firebasestorage.googleapis.com/v0/b/supply-chain-9ea64.appspot.com/o/mobileApp%2Fpngegg-removebg-preview.png?alt=media&token=ad88a806-2534-4b8e-83b3-39ff7b9267c4&_gl=1*1mi6w16*_ga*MjQ1MDY3NTA3LjE2ODQ5MTY0MzI.*_ga_CW55HF8NVT*MTY4NTY5ODg1Ni4xMC4xLjE2ODU2OTkxNTYuMC4wLjA.",
  shipped:
    "https://firebasestorage.googleapis.com/v0/b/supply-chain-9ea64.appspot.com/o/mobileApp%2Fshipped.png?alt=media&token=5508cc3e-c5a0-4a33-aca9-11b63f7a4137&_gl=1*4cmtqe*_ga*MjQ1MDY3NTA3LjE2ODQ5MTY0MzI.*_ga_CW55HF8NVT*MTY4NTc3MTMzMy4xMS4xLjE2ODU3NzE1OTkuMC4wLjA.",
  rejected:
    "https://firebasestorage.googleapis.com/v0/b/supply-chain-9ea64.appspot.com/o/mobileApp%2Fgoods.png?alt=media&token=7ddce906-67e2-45fc-b4fa-506bc1079ed2",
};

const ItemOrderView_2: React.FC<Props> = ({ isShowStatus = false, item }) => {
  const navigation = useNavigation();
  // console.log(item);

  return (
    <TouchableOpacity
      style={[styles.container, styles.shadow]}
      onPress={() => {
        navigation.navigate("OrderDetailScreen", item.orderId);
      }}
    >
      <View style={[{ flexDirection: "row" }]}>
        <Image
          source={{
            uri: IMAGE_STATUS[item?.status.toLowerCase()],
          }}
          style={[styles.logo, {}]}
          resizeMode={"contain"}
        />
        <View style={styles.content}>
          <Text
            style={{
              color:
                item?.status.toLowerCase() == "pending"
                  ? color.Pending
                  : item?.status.toLowerCase() == "shipping"
                  ? color.Shipping
                  : item?.status.toLowerCase() == "shipped"
                  ? color.Primary
                  : item?.status.toLowerCase() == "approved"
                  ? "#03a6fc"
                  : item?.status.toLowerCase() == "rejected"
                  ? "#ef5959"
                  : "rgb(255, 255, 163)",
              fontFamily: "RobotoSlab-Bold",
              fontSize: 18,
            }}
          >
            {`${convertTimeString(convertToUTC(item.createDate)).date}, ${
              convertTimeString(convertToUTC(item.createDate)).time
            }`}
          </Text>
          <Text
            style={{
              fontFamily: "RobotoSlab-VariableFont_wght",
              fontSize: 14,
              marginBottom: 4,
            }}
          >
            {item.productItemList.length > 1
              ? `${item.productItemList.length} products`
              : `${item.productItemList.length} product`}
          </Text>
          {isShowStatus ? (
            <View>
              <Tag
                backgroundColor={
                  item?.status.toLowerCase() == "pending"
                    ? "#ffe3ab"
                    : item?.status.toLowerCase() == "shipping"
                    ? "#5a93e8"
                    : item?.status.toLowerCase() == "shipped"
                    ? "rgb(163, 255, 163)"
                    : item?.status.toLowerCase() == "approved"
                    ? "#a2ddfc"
                    : item?.status.toLowerCase() == "rejected"
                    ? "#f79797"
                    : "rgb(255, 255, 163)"
                }
                color={
                  item?.status.toLowerCase() == "pending"
                    ? color.Pending
                    : item?.status.toLowerCase() == "shipping"
                    ? color.Shipping
                    : item?.status.toLowerCase() == "shipped"
                    ? color.Primary
                    : item?.status.toLowerCase() == "approved"
                    ? "#03a6fc"
                    : item?.status.toLowerCase() == "rejected"
                    ? "#ef5959"
                    : "rgb(255, 255, 163)"
                }
                fontSize={16}
                text={item?.status}
              />
            </View>
          ) : (
            <Text
              style={{
                fontFamily: "RobotoSlab-VariableFont_wght",
                fontSize: 14,
              }}
            >
              {item.productItemList.length > 1
                ? `${item.productItemList.length} items`
                : `${item.productItemList.length} item`}
            </Text>
          )}
        </View>
      </View>
      <View style={[styles.price, { paddingHorizontal: 14 }]}>
        <Text
          style={{
            color:
              item?.status.toLowerCase() == "pending"
                ? color.Pending
                : item?.status.toLowerCase() == "shipping"
                ? color.Shipping
                : item?.status.toLowerCase() == "shipped"
                ? color.Primary
                : item?.status.toLowerCase() == "approved"
                ? "#03a6fc"
                : item?.status.toLowerCase() == "rejected"
                ? "#ef5959"
                : "rgb(255, 255, 163)",
            fontFamily: "RobotoSlab-Bold",
            fontSize: 16,
          }}
        >
          {formatNumberWithCommas(calculateTotalAmount(item.productItemList))}{" "}
          VND
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ItemOrderView_2;
