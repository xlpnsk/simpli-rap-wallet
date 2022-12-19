import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../auth/SingIn";
import WelcomeScreen from "../auth/Welcome";

const Stack = createNativeStackNavigator();

export type RootUnauthorizedStackParamList = {
  Welcome: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

export const UnauthorizedStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignInScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
