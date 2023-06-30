import { color } from "../../utils";
import React, { useState } from "react";
import Timeline from "react-native-timeline-flatlist";
import { convertTimeString, convertToUTC } from "../../helper/formatDate";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

type Props = {
  data?: any;
  setIsImageViewVisible: any;
};

const TimeLineStatus: React.FC<Props> = ({ data, setIsImageViewVisible }) => {
  if (data) {
    for (const item of data) {
      const status = item?.status;
      if (status === "PENDING") {
        item.icon = require("../../../assets/icon/manufacturer.png");
      } else if (status === "APPROVED") {
        item.icon = require("../../../assets/icon/manufacturer.png");
      } else if (status === "SHIPPING") {
        item.icon = require("../../../assets/icon/distributor.png");
      } else if (status === "SHIPPED") {
        item.icon = require("../../../assets/icon/distributor.png");
      }
    }
  }
  return (
    <View style={[styles.container, styles.shadow]}>
      <Timeline
        data={data}
        circleSize={24}
        circleColor={"rgba(55, 150, 52,0.6)"}
        iconStyle={{
          width: 30,
          height: 30,
        }}
        lineColor={color.Primary}
        timeContainerStyle={{ marginTop: 0 }}
        timeStyle={{
          textAlign: "center",
          backgroundColor: color.Primary,
          color: "white",
          padding: 5,
          borderRadius: 12,
          fontSize: 12,
        }}
        descriptionStyle={{ color: "gray" }}
        style={{ paddingTop: 5 }}
        isUsingFlatlist={true}
        innerCircle={"icon"}
        renderDetail={(rowData) => {
          return (
            <View style={{ flex: 1, top: -10 }}>
              <Text style={{ fontFamily: "RobotoSlab-VariableFont_wght" }}>
                Responsibility:{" "}
                <Text style={{ fontFamily: "RobotoSlab-Medium" }}>
                  {rowData?.actor?.fullName}
                </Text>
              </Text>
              <Text style={{ fontFamily: "RobotoSlab-VariableFont_wght" }}>
                Address:{" "}
                <Text style={{ fontFamily: "RobotoSlab-Medium" }}>
                  {rowData?.address}
                </Text>
              </Text>
              <Text style={{ fontFamily: "RobotoSlab-VariableFont_wght" }}>
                Status:{" "}
                <Text
                  style={{
                    fontFamily: "RobotoSlab-Medium",
                    color: color.Primary,
                  }}
                >
                  {rowData?.status}
                </Text>
              </Text>
              {rowData.status === "SHIPPED" ? (
                <TouchableOpacity
                  style={{ marginVertical: 2 }}
                  onPress={() => {
                    setIsImageViewVisible((prevState: boolean) => {
                      return !prevState;
                    });
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "RobotoSlab-VariableFont_wght",
                      color: "blue",
                    }}
                  >
                    View Signatures
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          );
        }}
        renderTime={(rowData) => {
          return (
            <View
              style={{
                marginBottom: 8,
                alignItems: "flex-end",
              }}
            >
              <Text style={{ fontFamily: "RobotoSlab-VariableFont_wght" }}>
                {convertTimeString(convertToUTC(rowData.deliveryDate)).date}
              </Text>
              <Text style={{ fontFamily: "RobotoSlab-VariableFont_wght" }}>
                {convertTimeString(convertToUTC(rowData.deliveryDate)).time}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    // justifyContent: "center",
    // alignItems: "center",
    marginHorizontal: 2,
    marginVertical: 8,

    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.65,

    elevation: 4,
  },
  text: {
    fontFamily: "RobotoSlab-SemiBold",
  },
});

export default TimeLineStatus;
