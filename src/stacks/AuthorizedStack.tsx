import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";

import { Palette } from "../../style/palette";
import Home from "../home";
import { SettingsButton } from "../Nav";
import Map from "../../src/map";
import Settings from "../auth/Settings";

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
  Map: { userId: string };
  Settings: undefined;
};

export const AuthorizedStack = () => {
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
          name="Settings"
          component={Settings}
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
