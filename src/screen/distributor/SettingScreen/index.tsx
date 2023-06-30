import {
  View,
  Text,
  FlatList,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { logoutUser } from "../../../api/auth";
import Profile from "../../../components/Profile";
import { color, windowWidth } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

type Props = {};

const SettingScreen = (props: Props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector((state: any) => state?.auth?.user);
  // console.log(user);

  return (
    // <SafeAreaView style={styles.container}>
    <View style={{ paddingBottom: 120, flex: 1, backgroundColor: "#fff" }}>
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
            <StatusBar
              animated={true}
              backgroundColor={color.Primary}
              barStyle={"light-content"}
            />

            <Profile />

            <View
              style={{
                backgroundColor: "#fff",
                padding: 12,
                marginHorizontal: 12,
                marginVertical: 12,
                borderRadius: 12,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.3,
                shadowRadius: 4.65,

                elevation: 4,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "RobotoSlab-Medium",
                  color: color.Primary,
                }}
              >
                Your Information
              </Text>
              <View
                style={{
                  backgroundColor: "#F8F9FA",
                  width: "100%",
                  height: 1,
                  marginBottom: 8,
                  marginTop: 8,
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <View
                  style={{
                    backgroundColor: "#ebebeb",
                    padding: 6,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 12,
                    marginRight: 8,
                  }}
                >
                  <Entypo name="mail" size={28} color={color.Primary} />
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "RobotoSlab-Medium",
                    color: color.Primary,
                  }}
                >
                  {user?.user?.email}
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    backgroundColor: "#ebebeb",
                    padding: 6,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 12,
                    marginRight: 8,
                  }}
                >
                  <Entypo name="address" size={28} color={color.Primary} />
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "RobotoSlab-Medium",
                    color: color.Primary,
                    width: windowWidth * 0.76,
                  }}
                  numberOfLines={1}
                >
                  {user?.user?.address}
                </Text>
              </View>
            </View>
          </>
        )}
      />
      <TouchableOpacity
        onPress={() => {
          logoutUser(dispatch, navigation);
        }}
        style={styles.buttonLogout}
      >
        <Text
          style={{
            color: "#fff",
            fontFamily: "RobotoSlab-Bold",
            fontSize: 18,
          }}
        >
          Log out
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  buttonLogout: {
    backgroundColor: color.Primary,
    paddingVertical: 12,
    marginVertical: 10,
    marginHorizontal: 12,
    borderRadius: 12,
    alignItems: "center",
    bottom: 0,
  },
});
