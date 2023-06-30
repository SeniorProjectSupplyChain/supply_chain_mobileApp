import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { color, windowWidth } from "../../utils";
import { formatNumberWithCommas } from "../../helper/money";
import AntDesign from "react-native-vector-icons/AntDesign";
import ImageViewer from "react-native-image-zoom-viewer-fixed";
import DescriptionProduct from "../DescriptionProduct";

type Props = {
  data: any;
  // setIsImageViewVisible: any;
};

const ProductInfor: React.FC<Props> = ({ data }) => {
  const [isImageViewVisible, setIsImageViewVisible] = useState<boolean>(false);
  const [isCertificateViewVisible, setIsCertificateViewVisible] =
    useState<boolean>(false);

  return (
    <View style={[styles.container, styles.shadow]}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: "RobotoSlab-Bold",
              fontSize: 20,
              marginVertical: 2,
            }}
            numberOfLines={1}
          >
            {data?.productName}
          </Text>
          <Text
            style={{
              fontFamily: "RobotoSlab-SemiBold",
              fontSize: 18,
              color: color.Primary,
              marginVertical: 2,
            }}
          >
            {formatNumberWithCommas(data?.price)} VND
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.shadow, { marginRight: 20 }]}
          onPress={() => {
            setIsImageViewVisible((prevState: boolean) => {
              return !prevState;
            });
          }}
        >
          <Image
            source={{ uri: data?.qrCode }}
            style={{ width: 60, height: 60 }}
          />
        </TouchableOpacity>
      </View>
      {/* <Text
        style={{
          fontFamily: "RobotoSlab-VariableFont_wght",
          marginVertical: 2,
        }}
        numberOfLines={3}
      >
        {data?.description}
      </Text> */}
      <DescriptionProduct description={data?.description} />
      <TouchableOpacity
        onPress={() => {
          setIsCertificateViewVisible((prevState: boolean) => {
            return !prevState;
          });
        }}
      >
        <Text
          style={{
            fontFamily: "RobotoSlab-VariableFont_wght",
            marginVertical: 4,
            color: "blue",
          }}
          numberOfLines={1}
        >
          View Certification
        </Text>
      </TouchableOpacity>
      <Modal visible={isImageViewVisible}>
        <TouchableOpacity
          style={{
            backgroundColor: color.Primary,
            width: windowWidth * 0.1,
            height: windowWidth * 0.1,
            borderRadius: windowWidth * 0.05,
            position: "absolute",
            top: Platform.OS === "ios" ? 40 : 10,
            right: 20,
            zIndex: 11,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => setIsImageViewVisible(!isImageViewVisible)}
        >
          <AntDesign name="close" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <ImageViewer
            imageUrls={[{ url: data?.qrCode }]}
            style={{ top: -18 }}
            backgroundColor={"#fff"}
          />
        </View>
      </Modal>
      <Modal visible={isCertificateViewVisible}>
        <TouchableOpacity
          style={{
            backgroundColor: color.Primary,
            width: windowWidth * 0.1,
            height: windowWidth * 0.1,
            borderRadius: windowWidth * 0.05,
            position: "absolute",
            top: Platform.OS === "ios" ? 40 : 10,
            right: 20,
            zIndex: 11,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => setIsCertificateViewVisible(!isCertificateViewVisible)}
        >
          <AntDesign name="close" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <ImageViewer
            imageUrls={[{ url: data?.certificateUrl }]}
            style={{ top: -18 }}
            backgroundColor={"#fff"}
          />
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    // justifyContent: "center",
    // alignItems: "center",
    marginHorizontal: 12,
    marginVertical: 12,
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    flex: 1,
  },
  text: {
    // fontSize:10,
    fontFamily: "RobotoSlab-SemiBold",
    // lineHeight:14,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.65,

    elevation: 2,
  },
});

export default React.memo(ProductInfor);
