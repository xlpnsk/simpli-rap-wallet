import React from "react";
import {
  Animated,
  Dimensions,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
} from "react-native";

import GestureRecognizer from "react-native-swipe-gestures";

interface BottomSheetContentProps {
  visible: boolean;
  onClose: (p: boolean) => void;
  children: React.ReactNode;
}

const BottomSheetContent = (props: BottomSheetContentProps) => {
  const { visible, onClose, children } = props;
  const height = React.useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  React.useEffect(() => {
    console.log(visible);

    if (visible) onModalShow();
    else resetModalHeight();
  }, [visible]);

  function onModalShow() {
    Animated.timing(height, {
      toValue: Dimensions.get("window").height / 2,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }

  function swipeUp() {
    Animated.timing(height, {
      toValue: Dimensions.get("window").height * 0.9,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }

  function resetModalHeight() {
    Animated.timing(height, {
      toValue: 0,
      duration: 400,
      useNativeDriver: false,
    }).start();
    onClose(false);
  }

  return (
    <TouchableWithoutFeedback
      style={{
        height: "100%",
        width: "100%",
        // position: "absolute",
        backgroundColor: "blue",
      }}
      onPress={() => {
        resetModalHeight();
      }}
    >
      <Animated.View
        style={{
          height: height,
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
          <TouchableWithoutFeedback
            onPress={() => {
              resetModalHeight();
              //onClose()
            }}
          >
            <Animated.View
              style={[styles.bottomSheetContent, { height: height }]}
            >
              <View>
                <Text style={styles.upperText}> Select your type card </Text>
              </View>
              {children ? (
                <View style={styles.children}>{children}</View>
              ) : null}
            </Animated.View>
          </TouchableWithoutFeedback>
        </GestureRecognizer>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    position: "absolute",
    bottom: 0,
  },
  bottomSheetContent: {
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
