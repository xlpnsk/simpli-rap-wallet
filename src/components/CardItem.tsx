import { View, Text, StyleSheet, Pressable } from "react-native";
import { Button } from "react-native-paper";
import { AddCardSVG } from "../Svgs";
import * as React from "react";
import { IShopData } from "./CardItemList";
interface CardItemProps {
  shopData: IShopData;
  handleForm: (open: boolean, shopData: IShopData) => void;
}

const CardItem = (props: CardItemProps) => {
  const { shopData, handleForm } = props;

  return (
    <View style={styles.container}>
      <View style={styles.cardItem}>
        <View style={styles.iconAndContent}>
          <View style={styles.cardIcon}>
            <Text> ikon</Text>
          </View>
          <View style={styles.cardContent}>
            <Text>
              {/* {.id} */}
              {shopData.name}
            </Text>
          </View>
        </View>
        <View style={styles.cardButton}>
          <Pressable
            onPress={() => {
              handleForm(true, shopData);
            }}
          >
            <AddCardSVG />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  cardItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    height: 69,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 14,
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 1,
  },
  iconAndContent: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  cardIcon: {
    marginLeft: 15,
    marginRight: 7,
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
  },
  cardContent: {
    marginLeft: 1,
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
  },
  cardButton: {
    margin: 20,
  },
});

export default CardItem;
