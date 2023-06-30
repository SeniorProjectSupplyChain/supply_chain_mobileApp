import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParam = {
  DetailProductScreen: any;
  MapScreen: {
    currentLocation: any;
    retailer: any;
  };
  Login: any;
};

export type DetailProductScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParam, "DetailProductScreen">;
};
export type MapScreenProps = {
  route: RouteProp<RootStackParam, "MapScreen">;
  navigation: NativeStackNavigationProp<RootStackParam, "MapScreen">;
};
