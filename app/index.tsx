import React, { useState, useEffect } from "react";
import Card from "@/components/Card";
import getCharacters from "@/hooks/getCharacters";
import { Person } from "@/types/Person";
import { Text, View } from "react-native";
import getPages from "@/hooks/getPages";

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
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {characters.map((person: Person) => (
        <Card key={person.name} {...person} />
      ))}
    </View>
  );
}