import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { Nav } from "./src/Nav";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { AddButton } from "./src/components/AddButton";
import { Palette } from "./style/palette";
import { Blob1SVG, Blob2SVG, Blob3SVG } from "./src/Svgs";

SplashScreen.preventAutoHideAsync();

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
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Nav />
      <Blob1SVG style={styles.blob1} />
      <Blob2SVG style={styles.blob2} />
      <Blob3SVG style={styles.blob3} />
      <Text
        style={{
          fontFamily: "Poppins-Regular",
          fontSize: 30,
          textAlign: "center",
        }}
      >
        Open up App.js to start working on your app!
      </Text>
      <AddButton onPress={() => console.log()} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.LightBlue,
  },
  blob1: {
    position: "absolute",
    top: 39,
    right: 0,
    zIndex: -1,
  },
  blob2: {
    position: "absolute",
    bottom: 129,
    right: 0,
    zIndex: -1,
  },
  blob3: {
    position: "absolute",
    bottom: 67,
    left: 0,
    zIndex: -1,
  },
});
