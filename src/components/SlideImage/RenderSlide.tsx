import React from "react";
import Carousel, {
  ParallaxImage,
  Pagination,
} from "react-native-new-snap-carousel";
import { windowWidth } from "../../utils";
import { StyleSheet, Text, View, Image, Platform } from "react-native";

const RenderSilde = ({
  item,
  index,
  parallaxProps,
}: {
  item: any;
  index: any;
  parallaxProps: any;
}) => {
  return (
    <View style={styles.item}>
      <ParallaxImage
        source={{ uri: item }}
        containerStyle={styles.imageContainer}
        style={styles.image}
        parallaxFactor={0.4}
        {...parallaxProps}
      />
      {/* <Image source={{ uri: item }} style={styles.image} /> */}
      {/* <Text>{item}</Text> */}
    </View>
  );
};
export default RenderSilde;

const styles = StyleSheet.create({
  item: {
    // width: windowWidth - 60,
    // height: windowWidth - 200,
    // marginRight: 10,
    // alignItems: 'center',
    // justifyContent: 'center',
    // borderWidth:1
    // alignItems: "center",
    // justifyContent: "center",
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    // width: windowWidth - 90,
    height: windowWidth - 200,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    // resizeMode: "contain",
  },
});
