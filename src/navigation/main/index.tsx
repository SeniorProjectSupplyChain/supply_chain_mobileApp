import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import Loading from "../../components/Load";
import Login from "../../screen/LoginScreen";
import ReactNativeModal from "react-native-modal";
import { TabsDistributor, TabsRetailer } from "../tabs";
import CartScreen from "../../screen/retailer/CartScreen";
import { NavigationContainer } from "@react-navigation/native";
import RetailerMapScreen from "../../screen/retailer/MapScreen";
import ProductScreen from "../../screen/retailer/ProductScreen";
import CanvasScreen from "../../screen/distributor/CanvasScreen";
import DistributorMapScreen from "../../screen/distributor/MapScreen";
import OrderDetailScreen from "../../screen/retailer/OrderDetailScreen";
import HistoryOrderScreen from "../../screen/retailer/HistoryOrderScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailProductScreen from "../../screen/distributor/DetailProductScreen";
import HistoryProductScreen from "../../screen/retailer/HistoryProductScreen";
import { color } from "../../utils";

const Stack = createNativeStackNavigator();

export function App() {
  const user = useSelector((state: any) => state?.auth?.user?.user);
  const load = useSelector((state: any) => state.load.loading);

  // console.log(user);

  return (
    <>
      <ReactNativeModal
        isVisible={load}
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            // padding: 120,
            paddingHorizontal: 120,
            paddingVertical: 60,
            borderRadius: 24,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: color.Primary,
              fontSize: 20,
              fontFamily: "RobotoSlab-Bold",
              marginBottom: 60,
            }}
          >
            Please Wait...
          </Text>
          <Loading />
        </View>
      </ReactNativeModal>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
            component={Login}
          />
          {user?.role === "distributor" ? (
            <Stack.Screen
              name="MainDistributor"
              options={{ headerShown: false, gestureEnabled: false }}
              component={TabsDistributor}
            />
          ) : user?.role === "retailer" ? (
            <Stack.Screen
              name="MainRetailer"
              options={{ headerShown: false, gestureEnabled: false }}
              component={TabsRetailer}
            />
          ) : null}
          <Stack.Screen
            name="DetailProductScreen"
            // options={{ headerShown: false }}
            component={DetailProductScreen}
          />
          <Stack.Screen
            name="OrderDetailScreen"
            // options={{ headerShown: false }}
            component={OrderDetailScreen}
          />
          <Stack.Screen
            name="DistributorMapScreen"
            options={{ headerShown: false }}
            component={DistributorMapScreen}
          />
          <Stack.Screen
            name="RetailerMapScreen"
            options={{ headerShown: false }}
            component={RetailerMapScreen}
          />
          <Stack.Screen
            name="CanvasScreen"
            options={{ headerShown: false }}
            component={CanvasScreen}
          />
          <Stack.Screen
            name="CartScreen"
            // options={{ headerShown: false }}
            component={CartScreen}
          />
          <Stack.Screen
            name="ProductScreen"
            // options={{ headerShown: false }}
            component={ProductScreen}
          />
          <Stack.Screen
            name="HistoryOrderScreen"
            // options={{ headerShown: false }}
            component={HistoryOrderScreen}
          />
          <Stack.Screen
            name="HistoryProductScreen"
            // options={{ headerShown: false }}
            component={HistoryProductScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
