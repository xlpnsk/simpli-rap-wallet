import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../auth/Welcome";
import Login from "../auth/Login";
import { Palette } from "../../style/palette";
import { StyleSheet } from "react-native";

const Stack = createNativeStackNavigator();

export type RootUnauthorizedStackParamList = {
  Welcome: undefined;
  Login: undefined;
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Palette.DarkBlue,
    alignItems: "center",
    overflow: "hidden",
  },
  title: {
    fontFamily: "Poppins-Regular",
    fontWeight: "900",
    color: Palette.LightBlue,
    fontSize: 16,
    lineHeight: 24,
  },
});

export const UnauthorizedStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            headerStyle: styles.header,
            headerTintColor: Palette.LightBlue,
            headerTitleStyle: styles.title,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerStyle: styles.header,
            headerTintColor: Palette.LightBlue,
            headerTitleStyle: styles.title,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
