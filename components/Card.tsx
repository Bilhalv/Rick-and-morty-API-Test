import { Person } from "@/types/Person";
import { Text } from "react-native";

export default function Card(person: Person) {
    return (
        <Text style={{color: 'white'}}>
            {person.name}
        </Text>
    )
}