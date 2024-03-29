import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  View,
  Text,
  Pressable,
  Modal,
  Animated,
  PanResponder,
  Alert,
} from "react-native";
import { Palette } from "../../style/palette";
import * as WebBrowser from "expo-web-browser";
import { CodeGenerator } from "../home/CodeGenerator";
import GestureRecognizer from "react-native-swipe-gestures";
import { Icon } from "react-native-elements";
import { supabase } from "../supabase";
import { SessionContext } from "../root";

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
    overflow: "hidden",
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
    justifyContent: "space-between",
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
  spacer: {
    height: "100%",
    flex: 3,
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
  innerFrame: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    flex: 1,
    zIndex: 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, .3)",
  },
  innerFrameText: {
    color: "#ffffff",
    fontFamily: "Poppins-Regular",
    fontWeight: "600",
  },
  shopNameContainer: {
    display: "flex",
    flexDirection: "row",
    flex: 3,
    alignItems: "center",
  },
  leaflet: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Palette.DarkBlue,
    backgroundColor: Palette.LightBlue,
  },
  leafletText: {
    fontFamily: "Poppins-Regular",
    fontWeight: "600",
  },
  leafletIcon: {
    display: "flex",
    width: 40,
    height: 40,
  },
  codeModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const AnimatedGestureRecognizer =
  Animated.createAnimatedComponent(GestureRecognizer);

const Card = ({ navigation, item, deleteWalletData }) => {
  const [codeModalOpen, setCodeModalOpen] = React.useState(false);
  const x = React.useRef(new Animated.Value(0)).current;
  const session = React.useContext(SessionContext);

  const handleDelete = async (id: number) => {
    const { data, error } = await supabase
      .from("wallets")
      .delete()
      .eq("id", id)
      .eq("user_id", session.user.id);

    if (error) {
      Alert.alert(error.message);
      return;
    } else {
      deleteWalletData(id);
    }
  };

  const swipeLeftHandler = () => {
    Animated.timing(x, {
      toValue: -0.2 * CARD_WIDTH,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const swipeRightHandler = () => {
    Animated.timing(x, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      <View style={styles.card}>
        <AnimatedGestureRecognizer
          onSwipeLeft={swipeLeftHandler}
          onSwipeRight={swipeRightHandler}
          style={{
            transform: [{ translateX: x }],
          }}
        >
          <View style={styles.cardInner}>
            <View style={styles.shopNameContainer}>
              <Text style={styles.shopName}>{item.shops.name}</Text>
            </View>
            <Pressable
              style={styles.leaflet}
              onPress={() =>
                WebBrowser.openBrowserAsync(item.shops.leaflet_url)
              }
            >
              <Image
                source={require("../../assets/leaflet.png")}
                style={styles.leafletIcon}
              />
            </Pressable>
          </View>
          <View style={[styles.cardInner]}>
            {item.shops.is_common ? (
              <Pressable
                style={styles.mapContainer}
                onPress={() =>
                  navigation.navigate("Map", { shopName: item.shops.name })
                }
              >
                <View style={styles.innerFrame}></View>
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
            ) : (
              <View style={styles.spacer} />
            )}
            <Pressable
              style={styles.qrContainer}
              onPress={() => setCodeModalOpen(true)}
            >
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

          <Pressable
            style={{
              position: "absolute",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              left: "100%",
              width: 0.2 * CARD_WIDTH,
              backgroundColor: "red",
            }}
            onPress={() => handleDelete(item.id)}
          >
            <Icon type="font-awesome" name="trash" />
          </Pressable>
        </AnimatedGestureRecognizer>
      </View>
      <Modal
        visible={codeModalOpen}
        onRequestClose={() => setCodeModalOpen(false)}
      >
        <View style={styles.codeModal}>
          <CodeGenerator data={item.card_code} type={item.code_type} />
        </View>
      </Modal>
    </>
  );
};
export default Card;
