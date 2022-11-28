import React, { useState } from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions} from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
const SingUp = () => {

    const {UserName, setUserName}=useState('');
    const {Password, setPassword}=useState('');
    const {Email, setEmail}=useState('');

    const onSingUpPressed = ()=> {console.warn("Rejestracja")};

    const {height}= useWindowDimensions();
    const newLocal = (styles.logo, { height: height * 0.3});
    return (
    <View>
      <Text>Rejestracja</Text>
      <Image
          style={newLocal}
          resizeMode="contain"
          source={{uri:'https://img.favpng.com/13/11/14/computer-icons-login-symbol-user-png-favpng-356Ya0BL2irfju5aWdhwnL1PH.jpg'}}
      />
      <CustomInput placeholder="Nazwa Użytkownika" value={UserName} setValue={setUserName} secureTextEntry={undefined}/>
      <CustomInput placeholder="Adres email" value={Email} setValue={setEmail} secureTextEntry={undefined}/>
      <CustomInput placeholder="Hasło" value={Password} setValue={setPassword} secureTextEntry={true}/>
      <CustomButton text="Zarejestruj" onPress={onSingUpPressed }/>
    </View>
  );
};
 

const styles =StyleSheet.create(
    {
        root:{
            alignItems: 'center',
            pading: 20,

        },
        logo:{
            width: '70%', 
            maxWidth: 300,
            maxHeight: 200, 


        },
    }
)
export default SingUp;