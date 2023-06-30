import * as React from "react";
import { useRef } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import styles from "./style";
import { useSnapshot } from "valtio";
import Header from "../../../components/SketchComponent/Header";
import Toolbar from "../../../components/SketchComponent/Toolbar";
import { state } from "../../../components/SketchComponent/store";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SketchCanvas, SketchCanvasRef } from "rn-perfect-sketch-canvas";

export default function CanvasScreen() {
  const navigation = useNavigation();
  const route = useRoute<any>();
  // console.log(route.params);

  const { width } = useWindowDimensions();
  const canvasRef = useRef<SketchCanvasRef>(null);
  const snap = useSnapshot(state);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          backgroundColor: "#f0f0f0",
          flex: 1,
          alignItems: "center",
        }}
      >
        <Header
          canvasRef={canvasRef}
          setSignature={route?.params?.setSignature}
        />
        <View
          style={{
            width: width - 24,
            flexGrow: 1,
            backgroundColor: "#ffffff",
            borderRadius: 10,
            overflow: "hidden",
            elevation: 1,
          }}
        >
          <SketchCanvas
            strokeColor={snap.strokeColor}
            strokeWidth={snap.strokeWidth}
            ref={canvasRef}
            containerStyle={styles.container}
          />
        </View>

        <Toolbar />
      </View>
    </SafeAreaView>
  );
}
