import { View,Text } from "react-native";


interface CardItemProps{
    data:any
}

const CardItem = (props:CardItemProps) =>{

console.log(props)

    return(

        <View>
            <Text>
           {props.data}
            </Text>

        </View>

    );

}


export default CardItem;