import { View,Text,StyleSheet,Pressable } from "react-native";
import { Button } from "react-native-paper";
import { AddCardSVG } from "../Svgs";


interface CardItemProps{
    id: string,
    data: string,
}

const CardItem = (props:CardItemProps) =>{

function testButtons(){

    console.log(props.id)

}



    return(

        <View style={styles.container}>
            <View style={styles.cardItem}>
                <View style={styles.cardIcon}>
                    <Text> ikon</Text>
                </View>
                <View style={styles.cardContent}>
                    <Text>
                        {props.id}
                        {props.data}
                     </Text>
                </View>
                <View style={styles.cardButton}>
                    <Pressable  onPress={() => {testButtons()}}>
                    <AddCardSVG />
                    </Pressable>
                    
                </View>
          
            </View>
           

        </View>

    );

};

const styles = StyleSheet.create({
    container:{
        width:"100%",
        
    },
    cardItem: {
        flexDirection:"row",
        justifyContent:"space-between",
        backgroundColor:"red",
        width:"90%",
        height:69,
        marginLeft:"auto",
        marginRight:"auto",
        marginTop:14,
        borderRadius:20,
    },
    cardIcon:{
        backgroundColor:"blue",
        margin:15,
    },
    cardContent:{
        margin:20
    },
    cardButton:{
        backgroundColor:"aqua",
        margin:20,

    }

});


export default CardItem;