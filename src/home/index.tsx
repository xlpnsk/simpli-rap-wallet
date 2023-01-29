import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Palette } from "../../style/palette";
import { AddButton } from "../components/AddButton";

import { Blob1SVG, Blob2SVG, Blob3SVG } from "../Svgs";
import Wallet, { IWallet } from "../wallet/WalletFlatList";

import { Provider } from "react-native-paper";
import { IShopData } from "./BottomShopList/CardItemList";
import AddCardModal from "../components/AddCardModal";
import { RootAuthorizedStackParamList } from "../root/AuthorizedStack";
import { BottomShopList } from "./BottomShopList";
import { SessionContext } from "../root";
import { supabase } from "../supabase";

type Props = NativeStackScreenProps<RootAuthorizedStackParamList, "Home">;

const Home = ({ navigation, route }: Props) => {
  const [openModal, setOpenModal] = React.useState(false);
  const [openCardForm, setOpenCardForm] = React.useState(false);
  const [shopData, setShopData] = React.useState<IShopData | null>(null);
  const session = React.useContext(SessionContext);
  const [wallet, setWallet] = React.useState<IWallet[]>([]);

  const openModalAndPassShopId = (isFormOpen: boolean, shopData: IShopData) => {
    setOpenCardForm(isFormOpen);
    setShopData(shopData);
  };

  const deleteWalletRecord = (id: number) => {
    setWallet((data) => data.filter((d) => d.id !== id));
  };

  const fetchWallet = async () => {
    let { data: walletData, error: walletError } = await supabase
      .from("wallets")
      .select(
        `
          id,
          card_code,
          code_type,
          shops(
            id,
            name,
            leaflet_url,
            is_common
          )
        `
      )
      .eq("user_id", session.user.id);
    if (walletError) throw new Error(walletError.message);
    setWallet(walletData as IWallet[]);
  };

  React.useEffect(() => {
    fetchWallet().catch((error) => Alert.alert(error.message));
  }, []);

  return (
    <Provider>
      <View style={styles.container}>
        <Blob1SVG style={styles.blob1} />
        <Blob2SVG style={styles.blob2} />
        <Blob3SVG style={styles.blob3} />
        <Wallet
          walletData={wallet}
          navigation={navigation}
          route={route}
          deleteWalletData={deleteWalletRecord}
        />
        <AddButton onPress={() => setOpenModal(true)} />
        <BottomShopList
          visible={openModal}
          cardHandler={openModalAndPassShopId}
          onClose={(p) => {
            setOpenModal(p);
          }}
        />
        <AddCardModal
          visible={openCardForm}
          text={"Add a new card"}
          buttonText={"Proceed"}
          onClose={() => {
            setOpenCardForm(false);
            fetchWallet().catch((error) => Alert.alert(error.message));
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
    position: "relative",
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
