import * as React from "react";
import {
  Modal,
  Button,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import Animated, { EasingNode } from 'react-native-reanimated';
import { Portal } from "react-native-paper";
import {PanGestureHandler} from 'react-native-gesture-handler';

interface BottomSheetProps {
  text: string;
  buttonText: string;
  visible: boolean;
  onClose: () => void;
}

export default function BottomSheet(bottomSheetProps: BottomSheetProps) {
  const { text, buttonText, onClose, visible } = bottomSheetProps;
  const width = Dimensions.get("screen").width;
  const sheetHeight = Dimensions.get("screen").height * 0.5;
  const bottom = React.useRef(new Animated.Value(-sheetHeight)).current;
  const [open, setOpen] = React.useState(visible);


  const onGesture = (event: { nativeEvent: { translationY: number; }; }) => {
    if(event.nativeEvent.translationY > 0){
        bottom.setValue(-event.nativeEvent.translationY);
    }else{
        bottom.setValue(-event.nativeEvent.translationY);
    }
  };

  const onGestureEnd = (event) => {

    
};

  React.useEffect(() => {
    if (visible) {
      setOpen(visible);
      Animated.timing(bottom, {
        toValue: 0,
        duration: 500,
        easing:EasingNode.linear,
      }).start();
    } else {
      Animated.timing(bottom, {
        toValue: -sheetHeight,
        duration: 500,
        easing:EasingNode.linear,
      }).start(() => {
        setOpen(false);
      });
    }
  }, [visible]);

  if (!open) {
    return null;
  } else {
    return (
      <Portal>
        <Animated.View
          style={[
            styles.root,
            { height: sheetHeight, bottom: bottom },
            styles.common,
          ]}
        >
            <PanGestureHandler onGestureEvent={onGesture} onEnded={onGestureEnd}>
          <View style={[styles.header, styles.common]}>
          <View
            style={{
              width: 60,
              height:3,
              borderRadius:1.5,
              position: "absolute",
              top: 8,
              left: (width - 60) / 2,
              zIndex:10,
              backgroundColor:"#ccc",
            }}
          />
          
          </View>
          </PanGestureHandler>
          {/* <Button title={buttonText} onPress={onClose}/> */}
        </Animated.View>
      </Portal>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: "#fff",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      height: -3,
      width: 0,
    },
    shadowOpacity: 0.24,
    shadowRadius: 4,
  },
  header: {
    height: 33,
    backgroundColor: "#fff",
  },
  common: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.24,
    shadowRadius: 4,
    elevation: 3,
  },
});
