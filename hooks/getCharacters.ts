import { Person } from "@/types/Person";

import * as FileSystem from "expo-file-system";

interface Filter {
  name: string;
  status?: string;
}

async function getLocalEdits(): Promise<Person[]> {
  try {
    const json = await FileSystem.readAsStringAsync(
      FileSystem.documentDirectory + "localEdits.json"
    );
    return JSON.parse(json) as Person[];
  } catch (error) {
    console.error(error);
    return [];
  }
}
export default async function getCharacters(
  page: number,
  order?: boolean
): Promise<Person[]> {
  const url = `https://rickandmortyapi.com/api/character/?page=${page}`;
  const localEdits = await getLocalEdits();

  try {
    const response = await fetch(url);
    const json = await response.json();
    const combinedResults = [
      ...json.results.filter(
        (x: Person) => localEdits.findIndex((y) => y.id === x.id) === -1
      ),
      ...localEdits,
    ];
    return combinedResults as Person[];
  } catch (error) {
    console.error(error);
    return [];
  }
}
