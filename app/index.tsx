import React, { useState, useEffect } from "react";
import Card from "@/components/Card";
import getCharacters from "@/hooks/getCharacters";
import { Person } from "@/types/Person";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import getPages from "@/hooks/getPages";
import { FontAwesome } from "@expo/vector-icons";
import getFiltered from "@/hooks/getFiltered";
import { FilterButton, SortButton } from "@/components/Buttons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const [characters, setCharacters] = useState<Person[]>([]);
  const [localEdits, setLocalEdits] = useState<Person[]>([]);
  const inputRef = React.useRef<TextInput>(null);
  const [paginasCarregadas, setPaginasCarregadas] = useState(1);
  const [ordem, setOrdem] = useState(true);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"Alive" | "Dead" | "unknown" | "any">(
    "any"
  );

  const search = async (
    name: string,
    status?: "Alive" | "Dead" | "unknown" | "any"
  ) => {
    let new_characters;
    if (status === "any") {
      new_characters = await getFiltered({ name });
    } else {
      new_characters = await getFiltered({ name, status });
    }
    setCharacters(
      !ordem
        ? new_characters
        : new_characters.sort((a, b) => a.name.localeCompare(b.name))
    );
    // setCharacters(getMergedCharacters());
  };

  const onEditCharacter = (character: Person) => {
    const existingEdit = localEdits.find((edit) => edit.id === character.id);
    if (existingEdit) {
      setLocalEdits((prevEdits) =>
        prevEdits.map((edit) => (edit.id === character.id ? character : edit))
      );
    } else {
      setLocalEdits([...localEdits, character]);
    }
  };

  const onSearch = async (text: string) => {
    setInput(text);
    await search(text, status);
  };

  const onFilter = async (status: "Alive" | "Dead" | "unknown" | "any") => {
    setStatus(status);
    await search(input, status);
  };

  const onOrder = async () => {
    setOrdem(!ordem);
    await search(input, status);
  };

  const getMergedCharacters = () => {
    const mergedCharacters = characters.map((character) => {
      const edit = localEdits.find((edit) => edit.id === character.id);
      if (edit) {
        return edit;
      } else {
        return character;
      }
    });

    return mergedCharacters;
  };

  async function fetchCharacters(page: number, asc?: boolean) {
    const new_characters = await getCharacters(page, asc);
    setCharacters(new_characters);
    // setCharacters(getMergedCharacters());
  }

  async function loadLocalEdits() {
    try {
      const savedEdits = await AsyncStorage.getItem("localEdits");
      if (savedEdits) {
        setLocalEdits(JSON.parse(savedEdits));
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchCharacters(1);
    loadLocalEdits();
  }, []);

  useEffect(() => {
    const saveLocalEdits = async () => {
      try {
        await AsyncStorage.setItem("localEdits", JSON.stringify(localEdits));
      } catch (error) {
        console.error(error);
      }
    };

    saveLocalEdits();
  }, [localEdits]);

  return (
    <>
      <View style={styles.header}>
        <FilterButton onChange={onFilter} />
        <SortButton checked={ordem} onChange={onOrder} />
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
            onSubmitEditing={(text) => onSearch(text.nativeEvent.text)}
            onFocus={() => {
              console.log("focus");
            }}
          />
        </View>
        <View style={styles.button}>
          <FontAwesome name="plus" size={20} color="white" />
        </View>
      </View>
      <ScrollView>
        {characters && characters.length > 0 ? (
          <View
            style={{
              gap: 20,
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              marginBottom: 50,
              marginTop: 20,
            }}
          >
            {characters.map((person: Person) => (
              <Card key={person.id} {...person} />
            ))}
            {characters.length > 9 && (
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: 100,
                  height: 100,
                }}
                onPress={async () => {
                  if (paginasCarregadas + 1 > (await getPages())) return;
                  const newCharacters = await getCharacters(
                    paginasCarregadas + 1
                  );
                  setCharacters((prev) => [...prev, ...newCharacters]);
                  setPaginasCarregadas((prev) => prev + 1);
                }}
              >
                <FontAwesome name="arrow-down" size={40} color="white" />
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <Text
            style={{ color: "#ffffff", textAlign: "center", marginTop: 20 }}
          >
            No characters found
          </Text>
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
    top: 20,
    zIndex: 100,
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
