import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, StyleSheet } from "react-native";
import { RootStackParamList } from "../../App";
import { Palette } from "../../style/palette";
import { AddButton } from "../components/AddButton";

import { Blob1SVG, Blob2SVG, Blob3SVG } from "../Svgs";
import Wallet from "../wallet/WalletFlatList";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const Home = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Blob1SVG style={styles.blob1} />
      <Blob2SVG style={styles.blob2} />
      <Blob3SVG style={styles.blob3} />
      <Wallet navigation={navigation} />
      <AddButton onPress={() => console.log()} />
    </View>
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
