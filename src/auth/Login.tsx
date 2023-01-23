import * as React from "react";
import { Alert, StyleSheet, View, Text } from "react-native";
import { supabase } from "../supabase";
import { Input } from "react-native-elements";
import { Button } from "../components/Button";
import { Palette } from "../../style/palette";

const Login: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <View>
      <View style={[styles.verticallySpaced]}>
        <Text style={[styles.text]}>Email</Text></View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input 
          style={[styles.input]}
          leftIcon={{ type: "font-awesome", name: "envelope", color: "white" }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={"none"}
        />
      </View>
      <View style={[styles.verticallySpaced]}>
        <Text style={[styles.text]}>Password</Text></View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          style={[styles.input]}
          leftIcon={{ type: "font-awesome", name: "lock", color: "white"}}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={"none"}
        />
      </View>
      <View style={[styles.verticallySpaced,styles.button ]}>
        <Button disabled={loading} onPress={() => signInWithEmail()}>
          Sign in
        </Button>
      </View>
      <View style={[styles.verticallySpaced,styles.button ]}>
        <Button disabled={loading} onPress={() => signUpWithEmail()}>
          Sign up
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop:5,
    marginLeft:5,
    marginRight:5,
    borderRadius: 25,
    backgroundColor: Palette.DarkBlue,
    
  },
  button:{
    marginLeft:5,
    marginRight:5,
  },
  input:{
    color: "#f8f8ff",
    textDecorationColor: "#f8f8ff",
    tintColor: "#f8f8ff",
    baseColor: "white",
    backgroundColor: Palette.DarkBlue,
    borderRadius: 15,
    padding: 10,
  },
  text:{
    backgroundColor: Palette.Fuchsia,
    borderRadius: 20,
    padding: 10,
    paddingBottom:20,
    color: "white",
    marginRight: 220,
    marginLeft:20,
    marginBottom: -25,
    textAlign: "center",
  },
});

export default Login;
