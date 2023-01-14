import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, SafeAreaView } from "react-native";
import { Nav } from "./src/Nav";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { AddButton } from "./src/components/AddButton";
import { Palette } from "./style/palette";
import { Blob1SVG, Blob2SVG, Blob3SVG } from "./src/Svgs";
import BottomSheetContent from "./src/components/BottomSheetContent";
import { Provider } from "react-native-paper";
import CardItemList from "./src/components/CardItemList";
import AddCardModal from "./src/components/AddCardModal";

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [openModal, setOpenModal] = React.useState(false);
  const [openCardForm, setOpenCardForm] = React.useState(false);
  const [shopData, setShopData] = React.useState('');

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

  function openModalAndPassShopId(one:boolean, two:string){

    setOpenCardForm(one);
    setShopData(two);
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
      </View>
  

   
        
        <View>
      <AddButton onPress={() => {setOpenModal(true)}} />
      <BottomSheetContent visible={openModal} onClose={(p)=>{setOpenModal(p)}} >
        <View>
          <CardItemList cardHandler={(open, shopID) => {openModalAndPassShopId(open,shopID)}}/>
        </View>
      </BottomSheetContent>
      <AddCardModal visible={openCardForm} text={"Add a new card"} buttonText={"Proceed"} onClose={()=>{setOpenCardForm(false)}} shopData={shopData}/>

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
