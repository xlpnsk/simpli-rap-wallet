import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  Animated,
  Alert,
} from "react-native";
import * as React from "react";
import { SimpleInput } from "./SimpleInput";
import { Palette } from "../../style/palette";
import { AparatIcon, ArrowIcon } from "../Svgs";
import { BarCodeScanner } from "expo-barcode-scanner";
import { IShopData } from "../home/BottomShopList/CardItemList";
import { supabase } from "../supabase";
import { SessionContext } from "../root";

interface AddCardModalProps {
  text: string;
  buttonText: string;
  onClose: () => void;
  visible: boolean;
  shopData?: IShopData;
}

const AddCardModal = (props: AddCardModalProps) => {
  const { text, buttonText, onClose, visible, shopData } = props;

  const [shopName, setShopName] = React.useState(shopData?.name || "");
  const [cardNumber, setCardNumber] = React.useState("");
  const [shopURL, setShopURL] = React.useState(shopData?.leaflet_url || "");
  const [isValidShopName, setIsValidShopName] = React.useState(false);
  const [isValidCardNumber, setIsValidCardNumber] = React.useState(false);
  const [isValidShopURL, setIsValidShopURL] = React.useState(false);
  const [hasPermission, setHasPermission] = React.useState(false);
  const [scanned, setScanned] = React.useState(false);
  const [scannerText, setScannerText] = React.useState("Not yet scanned");
  const [scannerOpen, setScannerOpen] = React.useState(false);
  const [codeType, setCodeType] = React.useState("");

  const session = React.useContext(SessionContext);

  React.useEffect(() => {
    shopNameChange(shopData?.name || "");
    shopURLChange(shopData?.leaflet_url || "");
  }, [shopData]);

  const shopNameChange = (val: string) => {
    setShopName(val);
    setIsValidShopName(val.trim().length > 0);
  };

  const cardNumberChange = (val: string) => {
    setCardNumber(val);
    setIsValidCardNumber(val.trim().length > 0);
  };
  const shopURLChange = (val: string) => {
    setShopURL(val);
    setIsValidShopURL(val.trim().length > 0);
  };

  const clearData = () => {
    setShopName("");
    setCardNumber("");
    setShopURL("");
    setCodeType("");
    setIsValidCardNumber(false);
    setIsValidShopName(false);
    setIsValidShopURL(false);
    onClose();
  };

  const handleForm = async () => {
    console.log(codeType, cardNumber);
    if (isValidShopName && isValidCardNumber && isValidShopURL === true) {
      if (!shopData) {
        let { data: dbShop, error } = await supabase
          .from("shops")
          .select("id")
          .eq("name", shopName);
        console.log(dbShop);

        if (!error && dbShop.length > 0) {
          //shop does exist in db
          const { data: newWalletRecordData, error: newWalletRecordError } =
            await supabase.from("wallets").insert([
              {
                card_code: cardNumber,
                code_type: codeType,
                user_id: session.user.id,
                shop_id: dbShop[0]?.id,
              },
            ]);
          if (newWalletRecordError) {
            Alert.alert(newWalletRecordError.message);
            return;
          }
          Alert.alert("Card successfully added");
        } else if (!error && !dbShop.at(0)) {
          //shop does not exist in db
          const { data, error: newShopDataError } = await supabase
            .from("shops")
            .insert([
              {
                name: shopName,
                leaflet_url: shopURL,
              },
            ]);
          if (newShopDataError) {
            Alert.alert(newShopDataError.message);
            return;
          }
          const { data: newShopData, error: newShopError } = await supabase
            .from("shops")
            .select("id")
            .eq("name", shopName);
          if (newShopError) {
            Alert.alert(newShopDataError.message);
            return;
          }
          const { data: newWalletRecordData, error: newWalletRecordError } =
            await supabase.from("wallets").insert([
              {
                card_code: cardNumber,
                code_type: codeType,
                user_id: session.user.id,
                shop_id: newShopData.length > 0 && newShopData.at(0).id,
              },
            ]);
          if (newWalletRecordError) {
            Alert.alert(newWalletRecordError.message);
            return;
          }
          Alert.alert("Card successfully added");
          clearData();
        } else {
          Alert.alert(error.message);
        }
      } else {
        const { data: newWalletRecordData, error: newWalletRecordError } =
          await supabase.from("wallets").insert([
            {
              card_code: cardNumber,
              code_type: codeType,
              user_id: session.user.id,
              shop_id: shopData.id,
            },
          ]);
        if (newWalletRecordError) {
          Alert.alert(newWalletRecordError.message);
          return;
        }
        Alert.alert("Card successfully added");
        clearData();
      }
    } else {
      console.log(isValidShopName);
      console.log(isValidCardNumber);
      console.log(isValidShopURL);
      console.log("Bad data");
    }
  };

  const askForCameraPermission = () => {
    setScannerOpen(true);
    console.log("perm");
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannerText(data);
    cardNumberChange(data);
    const types = BarCodeScanner.Constants.BarCodeType;
    console.log(Object.entries(types), { type: type });

    for (const [key, value] of Object.entries(types)) {
      if (value === type) {
        setCodeType(key);
        break;
      }
    }
  };

  if (scannerOpen === false) {
    return (
      <Modal visible={visible} transparent={true}>
        <View style={styles.modal}>
          <View style={styles.modalContentWrapper}>
            <View style={styles.modalContent}>
              <View style={styles.header}>
                <View style={styles.arrowIcon}>
                  <Pressable
                    onPress={() => {
                      clearData();
                    }}
                  >
                    <ArrowIcon />
                  </Pressable>
                </View>

                <Text style={styles.headerText}>{text}</Text>
              </View>

              <View style={styles.inputs}>
                <SimpleInput
                  onChangeText={(val) => {
                    shopNameChange(val);
                  }}
                  placeholder={"Shop name"}
                  value={shopName}
                  style={styles.input}
                  inputTitle={"Shop name"}
                  editable={!!!shopData}
                  selectTextOnFocus={!!!shopData}
                />
                {isValidShopName ? null : (
                  <Animated.View>
                    <Text style={styles.errorText}>
                      Shop name cannot be empty!
                    </Text>
                  </Animated.View>
                )}
                <View style={styles.middleInput}>
                  <SimpleInput
                    onChangeText={(val) => {
                      cardNumberChange(val);
                    }}
                    placeholder={"156829..."}
                    value={cardNumber}
                    style={styles.input}
                    inputTitle={"Card number"}
                  />
                  <View style={styles.aparatCircle}>
                    <Pressable
                      style={styles.aparatIcon}
                      onPress={() => {
                        askForCameraPermission();
                      }}
                    >
                      <AparatIcon />
                    </Pressable>
                  </View>
                </View>
                {isValidCardNumber ? null : (
                  <Animated.View>
                    <Text style={styles.errorText}>
                      Card number cannot be empty!
                    </Text>
                  </Animated.View>
                )}
                <SimpleInput
                  onChangeText={(val) => {
                    shopURLChange(val);
                  }}
                  placeholder={"https://"}
                  value={shopURL}
                  style={styles.input}
                  inputTitle={"Shop URL"}
                  keyboardType={"url"}
                  editable={!!!shopData}
                  selectTextOnFocus={!!!shopData}
                />
                {isValidShopURL ? null : (
                  <Animated.View>
                    <Text style={styles.errorText}>
                      Shop URL cannot be empty!
                    </Text>
                  </Animated.View>
                )}
              </View>
              <Pressable
                onPress={() => {
                  handleForm();
                }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>{buttonText}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
  if (scannerOpen === true) {
    return (
      <Modal>
        <View style={styles.scanerContainer}>
          <View style={styles.barcodebox}>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={{ height: 400, width: 400 }}
            />
          </View>
          <Text style={styles.scannerText}>{scannerText}</Text>
          <Pressable
            onPress={() => {
              setScanned(false);
              setScannerOpen(false);
              setScannerText("Not yet scanned");
            }}
          >
            <Text style={styles.scannerButton}> Close scanner</Text>
          </Pressable>

          {scanned && (
            <Pressable
              onPress={() => {
                setScanned(false);
                setScannerText(scannerText);
              }}
            >
              <Text style={styles.scannerButton}> Scan again</Text>
            </Pressable>
          )}
        </View>
      </Modal>
    );
  }
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalContentWrapper: {
    height: 500,
    marginVertical: "30%",
  },
  modalContent: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "white",
    marginHorizontal: 16,
    padding: 16,
  },
  header: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 50,
  },
  headerText: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "600",
  },
  inputs: {
    height: 330,
    width: "95%",
  },
  input: {
    borderRadius: 40,
    marginTop: 15,
    height: 70,
    backgroundColor: "rgba(43,69,112,0.85)",
    color: Palette.LightBlue,
    fontSize: 15,
    paddingLeft: 15,
  },
  middleInput: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  aparatCircle: {
    position: "absolute",
    top: 25,
    right: 15,
    backgroundColor: Palette.Fuchsia,
    borderRadius: 25,
    height: 50,
    width: 50,
  },
  aparatIcon: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: 32,
    borderRadius: 25,
    backgroundColor: Palette.Fuchsia,
    width: "85%",
    height: 50,
  },
  buttonText: {
    color: Palette.LightBlue,
    fontSize: 20,
    fontWeight: "500",
    paddingHorizontal: 10,
  },
  arrowIcon: {
    position: "absolute",
    left: 10,
    top: 10,
  },
  errorText: {
    color: "red",
    fontSize: 11,
  },
  scanerContainer: {
    height: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  barcodebox: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 30,
  },
  scannerText: {
    fontSize: 16,
    margin: 20,
  },
  scannerButton: {
    color: Palette.LightBlue,
    fontSize: 18,
    textAlign: "center",
    marginVertical: 10,
    borderRadius: 5,
    width: 150,
    height: 30,
    backgroundColor: Palette.Fuchsia,
  },
});

export default AddCardModal;
