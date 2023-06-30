import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";

const DescriptionProduct = ({ description }: { description: string }) => {
  const [view_Detail, setView_Detail] = React.useState(false);

  return (
    <TouchableOpacity
      style={{ flexDirection: "row" }}
      onPress={() => setView_Detail(!view_Detail)}
    >
      <Text numberOfLines={view_Detail ? undefined : 3} style={styles.detail}>
        {description}
      </Text>
    </TouchableOpacity>
  );
};

export default React.memo(DescriptionProduct);

const styles = StyleSheet.create({
  detail: {
    fontFamily: "RobotoSlab-VariableFont_wght",
    marginVertical: 2,
  },
});
