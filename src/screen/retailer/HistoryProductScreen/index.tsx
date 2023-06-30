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
import { Order } from "../../../types/models";
import DATA from "../../../../assets/products.json";
import SearchBar from "../../../components/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ItemOrderView_2 from "../../../components/ItemOrderView_2";
import { color, windowHeight, windowWidth } from "../../../utils";
import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

type Props = {};

const HistoryProductScreen = (props: Props) => {
  const user = useSelector((state: any) => state?.auth?.user);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();

  const [order, setOrder] = useState();

  const getAllOrdersofRetailer = async () => {
    // const result = await getAllOrders(user.token, dispatch);
    // setOrder(result);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Your Product",
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
  useFocusEffect(
    React.useCallback(() => {
      getAllOrdersofRetailer();
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
      {/* <FlatList
        data={DATA.data}
        style={{
          zIndex: 2,
          paddingHorizontal: 12,
        }}
        renderItem={({ item }: { item: Order }) => (
          <ItemOrderView_2 isShowStatus={true} item={item} />
        )}
      /> */}
    </View>
  );
};

export default HistoryProductScreen;

const styles = StyleSheet.create({});
