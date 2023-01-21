import * as React from "react";
import { Alert, View } from "react-native";
import { supabase } from "../../supabase";
import BottomSheetContent from "./BottomSheetContent";
import CardItemList, { IShopData } from "./CardItemList";

interface IBottomShopList {
  onClose: (p: boolean) => void;
  cardHandler: (isFormOpen: boolean, shopData: IShopData) => void;
  visible: boolean;
}
export const BottomShopList: React.FC<IBottomShopList> = ({
  onClose,
  cardHandler,
  visible,
}) => {
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
  return (
    <BottomSheetContent visible={visible} onClose={onClose}>
      <View>
        <CardItemList shopData={shopData} cardHandler={cardHandler} />
      </View>
    </BottomSheetContent>
  );
};
