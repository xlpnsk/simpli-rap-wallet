import {View, Text} from 'react-native'
import React from "react"
import CardItem from './CardItem';

const CardItemList = () =>{

    const [data, setData] = React.useState([{id:"1",name:"test1"},{id:"2",name:"test2"}])

    return(

        <View>
            {data.map((item) =>{
                return(
                    <CardItem key={item.id} id={item.id} data={item.name}/>
                );
            })}
            {/* <CardItem data={data}/> */}
        </View>

    );

}

export default CardItemList;