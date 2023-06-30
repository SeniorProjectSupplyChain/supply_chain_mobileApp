import React, { useState, useEffect, useRef } from "react";
import Quantity from "../QuantityProduct";
import { color, windowHeight, windowWidth } from "../../utils";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { getProductById } from "../../api/product";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Product, ProductIdItem } from "../../types/models";
import { formatNumberWithCommas } from "../../helper/money";
import { Feather } from "@expo/vector-icons";
import { deleteProductInCart } from "../../api/cart";
import ReactNativeModal from "react-native-modal";
import ConfirmModal from "../ModalConfirm";

type Props = {
  item: {
    productId: string;
    quantity: string;
  };
  setListProductOrder: any;
  setCart: any;
};

const rightSwipeActions = () => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 8,
        paddingHorizontal: 30,
        paddingVertical: 20,
      }}
    >
      <Feather name="delete" size={30} color="red" />
      <Text
        style={{
          fontFamily: "RobotoSlab-Bold",
          color: "red",
          fontSize: 16,
        }}
      >
        Delete
      </Text>
    </View>
  );
};

const swipeFromRightOpen = async (setViewQuestion: any) => {
  setViewQuestion(true);
};

const ProductQuantity: React.FC<Props> = ({
  item,
  setListProductOrder,
  setCart,
}) => {
  const [product, setProduct] = useState<Product>();
  const [quantity, setQuantity] = useState(Number(item.quantity));
  const [viewQuestion, setViewQuestion] = useState(false);

  const swipeableRef = useRef(null);
  const navigation = useNavigation();
  const user = useSelector((state: any) => state?.auth?.user);
  const dispatch = useDispatch();

  const callApi = async () => {
    const product = await getProductById(item.productId, user.token, dispatch);
    setProduct(product);
    setListProductOrder((previous: any) => {
      return [...previous, { product: product, quantity: quantity }];
    });
  };

  const callApi_rerenderDelete = async () => {
    const product = await getProductById(item.productId, user.token, dispatch);
    setProduct(product);
  };

  const closeSwipeable = () => {
    swipeableRef.current?.close();
  };

  const funCancel = () => {
    closeSwipeable();
    setViewQuestion(false);
  };

  const funSuccess = async (
    token: string,
    dispatch: any,
    product: ProductIdItem,
    setCart: any
  ) => {
    const deleteProduct = await deleteProductInCart(token, dispatch, product);

    setCart(deleteProduct);
    setListProductOrder((previous: any) => {
      const even = (element: any) =>
        element?.product?.productId == product.productId;
      if (previous?.some(even)) {
        const new_prev = previous?.filter(
          (element: any) => element?.product?.productId != product?.productId
        );
        return [...new_prev];
      }
    });
    closeSwipeable();

    setViewQuestion(false);
  };

  useEffect(() => {
    product
      ? setListProductOrder((previous: any) => {
          const even = (element: any) =>
            element?.product?.productId == item.productId;
          if (previous?.some(even)) {
            const new_prev = previous?.filter(
              (element: any) => element?.product?.productId != item?.productId
            );
            return [...new_prev, { product: product, quantity: quantity }];
          }
        })
      : null;
  }, [quantity]);

  useEffect(() => {
    callApi();
  }, []);

  useEffect(() => {
    callApi_rerenderDelete();
  }, [item]);

  return (
    <>
      <Swipeable
        ref={swipeableRef}
        renderRightActions={rightSwipeActions}
        onSwipeableRightOpen={() => {
          swipeFromRightOpen(setViewQuestion);
        }}
      >
        <View style={[styles.container, styles.shadow]}>
          <Image
            style={styles.image}
            source={{
              uri: product?.image[0],
            }}
            resizeMode="cover"
          />
          <View
            style={{
              flex: 1,
              marginHorizontal: 14,
              // borderWidth: 1,
              // height: 80,
              justifyContent: "space-between",
              marginBottom: 18,
            }}
          >
            <Text style={styles.productName} numberOfLines={1}>
              {product?.productName}
            </Text>
            <Quantity
              quantity={quantity}
              setQuantity={setQuantity}
              // increaseQuantity={increaseQuantity}
              colorText={color.Primary}
              amount={product?.amount}
            />
          </View>
          <Text style={styles.price}>
            {formatNumberWithCommas(product?.price || "")}
          </Text>
        </View>
      </Swipeable>
      <ReactNativeModal
        isVisible={viewQuestion}
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <ConfirmModal
          funCancel={funCancel}
          funSuccess={() => {
            funSuccess(user.token, dispatch, item, setCart);
          }}
          title="You want to delete this?"
        />
      </ReactNativeModal>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    height: windowHeight * 0.1,
    width: windowWidth * 0.26,
    borderRadius: 12,
  },
  container: {
    backgroundColor: "#fff",
    marginVertical: 8,
    marginHorizontal: 14,
    flexDirection: "row",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: "center",
  },
  productName: {
    marginBottom: 18,
    fontFamily: "RobotoSlab-SemiBold",
    color: color.Primary,
    fontSize: 16,
  },
  price: {
    fontFamily: "RobotoSlab-Bold",
    color: color.Primary,
    fontSize: 16,
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

export default ProductQuantity;
