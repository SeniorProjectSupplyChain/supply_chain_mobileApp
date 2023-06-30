import DistributorScanScreen from "../../screen/distributor/ScanScreen";
import RetailerScanScreen from "../../screen/retailer/ScanScreen";

import RetailerHomeScreen from "../../screen/retailer/HomeScreen";
import DistributorHomeScreen from "../../screen/distributor/HomeScreen";
import RetailerSettingScreen from "../../screen/retailer/SettingScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DistributorSettingScreen from "../../screen/distributor/SettingScreen";

import styles from "./style";
import { color } from "../../utils";
import { Text } from "react-native";
import { Image } from "react-native";
import { View, Platform } from "react-native";
import { TouchableOpacity } from "react-native";
const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({
  children,
  onPress,
}: {
  children: React.ReactNode;
  onPress: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      top: Platform.OS === "ios" ? -24 : -34,
      justifyContent: "center",
      alignItems: "center",
      ...styles.shadow,
    }}
  >
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: color.Secondary,
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

export function TabsDistributor() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          left: 20,
          right: 20,
          //   elevation: 0,
          backgroundColor: "#fff",
          borderRadius: 18,
          height: 80,
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={DistributorHomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                // top: 10,
                alignItems: "center",
                justifyContent: "center",
                bottom: Platform.OS === "ios" ? -14 : 0,
              }}
            >
              <Image
                source={{
                  uri: "https://firebasestorage.googleapis.com/v0/b/supply-chain-9ea64.appspot.com/o/mobileApp%2Fbox.png?alt=media&token=785470e8-299f-4cd1-9c0e-194b561f8650",
                }}
                resizeMode="contain"
                style={{
                  width: 24,
                  height: 24,
                }}
              />
              <Text
                style={{
                  color: focused ? color.Secondary : "#000",
                  fontSize: 14,
                  fontFamily: "RobotoSlab-VariableFont_wght",
                }}
              >
                Order
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Scan"
        component={DistributorScanScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/supply-chain-9ea64.appspot.com/o/mobileApp%2Fqr-code%20(4).png?alt=media&token=7db912aa-b9d6-4c9f-96c6-80bcdcde67e7",
              }}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                // tintColor:
              }}
            />
          ),
          tabBarButton: (props: any) => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Setting"
        component={DistributorSettingScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                // top: 10,
                alignItems: "center",
                justifyContent: "center",
                bottom: Platform.OS === "ios" ? -14 : 0,
              }}
            >
              <Image
                source={{
                  uri: "https://firebasestorage.googleapis.com/v0/b/supply-chain-9ea64.appspot.com/o/mobileApp%2Fuser.png?alt=media&token=1de9f1ff-e346-48d7-83c4-adbd8c3f5273",
                }}
                resizeMode="contain"
                style={{
                  width: 24,
                  height: 24,
                  // tintColor:
                }}
              />
              <Text
                style={{
                  color: focused ? color.Secondary : "#000",
                  fontSize: 14,
                  fontFamily: "RobotoSlab-VariableFont_wght",
                }}
              >
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export function TabsRetailer() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          left: 20,
          right: 20,
          //   elevation: 0,
          backgroundColor: "#fff",
          borderRadius: 18,
          height: 80,
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={RetailerHomeScreen}
        options={{
          // headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                // top: 10,
                alignItems: "center",
                justifyContent: "center",
                bottom: Platform.OS === "ios" ? -14 : 0,
              }}
            >
              <Image
                source={{
                  uri: "https://firebasestorage.googleapis.com/v0/b/supply-chain-9ea64.appspot.com/o/mobileApp%2Fbox.png?alt=media&token=785470e8-299f-4cd1-9c0e-194b561f8650",
                }}
                resizeMode="contain"
                style={{
                  width: 24,
                  height: 24,
                }}
              />
              <Text
                style={{
                  color: focused ? color.Secondary : "#000",
                  fontSize: 14,
                  fontFamily: "RobotoSlab-VariableFont_wght",
                }}
              >
                Order
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Scan"
        component={RetailerScanScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/supply-chain-9ea64.appspot.com/o/mobileApp%2Fqr-code%20(4).png?alt=media&token=7db912aa-b9d6-4c9f-96c6-80bcdcde67e7",
              }}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                // tintColor:
              }}
            />
          ),
          tabBarButton: (props: any) => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Setting"
        component={RetailerSettingScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                // top: 10,
                alignItems: "center",
                justifyContent: "center",
                bottom: Platform.OS === "ios" ? -14 : 0,
              }}
            >
              <Image
                source={{
                  uri: "https://firebasestorage.googleapis.com/v0/b/supply-chain-9ea64.appspot.com/o/mobileApp%2Fuser.png?alt=media&token=1de9f1ff-e346-48d7-83c4-adbd8c3f5273",
                }}
                resizeMode="contain"
                style={{
                  width: 24,
                  height: 24,
                  // tintColor:
                }}
              />
              <Text
                style={{
                  color: focused ? color.Secondary : "#000",
                  fontSize: 14,
                  fontFamily: "RobotoSlab-VariableFont_wght",
                }}
              >
                Management
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
