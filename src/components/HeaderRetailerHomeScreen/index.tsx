import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import Loading from "../Load";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getGeolocation } from "../../helper/getGeolocation";
import { color, windowHeight, windowWidth } from "../../utils";
import AnimatedLottieView from "lottie-react-native";

type Props = {
  user: any;
};
type Location = {
  longitude?: number;
  latitude?: number;
};

const HeaderRetailerHomeScreen: React.FC<Props> = ({ user }) => {
  const navigation = useNavigation();
  // let location: Location = {
  //   longitude: undefined,
  //   latitude: undefined,
  // };
  const [location, setLocation] = useState<Location>({
    longitude: undefined,
    latitude: undefined,
  });
  const [load, setLoad] = useState<boolean>(false);
  useEffect(() => {
    getGeolocation(user?.address)
      .then((result) => {
        setLoad(true);
        if (result) {
          setLocation(result);
          setLoad(false);
        } else {
          console.log("Không tìm thấy kết quả.");
        }
      })
      .catch((error) => {
        console.error("Lỗi:", error);
      })
      .finally(() => {});
  }, []);

  const handlePress = () => {
    navigation.navigate("RetailerMapScreen", { location });
  };

  return (
    <View style={styles.container}>
      {load ? (
        <AnimatedLottieView
          source={require("../../../assets/load/load.json")}
          autoPlay
          loop
          style={styles.load}
        />
      ) : (
        <>
          <Text style={styles.text}>{user.fullName}</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => handlePress()}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Ionicons name="location-sharp" size={24} color="#f75040" />
              <Text numberOfLines={1} style={styles.address}>
                {user.address || undefined}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default HeaderRetailerHomeScreen;

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: windowHeight * 0.012,
    // height: 100,
  },
  text: {
    fontSize: 18,
    alignSelf: "center",
    color: "#fff",
    fontFamily: "RobotoSlab-Medium",
  },
  address: {
    width: windowWidth * 0.5,
    fontSize: 14,
    color: "#fff",
    fontFamily: "RobotoSlab-VariableFont_wght",
    fontWeight: "600",
  },
  load: {
    width: 40,
    height: 40,
    // borderWidth: 1,
    zIndex: 100,
    // backgroundColor: "transparent",
  },
});
