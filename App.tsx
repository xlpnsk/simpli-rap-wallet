import "react-native-url-polyfill/auto";
import { StatusBar } from "expo-status-bar";

import { View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";

import RootNavigation from "./src/root";

SplashScreen.preventAutoHideAsync();

export type RootStackParamList = {
  Home: undefined;
  Map: { userId: string };
  Settings: undefined;
};

export default function App() {

  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
  });

  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }



  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <RootNavigation />
    </View>
  );

}
