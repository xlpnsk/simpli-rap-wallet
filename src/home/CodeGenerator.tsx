import * as React from "react";
import { Text } from "react-native";
import Barcode, { Format } from "@kichiyaki/react-native-barcode-generator";
import QRCode from "react-native-qrcode-svg";

const BARCODE_TYPES = [
  "CODE39",
  "CODE128",
  "CODE128A",
  "CODE128B",
  "CODE128C",
  "EAN13",
  "EAN8",
  "EAN5",
  "EAN2",
  "UPC",
  "UPCE",
  "ITF14",
  "ITF",
  "MSI",
  "MSI10",
  "MSI11",
  "MSI1010",
  "MSI1110",
  "pharmacode",
  "codabar",
];

type CodeType = Format | "qr";

interface ICodeGenerator {
  type: CodeType;
  data: string;
}

export const CodeGenerator: React.FC<ICodeGenerator> = ({ type, data }) => {
  if (type === "qr") return <QRCode value={data} />;
  const barType = BARCODE_TYPES.find(
    (t) => t === type.toUpperCase() || t === type.toLowerCase()
  );
  if (barType)
    return (
      <Barcode
        value={data}
        format={barType as Format}
        text={data}
        textStyle={{ fontFamily: "Poppins-Regular", fontWeight: "600" }}
      />
    );
  else
    return (
      <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "600" }}>
        {data}
      </Text>
    );
};
