import React, { useState } from "react";
import { Modal, Text, Pressable, View, TextInput } from "react-native";
import Feather from "react-native-vector-icons/Feather";

function CreateClient() {
  const [modalVisible, setModalVisible] = useState(false);

  const [value, setValue] = useState({
    phone: "",
    name: "",
    error: "",
  });
  return (
    <View>
    <Feather.Button name="user-plus" onPress={() => setModalVisible(true)}/>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            onPress={() => setModalVisible(false)}
            style={{ color: "white" }}
          >
            Close
          </Text>
          <View>
            <Text style={{ color: "white" }}>Create a New Client</Text>

            <View>
              <View>
                <View>
                  <TextInput
                    placeholder="Name"
                    value={value.name}
                    style={{ backgroundColor: "white" }}
                    onChangeText={(text) => setValue({ ...value, name: text })}
                  />
                </View>

                <View>
                  <TextInput
                    placeholder="phone"
                    style={{ backgroundColor: "white" }}
                    onChangeText={(text) => setValue({ ...value, phone: text })}
                  />
                </View>
              </View>
              <Pressable>
                <Text style={{ color: "white" }}>Create Client</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default CreateClient;