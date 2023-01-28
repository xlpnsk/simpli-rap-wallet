import React, { useContext } from "react";
import { Alert, Animated, FlatList } from "react-native";
import { IShopData } from "../home/BottomShopList/CardItemList";
import { SessionContext } from "../root";
import { supabase } from "../supabase";

import WalletCard from "./WalletCard";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
export interface IWallet {
  id: number;
  card_code: string;
  code_type: string;
  shops: IShopData;
}

const Wallet = ({ navigation, route, walletData, deleteWalletData }) => {
  const y = new Animated.Value(0);
  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y } } }], {
    useNativeDriver: true,
  });

  return (
    <AnimatedFlatList
      scrollEventThrottle={16}
      bounces={false}
      data={walletData}
      renderItem={({ index, item }) => (
        <WalletCard
          {...{ index, y, navigation, item, route, deleteWalletData }}
        />
      )}
      keyExtractor={(item, index) => `${index}`}
      {...{ onScroll }}
    />
  );
};

export default Wallet;
