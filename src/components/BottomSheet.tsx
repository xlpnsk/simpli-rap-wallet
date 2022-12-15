import React from 'react';
import {Modal, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';

import GestureRecognizer from 'react-native-swipe-gestures';

interface BottomSheetProps {
    visible: boolean;
    onClose : () => void;
    children : React.ReactNode;
}

const BottomSheet = (props:BottomSheetProps) => {

    const {visible, onClose,children} = props;
    console.log(children);
    return(

        <Modal visible={visible} animationType="slide" transparent={true}>
            <GestureRecognizer style={styles.modal} onSwipeDown={() => {onClose()}}>
                <TouchableWithoutFeedback onPress={() => {onClose()}}>
                    <View style={styles.bottomSheet}>
                        <View  style={styles.dummy}></View>
                        <TouchableWithoutFeedback>
                            <View style={styles.bottomSheetContent}>
                                <View style={styles.handlerWrapper}>
                                    <View style={styles.handler}></View>
                                </View>
                                {children ? <View style={styles.children}>{children}</View> : null}
                                
                            
                            </View>
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

    },
    bottomSheet: {
        flex:1,
    },
    dummy: {
        flex:1,
    },
    bottomSheetContent: {
        paddingVertical: 16,
        paddingHorizontal: 32,
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
    children:{},

});

export default BottomSheet;