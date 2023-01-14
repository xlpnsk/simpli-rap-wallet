import {View,Text,StyleSheet,Modal,Button,TextInput, Pressable} from "react-native"
import * as React from "react";
import { SimpleInput } from "./SimpleInput";
import { Palette } from "../../style/palette";
import { AparatIcon, ArrowIcon } from "../Svgs";



interface AddCardModalProps {
    text: string;
    buttonText:string;
    onClose: () => void;
    visible:boolean;
    shopData:string;
}

const AddCardModal = (props:AddCardModalProps) => {

    const {text, buttonText, onClose,visible,shopData} = props;
    const [shopName, setShopName] = React.useState('');
    const [cardNumber, setCardNumber] = React.useState('');
    const [shopURL, setShopURL] = React.useState('');

    function test(){

      console.log(shopName,cardNumber,shopURL);
    }

    function testicon(){
        console.log("icon click");
        console.log(shopData);
    }
return(

    <Modal visible={visible} transparent={true} >
        <View style={styles.modal}>
            <View style={styles.modalContentWrapper}>
                <View style={styles.modalContent}>
                    <View style={styles.header}>
                    <View style={styles.arrowIcon}>
                        <Pressable onPress={()=>{onClose()}}>
                             <ArrowIcon/>
                             </Pressable>
                   
                    </View>
                   
                    <Text style={styles.headerText}>
                        {text}
                    </Text>
                    </View>
                    
                    
                    <View style={styles.inputs}>
                    <SimpleInput onChangeText={setShopName} placeholder={"Shop name"} value={shopName} style={styles.input} inputTitle={"Shop name"}/>
                    <View style={styles.middleInput}>
                    <SimpleInput onChangeText={setCardNumber} placeholder={"156829..."} value={cardNumber} style={styles.input} inputTitle={"Card number"}/>
                    <View style={styles.aparatCircle}>
                    <Pressable style={styles.aparatIcon} onPress={() => {testicon()}}>
                        <AparatIcon />
                    </Pressable>
                    </View>

                    </View>
                    
                    <SimpleInput onChangeText={setShopURL} placeholder={"https://"} value={shopURL} style={styles.input} inputTitle={"Shop URL"}/>
                    
                    {/* <Text style={styles.inputLabel}>Shop name</Text>
                    <TextInput style={styles.input}
                    onChangeText={setShopName}
                    value={shopName}
                    placeholder={"Shop name"}
                    />

                    <Text style={styles.inputLabel}>Card number</Text>
                    <TextInput style={styles.input}
                    onChangeText={setCardNumber}
                    value={cardNumber}
                    placeholder={"1568429..."}
                    />

                    <Text style={styles.inputLabel}>Shop URL</Text>
                    <TextInput style={styles.input}
                    onChangeText={setShopURL}
                    value={shopURL}
                    placeholder={"https://..."}
                    /> */}
                    </View>
                    <Pressable onPress={() => {console.log("jakies dane")}} style={styles.button}>
                        <Text style={styles.buttonText}>
                            {buttonText}
                        </Text>
                    </Pressable>
             
                   
                    
                </View>
            </View>
        </View>
    </Modal>

);

};

const styles = StyleSheet.create({
    modal:{
        flex:1,
        backgroundColor:"rgba(0,0,0,0.3)"
    },
    modalContentWrapper:{

       height:500,
       marginVertical:"30%"
    },
    modalContent:{
        flex:1,
        flexDirection:"column",
        alignItems:"center",
        borderRadius: 30,
        backgroundColor:"white",
        marginHorizontal:16,
        padding:16,

    },
    header:{
        width:"100%",
        flex:1,
        flexDirection:"row",
        justifyContent:"center",
        marginBottom:30,

    },
    headerText:{
       
        textAlign:"center",
        fontSize:22,
        fontWeight:"600",
    },
    inputs:{
        height:330,
        width:"95%"
    },
    input:{
        borderRadius:40,
        marginBottom:35,
        height:70,
        backgroundColor:"rgba(43,69,112,0.85)",
        color:Palette.LightBlue,
        fontSize:15,
        paddingLeft:15,
    },
    middleInput:{
        flexDirection:"row",
        justifyContent:"space-between",
    },
    aparatCircle:{
        position:"absolute",
        top:10,
        right:15,
        backgroundColor:Palette.Fuchsia,
        borderRadius:25,
        height:50,
        width:50,

    },
    aparatIcon:{
        flex:1,
       alignContent:"center",
        justifyContent:"center",
        alignItems:"center",
    },
    button:{

        alignItems: 'center',
        justifyContent: 'center',
        
        paddingHorizontal: 32,
        borderRadius: 25,
        backgroundColor:Palette.Fuchsia,
        width:"85%",
        height:50
    },
    buttonText:{

        color:Palette.LightBlue,
        fontSize:20,
        fontWeight:"500",
        paddingHorizontal:10
    },
    arrowIcon:{
        position:"absolute",
        left:10,
        top:10
    },
})

export default AddCardModal;