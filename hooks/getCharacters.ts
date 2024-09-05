import { Person } from "@/types/Person";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function getCharacters(
  page: number,
  order?: boolean
): Promise<Person[]> {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}`
    );
    const json = await response.json();
    await AsyncStorage.setItem("characters", JSON.stringify(json.results));
    if (!order) {
      return json.results as Person[];
    } else {
      return json.results.sort((a: Person, b: Person) =>
        a.name.localeCompare(b.name)
      ) as Person[];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}
