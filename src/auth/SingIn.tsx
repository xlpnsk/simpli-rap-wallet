import React from "react";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  Text,
  View,
} from "react-native";
//import Icon from 'react-native-vector-icons/FontAwesome';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import FirebaseService from "../config/firebase";
import { SimpleInput } from "../components/SimpleInput";
import { Button } from "../components/Button";
import { Palette } from "../../style/palette";

function SignInScreen<StackScreenProps>({ navigation }) {
  const [value, setValue] = React.useState({
    email: "",
    password: "",
    error: "",
  });

  async function signIn() {
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Email and password are mandatory.",
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(
        FirebaseService.auth,
        value.email,
        value.password
      );
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      });
    }
  }

  return (
    <View style={styles.formContainer}>
      <Text style={[styles.header, styles.marginBottom]}>Sign In</Text>
      <View style={styles.inputContainer}>
        <SimpleInput
          icon={
            <Icon style={styles.icon} name="email" size={18} color="white" />
          }
          placeholder="Email"
          value={value.email}
          style={styles.marginBottom}
          onChangeText={(text) => setValue({ ...value, email: text })}
        />
        <SimpleInput
          icon={
            <Icon style={styles.icon} name="lock" size={18} color="white" />
          }
          placeholder="Password"
          style={styles.marginBottom}
          onChangeText={(text) => setValue({ ...value, password: text })}
          secureTextEntry={true}
        />
        <Button onPress={signIn}>Sign In</Button>
      </View>
      <View>
        <Text>Don't Have an account?</Text>
        <Button
          style={{ backgroundColor: Palette.DarkBlue }}
          textStyle={{ color: Palette.LightBlue }}
          onPress={() => null}
        >
          Sign Up
        </Button>
      </View>
    </View>
  );
}

export default SignInScreen;

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontFamily: "Poppins-Regular",
    fontWeight: "700",
    fontSize: 26,
    letterSpacing: 0.06,
    textAlign: "center",
  },
  icon: {
    padding: 10,
  },
  marginBottom: {
    marginBottom: 15,
  },
  inputContainer: {},
});
