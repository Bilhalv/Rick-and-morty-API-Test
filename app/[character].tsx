import getSpecificChar from "@/hooks/getSpecificChar";
import { Person } from "@/types/Person";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function ModalScreen() {
  const { character } = useLocalSearchParams<{ character: string }>();
  const [char, setChar] = useState<Person>();
  useEffect(() => {
    function fetchChar() {
      getSpecificChar(Number(character)).then((char) => setChar(char));
    }
    fetchChar();
  }, []);
  return (
    <View>
      {char && (
        <>
          <Text>{char.name} habalabadubdub</Text>
          <View />
        </>
      )}
    </View>
  );
}
