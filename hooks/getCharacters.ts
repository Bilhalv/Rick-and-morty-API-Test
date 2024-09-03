import { Person } from "@/types/Person";

export default async function getCharacters(page: number): Promise<Person[]> {
    try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
        const json = await response.json();
        return json.results as Person[];
    } catch (error) {
        console.error(error);
        return [];
    }
}
