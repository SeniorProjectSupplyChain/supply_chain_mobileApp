import { deleteCart, getCart } from "../../../api/cart";
import { createOrder } from "../../../api/order";
import ReactNativeModal from "react-native-modal";
import Contact from "../../../components/Contact";
import AnimatedLottieView from "lottie-react-native";
import { useDispatch, useSelector } from "react-redux";
import { formatNumberWithCommas } from "../../../helper/money";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { color, windowHeight, windowWidth } from "../../../utils";
import ProductQuantity from "../../../components/ProductQuantity";
import { loadDone, loadStart } from "../../../redux/features/load";
import ModalCreateOrder from "../../../components/ModalCreateOrder";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { calculateTotalAmount } from "../../../helper/calculateMoneyCart";
import { convertPhoneNumberTo0 } from "../../../helper/convertPhonenumber";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Platform,
} from "react-native";
import {
  OrderForCreate,
  OrderPayloadForCreate,
  ProductIdItem,
  ProductIdQRCodeItem,
  ProductItem,
} from "../../../types/models";

type Props = {};

const CartScreen = (props: Props) => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Shopping Cart",
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
  const nameText = "Name";
  const nameWidth = nameText.length * 16;
  const textWidth = Math.min(nameWidth, windowWidth - 20);

  const user = useSelector((state: any) => state?.auth?.user);

  const dispatch = useDispatch();

  const [cart, setCart] = useState<ProductIdItem[]>([]);
  const [listProductOder, setListProductOrder] = useState([]);
  const [viewQuestion, setViewQuestion] = useState(false);
  const [load, setLoad] = useState(false);
  const [responseCreateOder, setResponseCreateOder] = useState(null);

  const callApi = async () => {
    dispatch(loadStart());
    const cart = await getCart(user.token, dispatch);

    setCart(cart);

    dispatch(loadDone());
  };

  useFocusEffect(
    React.useCallback(() => {
      callApi();
      return () => {};
    }, [])
  );

  const funCancel = () => {
    setViewQuestion(false);
  };

  const funSuccess = async () => {
    setLoad(true);
    setResponseCreateOder(null);
    var order: OrderPayloadForCreate = {
      productIdItems: cart,
      signatures: [user?.user?.signature],
      deliveryStatus: { address: user?.user?.address },
      qrCode: "",
    };
    const response = await createOrder(order, user?.token, dispatch);
    deleteCart(user?.token, dispatch);
    setLoad(false);
    setResponseCreateOder(response);
    setTimeout(() => {
      setViewQuestion(false);
      if (response.message === "successfully") {
        navigation.goBack();
      }
    }, 1500);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <FlatList
        data={cart}
        renderItem={({ item }: { item: any }) => {
          return (
            <ProductQuantity
              item={item}
              setListProductOrder={setListProductOrder}
              setCart={setCart}
            />
          );
        }}
        style={{ marginTop: 12 }}
      />
      {cart?.length == 0 ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            top: -160,
            flex: 1,
          }}
        >
          <Text
            style={{
              top: 100,
              fontFamily: "RobotoSlab-Bold",
              fontSize: 16,
              color: "black",
            }}
          >
            Your shopping cart is empty, find your product!
          </Text>
          <AnimatedLottieView
            source={require("../../../../assets/question/empty-cart.json")}
            autoPlay
            // loop
            // style={styles.load}
            style={{ width: "100%" }}
          />
        </View>
      ) : null}
      <View
        style={[
          {
            backgroundColor: "#fff",
            paddingHorizontal: 20,
            paddingVertical: 8,
            borderRadius: 16,
            marginHorizontal: 14,
            marginBottom: 8,
          },
          styles.shadow,
        ]}
      >
        <View style={{}}>
          <Text
            style={{
              fontFamily: "RobotoSlab-Bold",
              fontSize: 14,
              lineHeight: 20,
              color: color.Primary,
              marginBottom: 4,
            }}
          >
            Contact Information
          </Text>

          <Contact
            type={"phone"}
            phone={convertPhoneNumberTo0(user?.user?.phoneNumber)}
          />
          <Contact type={"address"} address={user?.user?.address} />
        </View>
      </View>
      <View
        style={[
          {
            backgroundColor: "#fff",
            maxHeight: 280,
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
            paddingVertical: 6,
            borderTopWidth: Platform.OS === "ios" ? 1 : 0,
            borderLeftWidth: Platform.OS === "ios" ? 1 : 0,
            borderRightWidth: Platform.OS === "ios" ? 1 : 0,
            borderColor: "#efefef",
          },
          styles.shadow,
        ]}
      >
        <>
          <View
            style={[
              {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 12,
                // borderBottomWidth: 1,
                // borderBottomColor: "gray",
                paddingHorizontal: 18,
              },
            ]}
          >
            <Text
              style={{
                fontFamily: "RobotoSlab-Bold",
                fontSize: 18,
                color: color.Shipping,
                width: textWidth,
                // borderWidth: 1,
                textAlign: "right",
                left: -6,
              }}
              numberOfLines={1}
            >
              Name
            </Text>
            <Text
              style={{
                fontFamily: "RobotoSlab-Bold",
                fontSize: 18,
                color: color.Shipping,
                flex: 1,
                textAlign: "center",
              }}
            >
              Quantity
            </Text>
            <Text
              style={{
                fontFamily: "RobotoSlab-Bold",
                fontSize: 18,
                color: color.Shipping,
                width: 90,
                textAlign: "center",
              }}
            >
              VND
            </Text>
          </View>
          <View
            style={{ width: "100%", height: 1, backgroundColor: "#efefef" }}
          />
        </>
        <FlatList
          data={listProductOder}
          renderItem={({ item }: { item: any }) => (
            <>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: 12,
                  // borderBottomWidth: 1,
                  // borderBottomColor: "gray",
                  // borderWidth: 1,
                  paddingHorizontal: 18,
                }}
              >
                <Text
                  style={{
                    fontFamily: "RobotoSlab-SemiBold",
                    fontSize: 16,
                    color: color.Primary,
                    width: 90,
                    // textAlign: "center",
                  }}
                  numberOfLines={1}
                >
                  {item?.product?.productName}
                </Text>
                <Text
                  style={{
                    fontFamily: "RobotoSlab-SemiBold",
                    fontSize: 16,
                    color: color.Primary,
                    flex: 1,
                    textAlign: "center",
                  }}
                >
                  {item?.quantity}
                </Text>
                <Text
                  style={{
                    fontFamily: "RobotoSlab-SemiBold",
                    fontSize: 16,
                    color: color.Primary,
                    width: 90,
                    textAlign: "right",
                  }}
                >
                  {formatNumberWithCommas(
                    String(
                      Number(item?.quantity) * Number(item?.product?.price)
                    )
                  )}
                </Text>
              </View>
              <View
                style={{ width: "100%", height: 1, backgroundColor: "#efefef" }}
              />
            </>
          )}
        />
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            paddingVertical: 12,
            paddingHorizontal: 18,
            marginTop: 4,
          }}
        >
          <Text
            style={{
              fontFamily: "RobotoSlab-Bold",
              fontSize: 18,
              color: color.Primary,
            }}
          >
            Total cost:
          </Text>
          <Text
            style={{
              fontFamily: "RobotoSlab-Bold",
              fontSize: 18,
              color: color.Primary,
            }}
          >
            {formatNumberWithCommas(calculateTotalAmount(listProductOder))}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: color.Primary,
            paddingVertical: 16,
            // paddingHorizontal: 12,
            marginHorizontal: 66,
            borderRadius: 16,
            marginBottom: 16,
          }}
          onPress={() => {
            setResponseCreateOder(null);
            setViewQuestion(true);
          }}
        >
          <Text
            style={{
              fontFamily: "RobotoSlab-Bold",
              fontSize: 18,
              color: "#fff",
            }}
          >
            Checkout
          </Text>
        </TouchableOpacity>
        <ReactNativeModal
          isVisible={viewQuestion}
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <ModalCreateOrder
            funCancel={funCancel}
            funSuccess={() => {
              funSuccess();
            }}
            response={responseCreateOder}
            load={load}
            title="Confirm order?"
          />
        </ReactNativeModal>
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  headerButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    height: windowWidth * 0.1,
    width: windowWidth * 0.1,
    borderRadius: windowWidth * 0.5,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
});
