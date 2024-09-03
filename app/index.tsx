import React, { useState, useEffect } from "react";
import Card from "@/components/Card";
import getCharacters from "@/hooks/getCharacters";
import { Person } from "@/types/Person";
import { StyleSheet, Text, TextInput, View } from "react-native";
import getPages from "@/hooks/getPages";
import { FontAwesome } from "@expo/vector-icons";
import getFiltered from "@/hooks/getFiltered";

export default function Index() {
  const [characters, setCharacters] = useState<Person[]>([]);

  useEffect(() => {
    async function fetchCharacters() {
      const characters = await getCharacters(7);
      setCharacters(characters);
    }
    fetchCharacters();
  }, []);

  return (
    <>
      <View style={styles.header}>
        <FontAwesome style={styles.button} name="filter" size={20} color="white" />
        <FontAwesome style={styles.button} name="sort" size={20} color="white" />
        <View style={styles.search}>
          <FontAwesome name="search" size={20} color="white" />
          <TextInput
            placeholder="Search"
            editable
            onChangeText={(e) => {
              async function fetchCharacters() {
                const characters = await getFiltered({ name: e });
                setCharacters(characters);
              }
              fetchCharacters();
            }}
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
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {characters && characters.length > 0 ? (
          characters.map((person: Person) => (
            <Card key={person.id} {...person} />
          ))
        ) : (
          <Text style={{ color: "#ffffff" }}>No characters found</Text>
        )}
      </View>
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
    backgroundColor: "#3C3E44",
    width: 40,
    height: 40,
    borderRadius: 100,
    textAlign: "center",
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