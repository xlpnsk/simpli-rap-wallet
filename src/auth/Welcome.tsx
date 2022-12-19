import React from "react";
import { Text, Pressable, Image, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

function WelcomeScreen<StackScreenProps>({ navigation }) {
  return (
    <View style={{ backgroundColor: "red" }}>
      <Text style={{ color: "white" }}>Welcome to hell</Text>
    </View>
    // <View>
    //   <LinearGradient
    //     colors={["#141e30", "#243b55"]}
    //     style={{ flex: 1, borderRadius: 20 }}
    //   >
    //     <View>
    //       <Text>Keep all you client conversations in one place</Text>
    //       <Text>
    //         At legal call we allow you to contact your clients through voice and
    //         text without giving out your phone number
    //       </Text>
    //       <View>
    //         <Pressable>
    //           <Text onPress={() => navigation.navigate("Sign In")}>
    //             Sign In
    //           </Text>
    //         </Pressable>
    //         <Pressable>
    //           <Text onPress={() => navigation.navigate("Sign Up")}>
    //             Sign Up
    //           </Text>
    //         </Pressable>
    //       </View>
    //     </View>
    //   </LinearGradient>
    // </View>
  );
}

export default WelcomeScreen;
