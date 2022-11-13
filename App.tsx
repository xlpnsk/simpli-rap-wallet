import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { Nav, SettingsButton } from "./src/Nav";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { AddButton } from "./src/components/AddButton";
import { Palette } from "./style/palette";

import Map from "./src/map";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import Home from "./src/home";
import { SettingsSVG } from "./src/Svgs";
import Settings from "./src/settings";

const styles = StyleSheet.create({
  header: {
    backgroundColor: Palette.DarkBlue,
    alignItems: "center",
    overflow: "hidden",
  },
  title: {
    fontFamily: "Poppins-Regular",
    fontWeight: "900",
    color: Palette.LightBlue,
    fontSize: 16,
    lineHeight: 24,
  },
});

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

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
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerRight: () => <SettingsButton />,
              headerStyle: styles.header,
              headerTintColor: Palette.LightBlue,
              headerTitleStyle: styles.title,
              title: "simpli-RAP-wallet",
            }}
          />
          <Stack.Screen
            name="Map"
            component={Map}
            options={{
              headerStyle: styles.header,
              headerTintColor: Palette.LightBlue,
              headerTitleStyle: styles.title,
            }}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{
              headerStyle: styles.header,
              headerTintColor: Palette.LightBlue,
              headerTitleStyle: styles.title,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>

      <StatusBar style="auto" />
    </View>
  );
}
