import React from "react";
import { Text, Pressable, Image, View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "../components/Button";

const styles = StyleSheet.create({
  entranceText: {
    color: "#ffffff",
    fontFamily: "Poppins-Regular",
    fontSize: 26,
    fontWeight: "600",
    textAlign: "center",
  },
  space: {
    marginBottom: 20,
  },
  icon: {
    width: 220,
    height: 220,
    alignSelf: "center",
  },
});

function WelcomeScreen<StackScreenProps>({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={["#2B4570", "#06090F"]}
        style={{
          flex: 1,
          alignItems: "stretch",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <Image
          source={require("../../assets/welcome.png")}
          style={styles.icon}
        />
        <Text style={[styles.entranceText, styles.space]}>
          Welcome to {"\n"} Simpli RAP Wallet
        </Text>
        <Button
          onPress={() => navigation.navigate("SignIn")}
          style={styles.space}
        >
          Sign In
        </Button>
        <Button
          onPress={() => navigation.navigate("SignUp")}
          style={styles.space}
        >
          Sign Up
        </Button>
      </LinearGradient>
    </View>
  );
}

export default WelcomeScreen;
