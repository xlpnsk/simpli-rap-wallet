import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, StyleSheet } from "react-native";
import { RootStackParamList } from "../../App";
import { Palette } from "../../style/palette";
import { AddButton } from "../components/AddButton";

import { Blob1SVG, Blob2SVG, Blob3SVG } from "../Svgs";
import Wallet from "../wallet/WalletFlatList";

import BottomSheetContent from "../components/BottomSheetContent";
import { Provider } from "react-native-paper";
import CardItemList, { IShopData } from "../components/CardItemList";
import AddCardModal from "../components/AddCardModal";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const Home = ({ navigation }: Props) => {
  const [openModal, setOpenModal] = React.useState(false);
  const [openCardForm, setOpenCardForm] = React.useState(false);
  const [shopData, setShopData] = React.useState<IShopData | null>(null);
  function openModalAndPassShopId(isFormOpen: boolean, shopData: IShopData) {
    setOpenCardForm(isFormOpen);
    setShopData(shopData);
  }

  return (
    <Provider>
      <View style={styles.container}>
        <Blob1SVG style={styles.blob1} />
        <Blob2SVG style={styles.blob2} />
        <Blob3SVG style={styles.blob3} />
        <Wallet navigation={navigation} />
        <AddButton onPress={() => setOpenModal(true)} />
        <BottomSheetContent
          visible={openModal}
          onClose={(p) => {
            setOpenModal(p);
          }}
        >
          <View>
            <CardItemList
              cardHandler={(open, shopID) => {
                openModalAndPassShopId(open, shopID);
              }}
            />
          </View>
        </BottomSheetContent>
        <AddCardModal
          visible={openCardForm}
          text={"Add a new card"}
          buttonText={"Proceed"}
          onClose={() => {
            setOpenCardForm(false);
          }}
          shopData={shopData}
        />
      </View>
    </Provider>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.LightBlue,
  },
  blob1: {
    position: "absolute",
    top: -10,
    right: 0,
    zIndex: -1,
  },
  blob2: {
    position: "absolute",
    bottom: 169,
    right: 0,
    zIndex: -1,
  },
  blob3: {
    position: "absolute",
    bottom: 87,
    left: 0,
    zIndex: -1,
  },
});
