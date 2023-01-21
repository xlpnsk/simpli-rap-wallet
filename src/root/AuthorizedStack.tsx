import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import * as React from "react";
import { Palette } from "../../style/palette";
import Home from "../home";
import { SettingsButton } from "../Nav";
import Map from "../../src/map";
import Account from "../auth/Account";

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

const Stack = createNativeStackNavigator();

export type RootAuthorizedStackParamList = {
  Home: undefined;
  Map: { shopName: string };
  Account: undefined;
};

export const AuthorizedStack: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerRight: () => <SettingsButton />,
            headerStyle: styles.header,
            headerTintColor: Palette.LightBlue,
            headerTitleStyle: styles.title,
            title: "simpli-RAP-wallet",
          }}
        />
        <Stack.Screen
          name="Map"
          component={Map}
          options={{
            headerStyle: styles.header,
            headerTintColor: Palette.LightBlue,
            headerTitleStyle: styles.title,
          }}
        />
        <Stack.Screen
          name="Account"
          component={Account}
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
