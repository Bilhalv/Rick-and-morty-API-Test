import { Person } from "@/types/Person";
import { Link } from "expo-router";
import { StyleSheet, Text, View, Image } from "react-native";

export default function Card(person: Person) {
  return (
    <Link href={`/${person.id}`}>
      <View style={styles.card}>
        <Text style={styles.text}>{person.name}</Text>
        <Image
          style={styles.Image}
          source={{
            uri: person.image
          }}
        />
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 5,
    borderRadius: 5,
    backgroundColor: "#3C3E44",
    width: 350,
  },
  text: {
    marginRight: 5,
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "400",
  },
  Image: {
    width: "100%",
    aspectRatio: 1.1,
    marginHorizontal: 'auto'
  },
});
