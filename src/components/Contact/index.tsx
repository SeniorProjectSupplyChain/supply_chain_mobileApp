import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Entypo } from "@expo/vector-icons";
import { color } from "../../utils";

// import { TextInput } from 'react-native-paper';
type Props = {
  type: string;
  email?: string;
  phone?: string;
  address?: string;
};

const Contact = ({ type, email, phone, address }: Props) => {
  return (
    <>
      <TouchableOpacity onPress={() => {}} style={styles.container}>
        <View
          style={{ backgroundColor: "#F8F9FA", padding: 8, borderRadius: 12 }}
        >
          {type === "phone" ? (
            <Feather name="phone" size={24} color={color.Primary} />
          ) : (
            <Entypo name="location" size={24} color={color.Primary} />
          )}
        </View>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.infor_text}>{phone || address}</Text>
          {type === "phone" ? (
            <Text style={styles.infor_type}>Phone</Text>
          ) : (
            <Text style={styles.infor_type}>Address</Text>
          )}
        </View>
      </TouchableOpacity>
    </>
  );
};

export default React.memo(Contact);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    marginVertical: 4,
    alignItems: "center",
  },
  infor_text: {
    fontFamily: "RobotoSlab-Medium",
    fontSize: 14,
    lineHeight: 20,
    color: "#1A2530",
  },
  infor_type: {
    fontFamily: "RobotoSlab-Medium",
    fontSize: 12,
    lineHeight: 16,
    color: "#707B81",
  },
  textinput: {
    flex: 1,
    marginLeft: 12,
    backgroundColor: "#F8F9FA",
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
});
