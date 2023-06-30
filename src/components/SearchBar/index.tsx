import React from "react";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";

interface SearchBarProps {
  clicked: boolean;
  searchPhrase: string;
  setSearchPhrase: (searchPhrase: string) => void;
  setClicked: (clicked: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  clicked,
  searchPhrase,
  setSearchPhrase,
  setClicked,
}) => {
  const handleFocus = () => {
    setClicked(true);
  };

  const handleClearSearch = () => {
    setSearchPhrase("");
  };

  const handleCancel = () => {
    Keyboard.dismiss();
    setClicked(false);
  };

  return (
    <View style={styles.container}>
      <View
        style={
          clicked ? styles.searchBar__clicked : styles.searchBar__unclicked
        }
      >
        {/* search Icon */}
        <Feather
          name="search"
          size={20}
          color="black"
          style={{ marginLeft: 1 }}
        />
        {/* Input field */}
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={handleFocus}
        />
        {/* cross Icon, depending on whether the search bar is clicked or not */}
        {clicked && (
          <Entypo
            name="cross"
            size={20}
            color="black"
            style={{ padding: 1 }}
            onPress={handleClearSearch}
          />
        )}
      </View>
      {/* cancel button, depending on whether the search bar is clicked or not */}
      {clicked && (
        <TouchableOpacity
          onPress={handleCancel}
          style={{ marginHorizontal: 8 }}
        >
          <Text style={{ color: "blue" }}>Cancel</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
  searchBar__unclicked: {
    padding: 12,
    flexDirection: "row",
    width: "92%",
    backgroundColor: "#e8e8e8",
    borderRadius: 15,
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: 12,
    flexDirection: "row",
    width: "80%",
    backgroundColor: "#e8e8e8",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
  },
});
