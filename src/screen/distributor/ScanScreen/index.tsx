import React, { useState, useEffect } from "react";
import { parseUrl } from "../../../helper/parseUrl";
import AnimatedLottieView from "lottie-react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";
import { Svg, Defs, Rect, Mask } from "react-native-svg";
import {
  API_URL,
  FE_URL,
  color,
  windowHeight,
  windowWidth,
} from "../../../utils";
import { Button, Image, Platform, StyleSheet, Text, View } from "react-native";
import ReactNativeModal from "react-native-modal";
import ModalNullData from "../../../components/ModalNullData";

const ScanScreen = () => {
  const navigation = useNavigation();

  const [hasPermission, setHasPermission]: [
    string | boolean | null,
    React.Dispatch<React.SetStateAction<string | boolean | null>>
  ] = useState<string | boolean | null>(null);

  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Not yet scanned");
  const [viewDataNotFound, setViewDataNotFound] = useState(false);

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }: { type: any; data: any }) => {
    if (data !== text) {
      setText(data);

      // console.log(parseUrl(data)?.domain);

      if (
        parseUrl(data)?.domain == API_URL ||
        parseUrl(data)?.domain == FE_URL
      ) {
        if (parseUrl(data)?.path === "order") {
          navigation.navigate("DetailProductScreen", parseUrl(data)?.id);
        } else {
          setViewDataNotFound(true);
          return null;
        }
      } else {
        setViewDataNotFound(true);
        return null;
      }
    }

    setTimeout(() => {
      setText("");
    }, 5000);
  };
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button
          title={"Allow Camera"}
          onPress={() => askForCameraPermission()}
        />
      </View>
    );
  }

  // Check permissions and return the screens
  return (
    <View style={styles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{
            height: windowHeight,
            width: Platform.OS !== "ios" ? windowWidth * 1.38 : "100%",
            flex: 1,
            // borderWidth: ,
            alignItems: "center",
            justifyContent: "center",
            left: Platform.OS === "ios" ? 0 : -30,
          }}
        >
          {/* <View
            style={[
              {
                height: 50,
                width: 50,
                backgroundColor: "red",
                position: "absolute",
              },
            ]}
          /> */}

          <Svg height="100%" width="100%">
            <Defs>
              <Mask id="mask" x="0" y="0" width="100%" height="100%">
                <Rect height="100%" width="100%" fill="#fff" />
                <Rect
                  x={Platform.OS === "ios" ? "10%" : "12%"}
                  y="32%"
                  height="320"
                  width="320"
                  fill="#000"
                />
                <View
                  style={{
                    // backgroundColor: "red",
                    height: "75%",
                    width: Platform.OS === "ios" ? "90%" : "70%",
                    left: Platform.OS === "ios" ? 20 : 28,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {Platform.OS === "ios" ? (
                    <AnimatedLottieView
                      source={require("../../../../assets/qrcode/scan.json")}
                      autoPlay
                      // loop
                      style={{ height: 160 }}
                    />
                  ) : (
                    <Image
                      source={require("../../../../assets/qrcode/scan1.png")}
                      style={{ height: 100, width: 100 }}
                    />
                  )}
                  <Text
                    style={{
                      fontFamily: "RobotoSlab-Bold",
                      fontSize: 20,
                      color: "#fff",
                      alignContent: "center",
                      textAlign: "center",
                    }}
                  >
                    Scan QR code
                  </Text>
                </View>
              </Mask>
            </Defs>
            <Rect
              height="100%"
              width="100%"
              fill="rgba(0,0,0,0.6)"
              mask="url(#mask)"
            />
            <Rect
              x={Platform.OS === "ios" ? "10%" : "12%"}
              y="32%"
              height="320"
              width="320"
              strokeWidth={5}
              stroke="#FFF"
              rx="8"
            />
          </Svg>
        </BarCodeScanner>
      </View>
      <ReactNativeModal
        isVisible={viewDataNotFound}
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <ModalNullData
          funCancel={() => {
            setViewDataNotFound(false);
          }}
        />
      </ReactNativeModal>
    </View>
  );
};

export default ScanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.Primary,
    alignItems: "center",
    justifyContent: "center",
  },
  maintext: {
    fontSize: 24,
    margin: 20,
  },
  barcodebox: {
    // alignItems: "center",
    // justifyContent: "center",
    height: "85%",
    width: "96%",
    overflow: "hidden",
    // borderRadius: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // alignItems: "center",
    top: -20,
    backgroundColor: "tomato",
  },
});
