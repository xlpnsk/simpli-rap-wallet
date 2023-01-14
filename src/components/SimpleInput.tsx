import * as React from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  ViewStyle,
  StyleProp,
} from "react-native";
import { Palette } from "../../style/palette";

const styles = StyleSheet.create({
  inputWrapper: {
    backgroundColor: Palette.DarkBlue,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  placeholder: {
    borderRadius: 10,
    backgroundColor: Palette.Fuchsia,
    paddingHorizontal: 5,
    paddingVertical: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: -8,
    left: 20,
  },
  placeholderText: {
    color: Palette.LightBlue,
    fontFamily: "Poppins-Regular",
    fontWeight: "600",
    lineHeight: 16,
    textAlignVertical: "center",
    textAlign: "center",
  },
  inputText: {
    width: "100%",
    color: Palette.LightBlue,
    fontFamily: "Poppins-Regular",
    fontWeight: "600",
    fontSize: 15,
  },
});

interface ISimpleInput {
  value?: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  icon?: React.ReactNode;
  secureTextEntry?: boolean;
  style?: StyleProp<ViewStyle>;
  inputTitle?: string;
}
export const SimpleInput: React.FC<ISimpleInput> = ({
  value,
  placeholder,
  onChangeText,
  icon,
  secureTextEntry,
  style,
  inputTitle,
}) => {
  return (
    <View style={[styles.inputWrapper, style]}>
      {icon}
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>{inputTitle}</Text>
      </View>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        style={styles.inputText}
        placeholderTextColor={Palette.LightBlue}
      />
    </View>
  );
};