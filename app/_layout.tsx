import { StyleSheet, Text, TextInput, View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function RootLayout() {
  return (
    <View style={styles.header}>
      <FontAwesome style={styles.button} name="filter" size={20} color="white" />
      <FontAwesome style={styles.button} name="sort" size={20} color="white" />
      <View style={styles.search}>
        <FontAwesome name="search" size={20} color="white" />
        <TextInput
          placeholder="Search"
          editable
          style={{
            color: "#ffffff",
            width: "100%",
            height: "100%",
            fontSize: 12
          }}
        />
      </View>
      <FontAwesome style={styles.button} name="plus" size={20} color="white" />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    gap: 10
  },
  button: {
    backgroundColor: "#3C3E44",
    width: 40,
    height: 40,
    borderRadius: 100,
    alignContent: "center",
    textAlign: "center"
  },
  search: {
    flex: 1,
    height: 40,
    gap: 10,
    backgroundColor: "#3C3E44",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10
  }
})