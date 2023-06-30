import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
  Modal,
} from "react-native";
import { FlatList } from "react-native";
import { Order } from "../../../types/models";
import { AntDesign } from "@expo/vector-icons";
import { color, windowWidth } from "../../../utils";
import ProductItem from "../../../components/ProductItem";
import ImageViewer from "react-native-image-zoom-viewer-fixed";
import TimeLineStatus from "../../../components/TimeLineStatus";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import React, { useLayoutEffect, useState, useMemo } from "react";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import StautsOrderComponent from "../../../components/StatusOrderComponent";
import BottomSideOrderDetail from "../../../components/BottomSideOrderDetail";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../../../api/order";
import { loadDone, loadStart } from "../../../redux/features/load";
import { calculateTotalAmount } from "../../../helper/calculateMoneyCart";

type Props = {};

const OrderDetailScreen = (props: Props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const user = useSelector((state: any) => state?.auth?.user);
  const dispatch = useDispatch();

  const orderId: string = typeof route.params === "string" ? route.params : "";

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Your Order",
      headerTitleAlign: "center",
      headerTitleStyle: {
        color: "#fff",
        fontSize: 20,
        fontFamily: "RobotoSlab-Bold",
      },
      headerStyle: {
        paddingBottom: 124,
        backgroundColor: color.Primary,
      },
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
            height: windowWidth * 0.1,
            width: windowWidth * 0.1,
            borderRadius: windowWidth * 0.05,
            marginBottom: Platform.OS === "ios" ? 2 : 0,
          }}
        >
          <FontAwesome name="angle-left" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, []);
  const [order, setOrder] = useState<Order>();

  const callApi = async () => {
    dispatch(loadStart());
    const order = await getOrderById(orderId, user.token, dispatch);

    setOrder(order);
    dispatch(loadDone());
  };

  useFocusEffect(
    React.useCallback(() => {
      callApi();
      return () => {};
    }, [])
  );
  const [isImageViewVisible, setIsImageViewVisible] = useState<boolean>(false);
  const signatureObject = {
    retailerSignature: order?.signatures?.[order?.signatures.length - 1] || "",
    distributorSignature: order?.signatures?.[1] || "",
  };

  const images = Object.entries(signatureObject).map(([title, url]) => ({
    title,
    url: url || "",
  }));

  return (
    <>
      <FlatList
        style={{ flex: 1, backgroundColor: "#fff" }}
        data={[]}
        keyExtractor={(_e: any, i: { toString: () => string }) =>
          "dom" + i.toString()
        }
        ListEmptyComponent={null}
        renderItem={null}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View
            style={{
              marginHorizontal: 12,
              flex: 1,
              backgroundColor: "#fff",
            }}
          >
            <View style={{ marginTop: 12 }} />
            <StautsOrderComponent status={order?.status} />
            <Text
              style={{
                fontFamily: "RobotoSlab-VariableFont_wght",
                fontSize: 16,
                marginTop: 12,
                marginBottom: 8,
              }}
            >
              List product
            </Text>
            <FlatList
              data={order?.productItemList}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => <ProductItem item={item} />}
              keyExtractor={(item) => item.product.productId}
              style={{ flex: 1 }}
            />
            <Text
              style={{
                fontFamily: "RobotoSlab-VariableFont_wght",
                fontSize: 16,
                marginTop: 12,
                marginBottom: 8,
              }}
            >
              Status order
            </Text>
            <TimeLineStatus
              data={order?.deliveryStatuses}
              setIsImageViewVisible={setIsImageViewVisible}
            />
          </View>
        )}
      />
      <Modal visible={isImageViewVisible}>
        <TouchableOpacity
          style={{
            backgroundColor: color.Primary,
            width: windowWidth * 0.1,
            height: windowWidth * 0.1,
            borderRadius: windowWidth * 0.05,
            position: "absolute",
            top: Platform.OS === "ios" ? 40 : 10,
            right: 20,
            zIndex: 11,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => setIsImageViewVisible(!isImageViewVisible)}
        >
          <AntDesign name="close" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <ImageViewer
            imageUrls={images}
            style={{ top: -18 }}
            backgroundColor={"#fff"}
            renderHeader={(currentIndex: number | undefined) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: Platform.OS === "ios" ? 50 : 20,
                  zIndex: 10,
                }}
              >
                <Text
                  style={{
                    fontFamily: "RobotoSlab-Medium",
                    fontSize: 18,
                    color: "#000",
                  }}
                >
                  {currentIndex || 0 + 1}/{images.length}
                </Text>
                <Text
                  style={{
                    fontFamily: "RobotoSlab-Medium",
                    fontSize: 18,
                    color: "#000",
                  }}
                >
                  {images[currentIndex || 0].title == "distributorSignature"
                    ? "Distributor"
                    : "Retailer"}
                </Text>
              </View>
            )}
          />
        </View>
      </Modal>
      <BottomSideOrderDetail
        totalPrice={Number(calculateTotalAmount(order?.productItemList || []))}
        orderStatus={order?.status}
      />
    </>
  );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({});
