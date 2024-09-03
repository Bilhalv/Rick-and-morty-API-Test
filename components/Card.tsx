import { Person } from "@/types/Person";
import { Link } from "expo-router";
import { Text } from "react-native";

export default function Card(person: Person) {
  return (
    <Link href={`/${person.id}`}>
      <Text style={{ color: "white" }}>{person.name}</Text>
    </Link>
  );
}
