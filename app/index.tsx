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
import { SortButton } from "@/components/Buttons";

export default function Index() {
  const [characters, setCharacters] = useState<Person[]>([]);
  const inputRef = React.useRef<TextInput>(null);
  const [paginasCarregadas, setPaginasCarregadas] = useState(1);
  const [ordem, setOrdem] = useState(true);
  const [input, setInput] = useState("");

  async function ChangeOrdem() {
    setOrdem(!ordem);
    const new_characters = getFiltered({ name: input });
    if (!ordem) {
      setCharacters(await new_characters);
    } else {
      setCharacters(await (await new_characters).sort((a, b) => a.name.localeCompare(b.name)));
    }
  }

  async function OnSearch(text: string) {
    setInput(text);
    const new_characters = getFiltered({ name: text });
    setCharacters(await new_characters);
    setOrdem(true);
  }

  async function fetchCharacters(page: number, asc?: boolean) {
    const new_characters = await getCharacters(page, asc);
    setCharacters(new_characters);
  }
  useEffect(() => {
    fetchCharacters(1);
  }, []);

  return (
    <>
      <View style={styles.header}>
        <View style={styles.button}>
          <FontAwesome name="filter" size={20} color="white" />
        </View>
        <SortButton checked={ordem} onChange={ChangeOrdem} />
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
            onSubmitEditing={(text) => OnSearch(text.nativeEvent.text)}
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
