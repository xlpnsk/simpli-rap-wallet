import * as React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import Constants from "expo-constants";
import { Palette } from "../style/palette";
import { SettingsSVG } from "./Svgs";
import { CommonActions, useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    height: 55,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: Constants.statusBarHeight,
    backgroundColor: Palette.DarkBlue,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    alignSelf: "flex-start",
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  logo: {
    fontFamily: "Poppins-Regular",
    fontWeight: "900",
    color: Palette.LightBlue,
    fontSize: 16,
    lineHeight: 24,
  },
  settings: {
    marginLeft: "auto",
  },
});

export const Nav = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>simpli-RAP-wallet</Text>
      <Pressable style={styles.settings}>
        <SettingsSVG />
      </Pressable>
    </View>
  );
};

export const SettingsButton = () => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={styles.settings}
      onPress={() => navigation.dispatch(CommonActions.navigate("Account"))}
    >
      <SettingsSVG />
    </Pressable>
  );
};
