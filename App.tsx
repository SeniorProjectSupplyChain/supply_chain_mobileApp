import "react-native-gesture-handler";

import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Platform } from "react-native";
import { Provider, useSelector } from "react-redux";
import { persistor, store } from "./src/redux/store";
import { App as MainNavigation } from "./src/navigation/main";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LogBox } from "react-native";
// import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import useFonts from "./src/hooks/useFonts";
import { PersistGate } from "redux-persist/integration/react";
import FlashMessage from "react-native-flash-message";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);
LogBox.ignoreLogs([
  'Key "cancelled" in the image picker result is deprecated and will be removed in SDK 48',
]);
LogBox.ignoreLogs([
  "Failed prop type: Invalid prop `defaultSource` supplied to `Image`, expected one of type [number]",
]);

export default function App() {
  const [IsReady, SetIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await useFonts();
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        SetIsReady(true);
      }
    }

    prepare();
  }, []);
  const onLayoutRootView = useCallback(async () => {
    if (IsReady) {
      await SplashScreen.hideAsync();
    }
  }, [IsReady]);

  if (!IsReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={styles.container}>
          <SafeAreaProvider
            style={styles.container}
            onLayout={onLayoutRootView}
          >
            <FlashMessage position="top" />
            <MainNavigation />
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
