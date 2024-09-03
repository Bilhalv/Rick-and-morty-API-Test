import { Person } from "@/types/Person";
import { Text } from "react-native";

export default function Card(person: Person) {
    return (
        <Text>
            {person.name}
        </Text>
    )
}