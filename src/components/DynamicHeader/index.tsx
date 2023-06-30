import {
  Animated,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Platform,
  RefreshControl,
} from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { color } from "../../utils";
import SearchBar from "../SearchBar";
import { Order } from "../../types/models";
import { Avatar } from "react-native-paper";
import ItemOrderView from "../ItemOrderView";
import { Feather } from "@expo/vector-icons";
import { titleCase } from "../../helper/titleCase";
import AnimatedLottieView from "lottie-react-native";
import { useDispatch, useSelector } from "react-redux";
import { BlurView } from "@react-native-community/blur";
import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { getOrdersOfDistributorByStatus } from "../../api/order";

const wait = (timeout: any) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const AnimatedImageBackground =
  Animated.createAnimatedComponent(ImageBackground);

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export default function DynamicHeader({
  children,
  username,
  selectList,
}: //   refreshing,
//   setRefreshing,
{
  children: any;
  username: any;
  selectList: number;
  //   refreshing: any;
  //   setRefreshing: any;
}) {
  // Keeps notches away
  return (
    <App
      username={username}
      selectList={selectList}
      // refreshing={refreshing}
      // setRefreshing={setRefreshing}
    >
      <StatusBar
        animated={true}
        backgroundColor={color.Primary}
        barStyle={"light-content"}
      />

      {children}
    </App>
  );
}

function App({
  children,
  username,
  selectList,
}: //   refreshing,
//   setRefreshing,
{
  children: any;
  username: any;
  selectList: number;
  //   refreshing: any;
  //   setRefreshing: any;
}) {
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;
  const HEADER_HEIGHT_EXPANDED = 20;
  const HEADER_HEIGHT_NARROWED = Platform.OS === "ios" ? 132 : 80;
  //   const onRefresh = React.useCallback(() => {
  //     setRefreshing(true);
  //     wait(2000).then(() => setRefreshing(false));
  //   }, []);
  const user = useSelector((state: any) => state?.auth?.user?.user);
  const token = useSelector((state: any) => state?.auth?.user?.token);

  const dispatch = useDispatch();
  const [ordersShipped, setOrdersShipped] = useState<Order[]>([]);
  const [ordersApproved, setOrdersApproved] = useState<Order[]>([]);
  const [ordersShipping, setOrdersShipping] = useState<Order[]>([]);

  const callApi = async () => {
    // dispatch(loadStart());
    const shipped = await getOrdersOfDistributorByStatus(
      "SHIPPED",
      token,
      dispatch
    );
    setOrdersShipped(shipped);
    const shipping = await getOrdersOfDistributorByStatus(
      "SHIPPING",
      token,
      dispatch
    );
    setOrdersShipping(shipping);
    const approved = await getOrdersOfDistributorByStatus(
      "APPROVED",
      token,
      dispatch
    );
    setOrdersApproved(approved);
    // dispatch(loadDone());
  };

  useFocusEffect(
    React.useCallback(() => {
      callApi();
      return () => {};
    }, [selectList])
  );

  const [searchPhrase, setSearchPhrase] = useState<string>("");
  const [clicked, setClicked] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          zIndex: 2,
          position: "absolute",
          top: insets.top + 13,
          left: 0,
          right: 0,
          alignItems: "center",
          opacity: scrollY.interpolate({
            inputRange: [-20, 0],
            outputRange: [1, 0],
          }),
          transform: [
            {
              rotate: scrollY.interpolate({
                inputRange: [-45, -35],
                outputRange: ["180deg", "0deg"],
                extrapolate: "clamp",
              }),
            },
          ],
        }}
      >
        <Feather name="arrow-down" color="white" size={25} />
      </Animated.View>
      <AnimatedImageBackground
        style={{
          backgroundColor: color.Primary,
          zIndex: 3,
          left: 0,
          right: 0,
          height: HEADER_HEIGHT_EXPANDED + HEADER_HEIGHT_NARROWED,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          transform: [
            {
              scale: scrollY.interpolate({
                inputRange: [-200, 0],
                outputRange: [5, 1],
                extrapolateLeft: "extend",
                extrapolateRight: "clamp",
              }),
            },
          ],
        }}
        source={0}
      >
        <Animated.View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            marginTop: Platform.OS === "ios" ? 60 : 12,
            // borderWidth: 1,
            opacity: scrollY.interpolate({
              inputRange: [-200, 0, 200],
              outputRange: [0, 1, 0],
              extrapolateLeft: "extend",
              extrapolateRight: "clamp",
            }),
            paddingHorizontal: 32,
          }}
        >
          <View style={styles.boxName}>
            <Text style={styles.helloText}>Hello,</Text>
            <Text style={styles.nameText} numberOfLines={1}>
              {titleCase(username)}
            </Text>
          </View>
          <Avatar.Image
            size={80}
            source={{
              uri: user.avatar,
            }}
            style={{ backgroundColor: "transparent" }}
          />
        </Animated.View>
      </AnimatedImageBackground>
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      {(ordersShipping?.length === 0 && selectList == 1) ||
      (ordersShipped?.length === 0 && selectList == 0) ||
      (ordersApproved?.length === 0 && selectList == 2) ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            top: 60,
            flex: 1,
          }}
        >
          <AnimatedLottieView
            source={require("../../../assets/question/empty-box1.json")}
            autoPlay
            style={{ width: "100%" }}
          />
          <Text
            style={{
              top: 0,
              fontFamily: "RobotoSlab-Bold",
              fontSize: 16,
              color: "black",
            }}
          >
            No Orders Yet
          </Text>
        </View>
      ) : null}
      <Animated.FlatList
        data={
          selectList == 1
            ? ordersShipping
            : selectList == 0
            ? ordersShipped
            : ordersApproved
        }
        style={{
          zIndex: 2,
          paddingHorizontal: 16,
        }}
        renderItem={({ item }) => (
          <ItemOrderView
            isShowStatus={true}
            selectList={selectList}
            item={item}
          />
        )}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 100,
  },
  text: {
    color: "white",
  },
  username: {
    fontSize: 18,
    fontFamily: "RobotoSlab-Bold",
    marginBottom: -3,
  },
  tweetsCount: {
    fontSize: 13,
  },
  tweet: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(255, 255, 255, 0.25)",
  },
  boxInfor: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  boxName: {
    marginRight: 80,
  },
  helloText: {
    fontSize: 26,
    // fontWeight: "bold",
    fontFamily: "RobotoSlab-Bold",
    color: "white",
  },
  nameText: {
    fontSize: 30,
    // fontWeight: "bold",
    fontFamily: "RobotoSlab-Bold",
    color: "white",
  },
});
1;
