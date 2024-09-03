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