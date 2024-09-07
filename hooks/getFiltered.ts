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

export default async function getFiltered(props: Filter): Promise<Person[]> {
  const localEdits = await getLocalEdits();
  const url = new URL(`https://rickandmortyapi.com/api/character/`);
  url.searchParams.set("name", props.name);
  if (props.status) url.searchParams.set("status", props.status);

  try {
    const response = await fetch(url.toString());
    const json = await response.json();
    const combinedResults = [
      ...json.results.filter(
        (x: Person) => localEdits.findIndex((y) => y.id === x.id) === -1
      ),
      ...localEdits,
    ];
    return combinedResults.filter(
      (x) =>
        (props.status ? x.status === props.status : true) &&
        x.name.toLowerCase().includes(props.name.toLowerCase()) &&
        x.name !== "Null"
    ) as Person[];
  } catch (error) {
    console.error(error);
    return [];
  }
}
