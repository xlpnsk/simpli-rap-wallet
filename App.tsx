import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { Nav } from "./src/Nav";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { AddButton } from "./src/components/AddButton";
import { Palette } from "./style/palette";
import { Blob1SVG, Blob2SVG, Blob3SVG } from "./src/Svgs";
import BottomSheet from "./src/components/BottomSheet";
import { Provider } from "react-native-paper";

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [openModal, setOpenModal] = React.useState(false);

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

  const handleModal = () =>{
    setOpenModal(true);
  }
 
  const onClose = () =>{
    setOpenModal(false);
  }

  return (
    <Provider>
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
    
      <BottomSheet text='My custom modal' buttonText="close" visible={openModal} onClose={onClose}></BottomSheet>
     
      <AddButton onPress={handleModal} />
      <StatusBar style="auto" />
    </View>
    </Provider>
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
