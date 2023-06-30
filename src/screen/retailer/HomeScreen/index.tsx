import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Platform,
  FlatList,
} from "react-native";
import {
  ManufacturedProduct,
  Product,
  ProductNumber,
} from "../../../types/models";
import SearchBar from "../../../components/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import PRODUCT from "../../../../assets/products.json";
import NewProduct from "../../../components/NewProduct";
import AntDesign from "react-native-vector-icons/AntDesign";
import PopularProduct from "../../../components/PopularProduct";
import { color, windowHeight, windowWidth } from "../../../utils";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import HeaderRetailerHomeScreen from "../../../components/HeaderRetailerHomeScreen";
import {
  getAllProducts,
  getProductsManufactured,
  getProductsPopular,
} from "../../../api/product";
import { loadDone, loadStart } from "../../../redux/features/load";
import { getLenghtCart } from "../../../api/cart";
type Props = {};

const HomeScreen = (props: Props) => {
  const [lenghtCart, setLenghtCart] = useState(0);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: color.Primary,
        height: Platform.OS === "ios" ? 100 : undefined,
      },
      headerTitle: (props: any) => (
        <HeaderRetailerHomeScreen {...props} user={user.user} />
      ),
      headerTitleAlign: "center",
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("CartScreen");
          }}
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
            marginRight: 16,
            marginBottom: Platform.OS === "ios" ? 2 : 0,
            height: windowWidth * 0.1,
            width: windowWidth * 0.1,
            borderRadius: windowWidth * 0.05,
          }}
        >
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
          <AntDesign name="shoppingcart" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [lenghtCart]);

  const user = useSelector((state: any) => state?.auth?.user);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [newProducts, setNewProducts] = useState<ManufacturedProduct[]>([]);
  const [popular, setPopular] = useState<ProductNumber[]>([]);

  const callApi = async () => {
    // dispatch(loadStart());
    const newProducts = await getProductsManufactured(user.token, dispatch);
    setNewProducts(newProducts);
    const popular = await getProductsPopular(user.token, dispatch);
    setPopular(popular);
    // dispatch(loadDone());
  };

  useFocusEffect(
    React.useCallback(() => {
      callApi();
      getLenghtCart(setLenghtCart, user.token, dispatch);
      return () => {};
    }, [])
  );

  const [searchPhrase, setSearchPhrase] = useState<string>("");
  const [clicked, setClicked] = useState<boolean>(false);

  return (
    <View style={{ backgroundColor: "#FFFFFF", flex: 1, paddingBottom: 100 }}>
      <StatusBar
        animated={true}
        backgroundColor={color.Primary}
        barStyle={"light-content"}
      />
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
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
          <>
            <Text style={[styles.title, { marginHorizontal: 16 }]}>
              Your products
            </Text>
            <FlatList
              horizontal
              data={popular}
              keyExtractor={(item) => item.product.productId}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              renderItem={({
                item,
                index,
              }: {
                item: ProductNumber;
                index: number;
              }) => {
                return (
                  <PopularProduct
                    product={item.product}
                    key={item.product.productId}
                    index={index}
                  />
                );
              }}
            />
            <Text style={[styles.title, { marginHorizontal: 16 }]}>
              New Products
            </Text>
            {newProducts ? (
              <FlatList
                data={newProducts}
                keyExtractor={(item) => item.product.productId}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }: { item: ManufacturedProduct }) => {
                  return (
                    <NewProduct product={item} key={item.product.productId} />
                  );
                }}
                style={{ marginHorizontal: 16 }}
              />
            ) : null}
          </>
        )}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  title: {
    fontFamily: "RobotoSlab-SemiBold",
    fontSize: 18,
    marginTop: 12,
    marginBottom: 6,
  },
});
