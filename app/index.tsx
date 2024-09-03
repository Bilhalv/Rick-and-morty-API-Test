import React, { useState, useEffect } from "react";
import Card from "@/components/Card";
import getCharacters from "@/hooks/getCharacters";
import { Person } from "@/types/Person";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import getPages from "@/hooks/getPages";
import { FontAwesome } from "@expo/vector-icons";
import getFiltered from "@/hooks/getFiltered";

export default function Index() {
  const [characters, setCharacters] = useState<Person[]>([]);
  const inputRef = React.useRef<TextInput>(null);

  useEffect(() => {
    async function fetchCharacters(page: number) {
      const pages = await getPages();

      if (page > pages) {
        return;
      }

      const new_characters = await getCharacters(page);
      setCharacters((prev) => [...prev, ...new_characters]);
      fetchCharacters(page + 1);
    }
    fetchCharacters(1);
  }, []);

  return (
    <>
      <View style={styles.header}>
        <View style={styles.button}>
          <FontAwesome name="filter" size={20} color="white" />
        </View>
        <View style={styles.button}>
          <FontAwesome name="sort" size={20} color="white" />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            backgroundColor: "#3C3E44",
            width: "100%",
            height: "100%",
            borderRadius: 10,
            paddingHorizontal: 10,
            paddingVertical: 5,
            alignItems: "center",
          }}
          onTouchStart={() => {
            inputRef.current?.focus();
          }}
        >
          <FontAwesome
            name="search"
            size={20}
            color="white"
            style={{ marginRight: 10 }}
          />
          <TextInput
            ref={inputRef}
            placeholder="Search"
            placeholderTextColor={"#ffffff"}
            style={{ flex: 1, color: "white" }}
            editable
            onChangeText={async (e) => {
              const characters = await getFiltered({ name: e });
              setCharacters(characters);
            }}
            onFocus={() => {
              console.log("focus");
            }}
          />
        </View>
        <View style={styles.button}>
          <FontAwesome name="plus" size={20} color="white" />
        </View>
      </View>
      <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
        {characters && characters.length > 0 ? (
          characters.map((person: Person) => (
            <Card key={person.id} {...person} />
          ))
        ) : (
          <Text style={{ color: "#ffffff" }}>No characters found</Text>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    width: "100%",
    gap: 10,
    position: "static",
    alignItems: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3C3E44",
    width: 40,
    height: 40,
    borderRadius: 100,
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
    borderRadius: 10,
  },
});
