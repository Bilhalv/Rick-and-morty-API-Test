import { StyleSheet, Text, TextInput, View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Slot } from "expo-router";
import getPages from "@/hooks/getPages";
import { useState, useEffect } from "react";

export default function RootLayout() {
  const [maxPages, setMaxPages] = useState<number>(0);

  useEffect(() => {
    async function fetchPages() {
      const pages = await getPages();
      setMaxPages(pages);
    }

    fetchPages();
  }, []);
  return (
    <View style={{
      backgroundColor: "#272B33",
      flexDirection: "column",
      gap: 10,
      padding: 10,
      minHeight: "100%"
    }}>
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
      <Slot />
      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
        padding: 10
      }}>
        <Text style={{ color: "#ffffff" }}>Page 1 of {maxPages}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    gap: 10,
    position: "static"
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