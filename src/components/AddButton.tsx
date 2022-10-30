import React from "react";
import { Pressable, StyleSheet, PressableProps } from "react-native";
import { Palette } from "../../style/palette";
import { PlusSVG } from "../Svgs";

interface IAddButton {
  onPress: PressableProps["onPress"];
}

export const AddButton: React.FC<IAddButton> = ({ onPress }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <PlusSVG style={styles.svg} />
    </Pressable>
  );
};
const styles = StyleSheet.create({
  button: {
    width: 83,
    height: 45,
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 20,
    backgroundColor: Palette.Fuchsia,
    position: "absolute",
    bottom: 22,
    right: 17,
  },
  svg: {
    alignSelf: "center",
  },
});
