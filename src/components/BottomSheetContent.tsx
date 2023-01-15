import React from 'react';
import {Animated, Dimensions, Modal, StyleSheet, TouchableWithoutFeedback, View,Text} from 'react-native';

import GestureRecognizer from 'react-native-swipe-gestures';

interface BottomSheetContentProps {
    visible: boolean;
    onClose : (p:boolean) => void;
    children : React.ReactNode;
}

const BottomSheetContent = (props:BottomSheetContentProps) => {

    const {visible, onClose, children} = props;
    const height = React.useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
    
    function onModalShow(){

        Animated.timing(
            height,
            {
                toValue: (Dimensions.get('window').height)/2,
                duration:500,
                useNativeDriver: false
            }
          ).start();
        
    }

    function swipeUp(){
          Animated.timing(
            height,
            {
                toValue: (Dimensions.get('window').height)*0.90,
                duration:500,
                useNativeDriver: false
            }
          ).start();
    }

    function resetModalHeight(){
        Animated.timing(
            height,
            {
                toValue: 0,
                duration:500,
                useNativeDriver: false
            }
          ).start();
          setTimeout(() => {onClose(false)},550);
    }

    
    return(

        <Modal visible={visible} onShow={() =>{onModalShow()}} transparent={true} style={{zIndex:-11}}>
            <GestureRecognizer style={styles.modal} onSwipeUp={()=>{swipeUp()}} onSwipeDown={() => {
                resetModalHeight()
                
                }}>
                <TouchableWithoutFeedback onPress={() => {
                    resetModalHeight()
                    //onClose()
                    }}>
                    <View style={styles.bottomSheet}>
                        <View  style={styles.dummy}></View>
                        <TouchableWithoutFeedback>
                            <Animated.View style={[styles.bottomSheetContent, {height:height}]}> 
                                {/* <View style={styles.handlerWrapper}>
                                    <View style={styles.handler}></View>
                                </View> */}
                                <View>
                                    <Text style={styles.upperText}> Select your type card </Text>
                                </View>
                                {children ? <View style={styles.children}>{children}</View> : null}
                                
                            
                            </Animated.View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </GestureRecognizer> 
        </Modal>
    )
};

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        position:"absolute",
        bottom:0,
    },
    bottomSheet: {
       
    },
    dummy: {

    },
    bottomSheetContent: {
        
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: "white",
    },
    handlerWrapper:{
        alignItems: "center",
    },
    handler:{
        width:50,
        height:5,
        borderRadius:15,
        backgroundColor:"black",
    },
    upperText:{
        paddingTop:16,
        textAlign:"center",
        fontSize:14,
    },
    children:{
        paddingBottom:40
    },

});

export default BottomSheetContent;