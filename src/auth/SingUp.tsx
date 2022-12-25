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
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import FirebaseService from "../config/firebase";
import { SimpleInput } from "../components/SimpleInput";
import { Button } from "../components/Button";

function SignUpScreen<StackScreenProps>({ navigation }) {
  const [value, setValue] = React.useState({
    email: "",
    password: "",
    error: "",
  });

  async function signUp() {
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Email and password are mandatory.",
      });
      return;
    }

    try {
      await createUserWithEmailAndPassword(
        FirebaseService.auth,
        value.email,
        value.password
      );
      navigation.navigate("Sign In");
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      });
    }
  }

  return (
    <View>
      <View>
        <Text>Sign Up</Text>

        <View>
          <SimpleInput
            icon={
              <Icon style={styles.icon} name="email" size={18} color="white" />
            }
            placeholder="Email"
            value={value.email}
            onChangeText={(text) => setValue({ ...value, email: text })}
          />
          <SimpleInput
            icon={
              <Icon style={styles.icon} name="lock" size={18} color="white" />
            }
            placeholder="Password"
            onChangeText={(text) => setValue({ ...value, password: text })}
            secureTextEntry={true}
          />

          <Button onPress={signUp}>Sign Up</Button>
        </View>
        <Text>
          Have an account?{" "}
          <Text onPress={() => navigation.navigate("Sign In")}>Sign In</Text>
        </Text>
      </View>
    </View>
  );
}

export default SignUpScreen;

const styles = StyleSheet.create({
  icon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: "#fff",
    color: "#424242",
  },
});
