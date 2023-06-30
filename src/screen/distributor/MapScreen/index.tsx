import React from "react";
import styles from "./style";
import { Platform, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY, getDelta } from "../../../utils";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  currentLocation: {
    longitude: number;
    latitude: number;
  };
  retailer: {
    longitude: number;
    latitude: number;
  };
};
type Coordinates = {
  latitude: number;
  longitude: number;
};

const MapScreen = (props: Props) => {
  const navigation = useNavigation();

  const route = useRoute();
  // console.log(route.params);
  const coordinates: Coordinates[] = route.params as Coordinates[];
  const { latitudeDelta, longitudeDelta } = getDelta(coordinates);

  return (
    <>
      <MapView
        style={[styles.map, styles.shadow]}
        initialRegion={{
          latitude: coordinates[0]?.latitude,
          longitude: coordinates[0]?.longitude,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta,
        }}
      >
        {coordinates.map(
          (coordinate, index) => (
            // <Marker key={`coordinate_${index}`} coordinate={coordinate} />
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
          ) // eslint-disable-line react/no-array-index-key
        )}

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
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[
          styles.headerButton,
          {
            position: "absolute",
            top: Platform.OS === "ios" ? 60 : 12,
            left: 4,
          },
        ]}
      >
        <FontAwesome name="angle-left" size={24} color="black" />
      </TouchableOpacity>
    </>
  );
};

export default MapScreen;
