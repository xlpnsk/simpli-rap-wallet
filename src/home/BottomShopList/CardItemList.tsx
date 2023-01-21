import { View, Text, ScrollView, Alert, Dimensions } from "react-native";
import * as React from "react";
import CardItem from "./CardItem";
import { supabase } from "../../supabase";

interface CardItemListProps {
  cardHandler: (card: boolean, shopData: IShopData) => void;
  shopData: IShopData[];
}

export interface IShopData {
  id: number;
  name: string;
  leaflet_url: string;
  is_common: boolean;
}

const CardItemList = ({ cardHandler, shopData }: CardItemListProps) => {
  const screenWidth = Dimensions.get("window").width;
  return (
    <View style={{ width: "100%" }}>
      <ScrollView style={{ width: screenWidth }}>
        {shopData.map((shop) => {
          return (
            <CardItem
              key={shop.id}
              shopData={shop}
              handleForm={(openModal, shopData) => {
                cardHandler(openModal, shopData);
              }}
            />
          );
        })}
        <CardItem
          shopData={null}
          handleForm={(openModal, shopData) => {
            cardHandler(openModal, null);
          }}
        />
      </ScrollView>
    </View>
  );
};

export default CardItemList;
