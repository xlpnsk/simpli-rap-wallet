import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'

export default function CustomButton({onPress, text}) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  )
}

const styles= StyleSheet.create({
container:{
    backgroundColor: "#955F90",
    width:'95%',
    padding: 10,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 5,
    alignSelf: 'center'
},
text:{
    color: 'white',
    fontWeight: 'bold',

}
});