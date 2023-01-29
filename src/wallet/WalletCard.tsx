import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";
import { RootAuthorizedStackParamList } from "../root/AuthorizedStack";
import Card, { CARD_HEIGHT as DEFAULT_CARD_HEIGHT } from "./Card";
import { IWallet } from "./WalletFlatList";

export const MARGIN = 16;
export const CARD_HEIGHT = DEFAULT_CARD_HEIGHT + MARGIN * 2;
const { height: wHeight } = Dimensions.get("window");
const height = wHeight - 64;
const styles = StyleSheet.create({
  card: {
    marginVertical: MARGIN,
    alignSelf: "center",
  },
});

type Props = NativeStackScreenProps<RootAuthorizedStackParamList, "Home">;

interface WalletCardProps extends Props {
  y: Animated.Value;
  index: number;
  item: IWallet;
  deleteWalletData;
}

const WalletCard = ({
  y,
  index,
  navigation,
  item,
  deleteWalletData,
}: WalletCardProps) => {
  const position = Animated.subtract(index * CARD_HEIGHT, y);
  const isDisappearing = -CARD_HEIGHT;
  const isTop = 0;
  const isBottom = height - CARD_HEIGHT;
  const isAppearing = height;
  const translateY = Animated.add(
    Animated.add(
      y,
      y.interpolate({
        inputRange: [0, 0.00001 + index * CARD_HEIGHT],
        outputRange: [0, -index * CARD_HEIGHT],
        extrapolateRight: "clamp",
      })
    ),
    position.interpolate({
      inputRange: [isBottom, isAppearing],
      outputRange: [0, -CARD_HEIGHT / 4],
      extrapolate: "clamp",
    })
  );
  const scale = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.5, 1, 1, 0.5],
    extrapolate: "clamp",
  });
  const opacity = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.5, 1, 1, 0.5],
  });
  return (
    <Animated.View
      style={[styles.card, { opacity, transform: [{ translateY }, { scale }] }]}
      key={index}
    >
      <Card
        navigation={navigation}
        item={item}
        deleteWalletData={deleteWalletData}
      />
    </Animated.View>
  );
};

export default WalletCard;
