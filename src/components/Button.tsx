import * as React from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";
import { Palette } from "../../style/palette";

const styles = StyleSheet.create({
  button: {
    backgroundColor: Palette.Fuchsia,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 11,
  },
  buttonText: {
    color: "#FFF2F2",
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    fontWeight: "800",
    lineHeight: 21.7,
    letterSpacing: 0.06,
  },
});

interface IButton {
  onPress: (event: GestureResponderEvent) => void;
  children?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
}

export const Button: React.FC<IButton> = ({
  onPress,
  children,
  style,
  textStyle,
  disabled,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        style,
        disabled && { backgroundColor: Palette.Black },
      ]}
      disabled={disabled}
    >
      <Text style={[styles.buttonText, textStyle]}>{children}</Text>
    </Pressable>
  );
};
