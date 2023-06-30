import styles from "./style";
import React, { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View, Image } from "react-native";

type Props = {
  signature: any;
  setSignature: any;
};

const SignatureRetailer: React.FC<Props> = ({ signature, setSignature }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { borderColor: signature ? "green" : "#9D97B5" },
      ]}
      onPress={() => {
        navigation.navigate("CanvasScreen", {
          signature,
          setSignature,
        });
      }}
    >
      <FontAwesome5
        name="signature"
        size={24}
        color={signature ? "green" : "#000"}
        style={styles.icon}
      />
      <Text style={[styles.text, { color: signature ? "green" : "#000" }]}>
        Signature of Retailer{" "}
        {/* <Text
          style={{
            fontSize: 18,
            fontFamily: "RobotoSlab-SemiBold",
            color: "red",
          }}
        >
          *
        </Text> */}
      </Text>
      {signature ? (
        <FontAwesome5
          name="check"
          size={24}
          color="green"
          style={[styles.icon, { marginLeft: 18 }]}
        />
      ) : null}
    </TouchableOpacity>
  );
};

export default SignatureRetailer;
