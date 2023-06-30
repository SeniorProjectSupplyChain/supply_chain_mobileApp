import styles from "./style";
import React, { useState } from "react";
import Slide from "../SlideImage/Slide";
import CardProduct from "../CardProduct";
import Accordion from "react-native-collapsible/Accordion";
import { View, Text, TouchableOpacity } from "react-native";
import { ProductCommercialItem } from "../../types/models";
import { formatNumberWithCommas } from "../../helper/money";
import { color } from "../../utils";

type Props = {
  productItemList: ProductCommercialItem[];
};
const CustomCollapsible: React.FC<Props> = ({ productItemList }) => {
  const [activeSections, setActiveSections] = useState([]);

  const renderHeader = (section: any) => {
    const index = productItemList.findIndex(
      (item) =>
        item.product.productId === section.product.productId &&
        item.product.productName === section.product.productName
    );
    return (
      <CardProduct
        onActive={activeSections[0] === index ? true : false}
        styleContainer={styles.renderListProduct}
        styleIcon={{
          color: "#fff",
        }}
        styleTitle={{ color: "#fff" }}
        title={section.product.productName}
        quantity={section.quantity}
      />
    );
  };

  const renderContent = (section: ProductCommercialItem) => {
    return (
      <View style={styles.content}>
        <Slide item={section.product.image} />
        <View style={{ paddingHorizontal: 12, marginTop: 8 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                fontFamily: "RobotoSlab-SemiBold",
                fontSize: 18,
                color: color.Primary,
              }}
            >
              x{section.quantity}
            </Text>
            <Text
              style={{
                fontFamily: "RobotoSlab-SemiBold",
                fontSize: 18,
                color: color.Primary,
              }}
            >
              {formatNumberWithCommas(section.product.price)} VND
            </Text>
          </View>
          <Text style={{ fontFamily: "RobotoSlab-Medium", fontSize: 16 }}>
            {section.product.dates[0].actor.fullName}
          </Text>
          <Text
            style={{
              fontFamily: "RobotoSlab-VariableFont_wght",
              fontSize: 14,
              marginVertical: 4,
            }}
            numberOfLines={3}
          >
            {section.product.description}
          </Text>
        </View>
      </View>
    );
  };

  const updateSections = (activeSections: any) => {
    setActiveSections(activeSections);
  };

  return (
    <Accordion
      sections={productItemList}
      activeSections={activeSections}
      renderHeader={renderHeader}
      renderContent={renderContent}
      onChange={updateSections}
      expandMultiple={false}
      touchableComponent={TouchableOpacity}
      underlayColor="transparent"
    />
  );
};

export default React.memo(CustomCollapsible);
