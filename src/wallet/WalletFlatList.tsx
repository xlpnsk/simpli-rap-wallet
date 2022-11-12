import React from "react";
import { Animated, FlatList } from "react-native";

import WalletCard from "./WalletCard";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const cards = Array(9).fill(null);

const Wallet = () => {
  const y = new Animated.Value(0);
  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y } } }], {
    useNativeDriver: true,
  });
  return (
    <AnimatedFlatList
      scrollEventThrottle={16}
      bounces={false}
      data={cards}
      renderItem={({ index }) => <WalletCard {...{ index, y }} />}
      keyExtractor={(item, index) => `${index}`}
      {...{ onScroll }}
    />
  );
};

export default Wallet;
