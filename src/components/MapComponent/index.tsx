import styles from "./style";
import Loading from "../Load";
import MapView, { Callout } from "react-native-maps";
import * as Location from "expo-location";
import { Marker } from "react-native-maps";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import MapViewDirections from "react-native-maps-directions";
import { getGeolocation } from "../../helper/getGeolocation";
import { GOOGLE_MAPS_APIKEY, color, getDelta } from "../../utils";
import { Text, TouchableOpacity, View, Image, Platform } from "react-native";

type Props = {
  retailerAddress: string;
  retailerName: string;
};

const coordinates = [
  {
    latitude: 16.011458606786725,
    longitude: 108.1922247401772,
  },
  {
    latitude: 15.963855914235749,
    longitude: 108.2093204610597,
  },
];

type Location = {
  longitude: number;
  latitude: number;
};

const MapComponent: React.FC<Props> = ({ retailerAddress, retailerName }) => {
  const [location, setLocation] = useState<Location>({
    longitude: 0,
    latitude: 0,
  });
  const [retailerLocation, setRetailerLocation] = useState<Location>({
    longitude: 0,
    latitude: 0,
  });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  let delta: { latitudeDelta: number; longitudeDelta: number };
  delta = {
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  const navigation = useNavigation();
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      } else {
        setErrorMsg(null);
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  useEffect(() => {
    if (retailerAddress !== "") {
      getGeolocation(retailerAddress)
        .then((result) => {
          if (result) {
            setRetailerLocation(result);
          } else {
            console.log("Không tìm thấy kết quả.");
          }
        })
        .catch((error) => {
          console.error("Lỗi:", error);
        })
        .finally(() => {});
    }
  }, [retailerAddress]);

  // console.log(location);
  // console.log(retailerLocation);

  let coordinates = [location, retailerLocation];
  // console.log(coordinates);

  const handlePress = () => {
    // Xử lý sự kiện onPress
    navigation.navigate("DistributorMapScreen", coordinates);
  };
  return (
    <View style={[styles.container, styles.shadow]}>
      {errorMsg ? (
        <Text>{errorMsg}</Text>
      ) : location && retailerLocation.latitude ? (
        <MapView
          style={[styles.map, styles.shadow]}
          initialRegion={{
            latitude: coordinates[0]?.latitude,
            longitude: coordinates[0]?.longitude,
            latitudeDelta: delta?.latitudeDelta,
            longitudeDelta: delta?.longitudeDelta,
          }}
        >
          {coordinates.map((coordinate, index) => (
            <Marker
              key={`coordinate_${index}`}
              coordinate={coordinate}
              title={index == 0 ? "Your location" : undefined}
              pinColor={index == 0 ? "blue" : undefined}
            >
              {index == 0 ? (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(86, 128, 244, 0.6)",
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#5883fa",
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      borderWidth: 3,
                      borderColor: "#fff",
                    }}
                  />
                </View>
              ) : (
                <Image
                  source={{
                    uri: "https://firebasestorage.googleapis.com/v0/b/supply-chain-9ea64.appspot.com/o/mobileApp%2Fmarker.png?alt=media&token=c38b454f-a7bf-4954-a6f2-9a44191201e0",
                  }}
                  style={{ width: 36, height: 36 }}
                />
              )}
            </Marker>
          ))}
          {coordinates.length === 2 && (
            <MapViewDirections
              origin={coordinates[0]}
              destination={coordinates[1]}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={5}
              strokeColor="#67d753"
            />
          )}
        </MapView>
      ) : (
        <Loading />
      )}
      <TouchableOpacity
        style={styles.inforMap}
        activeOpacity={1}
        onPress={handlePress}
      >
        <Text style={{ fontFamily: "RobotoSlab-SemiBold", fontSize: 16 }}>
          From <Text style={{ color: color.Primary }}>You</Text> to{" "}
          <Text style={{ color: color.Primary }}>Retailer</Text>
        </Text>
        <Text
          style={{ fontFamily: "RobotoSlab-VariableFont_wght", fontSize: 15 }}
          numberOfLines={1}
        >
          {retailerAddress}
        </Text>
        <Text
          style={{
            fontFamily: "RobotoSlab-Medium",
            fontSize: 15,
            color: color.Primary,
          }}
        >
          {retailerName}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(MapComponent);
