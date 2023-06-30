import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { color, windowHeight } from "../../../utils";
import DynamicHeader from "../../../components/DynamicHeader";

type Props = {};
const HomeScreen = (props: Props) => {
  const user = useSelector((state: any) => state?.auth?.user?.user);
  const [selectList, setSelectList] = useState<number>(1);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <DynamicHeader username={user?.fullName} selectList={selectList}>
        <View style={{}} />
      </DynamicHeader>

      <View
        style={{
          flexDirection: "row",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          width: 200,
          transform: [{ rotate: "-90deg" }],
          position: "absolute",
          top: Platform.OS === "ios" ? 360 : 320,
          left: -94,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: selectList === 0 ? "gray" : color.Primary,
            paddingHorizontal: 8,
            paddingVertical: 12,
            width: 100,
            marginRight: 20,
            alignItems: "center",
            borderRadius: 12,
          }}
          disabled={selectList === 0 ? true : false}
          onPress={() => {
            setSelectList(0);
          }}
        >
          <Text
            style={{
              fontSize: 14,
              // fontWeight: "500",
              fontFamily: "RobotoSlab-Medium",
              color: "#fff",
              // marginTop: 12,
              bottom: -4,
            }}
          >
            History
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: selectList === 1 ? "gray" : color.Primary,
            paddingHorizontal: 8,
            paddingVertical: 12,
            width: 100,
            marginRight: 20,
            alignItems: "center",
            borderRadius: 12,
          }}
          disabled={selectList === 1 ? true : false}
          onPress={() => {
            setSelectList(1);
          }}
        >
          <Text
            style={{
              fontSize: 14,
              // fontWeight: "500",
              fontFamily: "RobotoSlab-Medium",
              color: "#fff",
              // marginTop: 12,
              bottom: -4,
            }}
          >
            Shipping
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: selectList === 2 ? "gray" : color.Primary,
            paddingHorizontal: 8,
            paddingVertical: 12,
            marginRight: 20,
            width: 100,
            alignItems: "center",
            borderRadius: 12,
          }}
          onPress={() => {
            setSelectList(2);
          }}
          disabled={selectList === 2 ? true : false}
        >
          <Text
            style={{
              fontSize: 14,
              // fontWeight: "500",
              fontFamily: "RobotoSlab-Medium",
              color: "#fff",
              // marginTop: 12,
              bottom: -4,
            }}
          >
            Request
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // borderWidth: 5,
    paddingTop: 60,
  },
});
