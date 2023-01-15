import { View, Text, ScrollView, Alert, Dimensions } from "react-native";
import * as React from "react";
import CardItem from "./CardItem";
import { supabase } from "../supabase";

interface CardItemListProps {
  cardHandler: (card: boolean, shopData: IShopData) => void;
}

export interface IShopData {
  id: number;
  name: string;
  leaflet_url: string;
  is_common: string;
}

const CardItemList = (props: CardItemListProps) => {
  const { cardHandler } = props;
  const [shopData, setShopData] = React.useState<IShopData[]>([]);
  React.useEffect(() => {
    const fetchShopsData = async () => {
      let { data: shops, error } = await supabase
        .from("shops")
        .select("*")
        .eq("is_common", true);
      if (error) {
        throw new Error(error.message);
      }
      console.log("shops", shops);
      setShopData(shops);
    };

    fetchShopsData().catch((error) => Alert.alert(error.message));
  }, []);
  const screenWidth = Dimensions.get("window").width;
  return (
    <View style={{ width: "100%" }}>
      <ScrollView style={{ width: screenWidth }}>
        {shopData.map((shop) => {
          return (
            <CardItem
              key={shop.id}
              shopData={shop}
              handleForm={(openModal, shopID) => {
                cardHandler(openModal, shopID);
              }}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default CardItemList;
