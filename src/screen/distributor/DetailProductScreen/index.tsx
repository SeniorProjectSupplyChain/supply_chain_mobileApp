import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from "react-native";
import styles from "./style";
import SwipeButton from "rn-swipe-button";
import { Order, OrderForUpdateFinish } from "../../../types/models";
import { useDispatch, useSelector } from "react-redux";
import React, { useLayoutEffect, useState } from "react";
import { loadDone, loadStart } from "../../../redux/features/load";
import MapComponent from "../../../components/MapComponent";
import ItemOrderView from "../../../components/ItemOrderView";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { color, windowHeight, windowWidth } from "../../../utils";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import CustomCollapsible from "../../../components/CustomCollapsible";
import SignatureRetailer from "../../../components/SignatureRetailer";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { finishOrder, getOrderById, updateOrder } from "../../../api/order";
import AwesomeButton from "react-native-really-awesome-button";
import StautsOrderComponent from "../../../components/StatusOrderComponent";

const ButtonSwipe = () => {
  return (
    <View
      style={{
        width: windowWidth,
        height: "100%",
        backgroundColor: color.Secondary,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MaterialCommunityIcons
        name="chevron-triple-right"
        size={40}
        color={"#fff"}
      />
    </View>
  );
};

const DetailProductScreen = () => {
  const navigation = useNavigation();
  const [signature, setSignature] = useState<any>(null);
  console.log(signature);
  const route = useRoute();
  const user = useSelector((state: any) => state?.auth?.user);
  const dispatch = useDispatch();

  const orderId: string = typeof route.params === "string" ? route.params : "";

  const [order, setOrder] = useState<Order>();

  const callApi = async () => {
    dispatch(loadStart());
    const order = await getOrderById(orderId, user.token, dispatch);
    setOrder(order);
    dispatch(loadDone());
  };
  const callApiWithoutDispatch = async () => {
    const order = await getOrderById(orderId, user.token, dispatch);
    setOrder(order);
  };

  useFocusEffect(
    React.useCallback(() => {
      setSignature(null);
      callApi();
      return () => {};
    }, [])
  );

  const handleSwipeOrder = async () => {
    dispatch(loadStart());
    const orderForUpdate: OrderForUpdateFinish = {
      orderId: order?.orderId || "Order1",
      deliveryStatus: {
        address: user.user.address,
      },
      signature: signature,
    };
    await finishOrder(orderForUpdate, user?.token, dispatch);
    setSignature(null);
    await callApiWithoutDispatch();
    dispatch(loadDone());
  };
  const handleButtonShipping = async () => {
    dispatch(loadStart());
    const orderForUpdate: OrderForUpdateFinish = {
      orderId: order?.orderId || "",
      deliveryStatus: {
        address: user.user.address,
      },
      signature: user.user.signature,
    };
    await updateOrder(orderForUpdate, user?.token, dispatch);
    await callApiWithoutDispatch();
    dispatch(loadDone());
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Detail Order",
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
          style={styles.headerButton}
        >
          <FontAwesome name="angle-left" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, []);
  return (
    <ScrollView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={color.Primary}
        barStyle={"light-content"}
      />
      <ItemOrderView item={order} />
      <StautsOrderComponent status={order?.status} />

      <Text
        style={{
          // color: color.Primary,
          fontFamily: "RobotoSlab-Medium",
          fontSize: 16,
          marginVertical: 6,
          marginLeft: 4,
        }}
      >
        {order?.productItemList?.length == 1 ? "Item" : "Items"}
      </Text>
      <CustomCollapsible productItemList={order?.productItemList || []} />
      <MapComponent
        retailerAddress={order?.retailer.address || ""}
        retailerName={order?.retailer.fullName || ""}
      />
      {order?.status == "APPROVED" ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 12,
          }}
        >
          <AwesomeButton
            backgroundColor={color.Primary}
            textColor="#fff"
            backgroundActive="#8CEC89"
            backgroundShadow="#8CEC89"
            backgroundProgress="#8CEC89"
            backgroundDarker="#8CEC89"
            textSize={20}
            borderRadius={20}
            width={windowWidth * 0.8}
            height={windowHeight * 0.07}
            onPressIn={handleButtonShipping}
          >
            Start delivery
          </AwesomeButton>
        </View>
      ) : order?.status == "SHIPPING" ? (
        <>
          <SignatureRetailer
            signature={signature}
            setSignature={setSignature}
          />
          <View style={styles.swipe}>
            <SwipeButton
              disabled={signature ? false : true}
              containerStyles={{
                width: "100%",
                borderRadius: 15,
              }}
              onSwipeSuccess={() => {
                handleSwipeOrder();
              }}
              enableRightToLeftSwipe
              railBackgroundColor={color.Primary}
              thumbIconWidth={windowHeight * 0.074}
              shouldResetAfterSuccess={true}
              title={signature ? "Swipe to complete" : "Get signature before"}
              titleColor="#fff"
              thumbIconComponent={ButtonSwipe}
              thumbIconStyles={{ borderRadius: 15, borderWidth: 0 }}
              railStyles={{
                borderRadius: 15,
                backgroundColor: color.Secondary,
              }}
              height={windowHeight * 0.07}
              titleStyles={{
                fontFamily: "RobotoSlab-Bold",
                paddingLeft: windowWidth * 0.1,
              }}
            />
          </View>
        </>
      ) : null}
    </ScrollView>
  );
};

export default DetailProductScreen;
