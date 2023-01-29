import React from "react";
import {
  Animated,
  Dimensions,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
  ScrollView,
} from "react-native";
import { Button } from "../../components/Button";

import GestureRecognizer from "react-native-swipe-gestures";

interface BottomSheetContentProps {
  visible: boolean;
  onClose: (p: boolean) => void;
  children: React.ReactNode;
}

const height = 0.9 * Dimensions.get("window").height;

const BottomSheetContent = (props: BottomSheetContentProps) => {
  const { visible, onClose, children } = props;
  const y = React.useRef(
    new Animated.Value(0.9 * Dimensions.get("window").height)
  ).current;

  React.useEffect(() => {
    console.log(visible);
    if (visible) onModalShow();
    else resetModalHeight();
  }, [visible]);

  React.useEffect(() => {
    console.log(y);
  });

  function onModalShow() {
    Animated.timing(y, {
      toValue: height / 2,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  function swipeUp() {
    Animated.timing(y, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }

  function resetModalHeight() {
    Animated.timing(y, {
      toValue: height,
      duration: 400,
      useNativeDriver: true,
    }).start();
    onClose(false);
  }

  return (
    <Animated.View
      style={{
        height: height,
        position: "absolute",
        bottom: 0,
        overflow: "hidden",
        transform: [{ translateY: y }, { perspective: 1000 }],
      }}
    >
      <GestureRecognizer
        style={styles.modal}
        onSwipeUp={() => {
          swipeUp();
        }}
        onSwipeDown={() => {
          resetModalHeight();
        }}
      >
        <ScrollView style={[styles.bottomSheetContent]}>
          <View>
            <Text style={styles.upperText}> Select your type card </Text>
          </View>
          {children && <View style={styles.children}>{children}</View>}
          <Button style={styles.button} onPress={resetModalHeight}>
            Hide
          </Button>
        </ScrollView>
      </GestureRecognizer>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "90%",
  },
  modal: {
    flex: 1,
  },
  bottomSheetContent: {
    display: "flex",
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  handlerWrapper: {
    alignItems: "center",
  },
  handler: {
    width: 50,
    height: 5,
    borderRadius: 15,
    backgroundColor: "black",
  },
  upperText: {
    paddingTop: 16,
    textAlign: "center",
    fontSize: 14,
  },
  children: {
    paddingBottom: 40,
  },
});

export default BottomSheetContent;
