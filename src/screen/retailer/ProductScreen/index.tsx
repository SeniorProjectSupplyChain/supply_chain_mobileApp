import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Platform,
} from "react-native";
import {
  Product,
  ProductCommercial,
  ProductIdItem,
} from "../../../types/models";
import { FontAwesome } from "@expo/vector-icons";
import { color, windowWidth } from "../../../utils";
import Slide from "../../../components/SlideImage/Slide";
import Quantity from "../../../components/QuantityProduct";
import ProductInfor from "../../../components/ProductInfor";
import AntDesign from "react-native-vector-icons/AntDesign";
import React, { useLayoutEffect, useState, useMemo, useEffect } from "react";

import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "react-native-flash-message";
import TimeLineProduct from "../../../components/TimeLineProduct";
import { loadDone, loadStart } from "../../../redux/features/load";
import { addProductToCart, getLenghtCart } from "../../../api/cart";
import { getProductById, getProductCommercialById } from "../../../api/product";
import ReactNativeModal from "react-native-modal";
import ModalNullData from "../../../components/ModalNullData";

const ProductInformation = React.memo(function ProductInformation({
  item,
}: {
  item?: Product | ProductCommercial;
}) {
  return (
    <FlatList
      style={{ flex: 1, backgroundColor: "#fff" }}
      data={[]}
      keyExtractor={(_, index) => `dom${index}`}
      ListEmptyComponent={null}
      renderItem={null}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={() => {
        return (
          <View style={{ flex: 1, marginTop: 10 }}>
            <Slide item={item?.image} />
            <ProductInfor data={item} />
            <TimeLineProduct data={item?.dates} />
          </View>
        );
      }}
    />
  );
});

type Props = {
  isProduct: boolean;
  id: string;
};

const ProductScreen = (props: Props) => {
  const route = useRoute();
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(1);
  const [lenghtCart, setLenghtCart] = useState(0);
  const [viewDataNull, setViewDataNull] = useState(false);

  // const item: Product = route.params as Product;

  const item: Props = useMemo(() => {
    return route.params as unknown as Props;
  }, [route.params]);
  // console.log(item);

  const user = useSelector((state: any) => state?.auth?.user);
  const dispatch = useDispatch();
  const [product, setProduct] = useState<Product | any>();

  const callApi = async () => {
    dispatch(loadStart());
    if (item.isProduct) {
      const product = await getProductById(item.id, user.token, dispatch);
      setProduct(product);
    } else {
      const product = await getProductCommercialById(
        item.id,
        user.token,
        dispatch
      );
      setProduct(product);
    }
    dispatch(loadDone());
  };
  // console.log(product);

  useFocusEffect(
    React.useCallback(() => {
      callApi();
      return () => {};
    }, [])
  );

  useEffect(() => {
    getLenghtCart(setLenghtCart, user.token, dispatch);
  }, []);

  const addtocart = async () => {
    const addProduct: ProductIdItem = {
      productId: product?.productId || "",
      quantity: String(quantity),
    };

    const responeAddProduct = await addProductToCart(
      user.token,
      dispatch,
      addProduct
    );

    getLenghtCart(setLenghtCart, user.token, dispatch);

    showMessage({
      message: "Success",
      description: `Your product is added to cart.`,
      textStyle: {
        fontFamily: "RobotoSlab-VariableFont_wght",
        top: Platform.OS === "ios" ? -20 : undefined,
      },
      titleStyle: {
        fontFamily: "RobotoSlab-Bold",
        top: Platform.OS === "ios" ? -20 : undefined,
      },
      type: "success",
      backgroundColor: color.Primary,
      icon: "success",
      style: {
        borderRadius: 20,
        marginHorizontal: 20,
        borderWidth: 4,
        borderColor: "#fff",
        marginTop: 60,
      },
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: product?.productName,
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
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("CartScreen");
          }}
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
          <AntDesign name="shoppingcart" size={24} color="black" />
          {lenghtCart !== 0 ? (
            <View
              style={{
                backgroundColor: "red",
                borderRadius: 24,
                width: 24,
                height: 24,
                position: "absolute",
                top: -8,
                right: -8,
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: "RobotoSlab-Medium",
                  fontSize: 16,
                  color: "#fff",
                }}
              >
                {lenghtCart}
              </Text>
            </View>
          ) : null}
        </TouchableOpacity>
      ),
    });
  }, [item, navigation, lenghtCart, product?.productName]);

  return (
    <>
      <ProductInformation item={product} />
      <View style={[styles.bottomSide, styles.shadow]}>
        <View
          style={{
            // borderWidth: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "RobotoSlab-Bold",
              color: "#fff",
              fontSize: 16,
            }}
          >
            Unit:
          </Text>
          <Text
            style={{
              fontFamily: "RobotoSlab-Bold",
              color: "#fff",
              fontSize: 16,
            }}
          >
            {product?.unit}
          </Text>
        </View>
        <View style={{ width: 1, height: "100%", backgroundColor: "#fff" }} />
        <Quantity
          quantity={quantity}
          setQuantity={setQuantity}
          amount={product?.amount}
        />
        <View style={{ width: 1, height: "100%", backgroundColor: "#fff" }} />
        <TouchableOpacity style={styles.addCartButton} onPress={addtocart}>
          <Text
            style={{
              fontFamily: "RobotoSlab-Bold",
              color: "#fff",
              fontSize: 16,
            }}
          >
            Add to Cart
          </Text>
        </TouchableOpacity>
      </View>
      <ReactNativeModal
        isVisible={product ? false : true}
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <ModalNullData
          funCancel={() => {
            navigation.goBack();
          }}
        />
      </ReactNativeModal>
    </>
  );
};
export default React.memo(ProductScreen);

const styles = StyleSheet.create({
  bottomSide: {
    backgroundColor: color.Primary,
    paddingHorizontal: 18,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-around",
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
  addCartButton: {
    backgroundColor: color.Secondary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    width: 160,
    alignItems: "center",
  },
});
