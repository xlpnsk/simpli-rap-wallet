import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  View,
  Text,
  Pressable,
} from "react-native";
import { Palette } from "../../style/palette";

const { width } = Dimensions.get("window");
const ratio = 228 / 362;
export const CARD_WIDTH = width * 0.8;
export const CARD_HEIGHT = CARD_WIDTH * ratio;

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    borderColor: Palette.DarkBlue,
    borderWidth: 2,
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  shopName: {
    fontSize: 19,
    fontWeight: "600",
    lineHeight: 22,
    color: Palette.Fuchsia,
  },
  cardInner: {
    width: "100%",
    height: "50%",
    flexDirection: "row",
    borderRadius: 15,
    padding: 15,
  },
  qrContainer: {
    height: "100%",
    flex: 1,
    position: "relative",
    aspectRatio: 1,
    alignSelf: "center",
    marginLeft: 10,
  },
  mapContainer: {
    height: "100%",
    // backgroundColor: "grey",
    flex: 3,
    alignSelf: "center",
    borderRadius: 10,
    position: "relative",
    overflow: "hidden",
  },
});

const Card = ({ navigation }) => {
  let source: number;
  return (
    <View style={styles.card} {...{ source }}>
      <View style={styles.cardInner}>
        <Text style={styles.shopName}>Shop name</Text>
      </View>
      <View style={[styles.cardInner]}>
        <Pressable
          style={styles.mapContainer}
          onPress={() => navigation.navigate("Map")}
        >
          <Image
            source={{
              uri: "https://i.stack.imgur.com/HILmr.png",
            }}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        </Pressable>
        <Pressable style={styles.qrContainer}>
          <Image
            source={require("../../assets/qr-sample.png")}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        </Pressable>
      </View>
    </View>
  );
};
export default Card;
