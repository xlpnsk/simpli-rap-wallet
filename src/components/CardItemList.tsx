import {View, Text,ScrollView } from 'react-native'
import React from "react"
import CardItem from './CardItem';


interface CardItemListProps{
    cardHandler : (card:boolean, shopData:string) => void;
};

const CardItemList = (props:CardItemListProps) =>{

    const {cardHandler} = props;
    const [data, setData] = React.useState([{id:"1",name:"Biedronka"},{id:"2",name:"Żabka"},{id:"3",name:"Rossmann"},{id:"4",name:"Stokrotka"},{id:"5",name:"Orlen"},{id:"6",name:"Hebe"}])

    return(

        <View>
            <ScrollView>
            {data.map((item) =>{
                return(
                    <CardItem key={item.id} id={item.id} data={item.name} handleForm={(openModal, shopID) => {cardHandler(openModal,shopID)}}/>
                );
            })}
            {/* <CardItem data={data}/> */}
            </ScrollView>
        </View>

    );

}

export default CardItemList;