import { Person } from "@/types/Person";

export default async function getSpecificChar(id: number): Promise<Person> {
    try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        return await response.json() as Person;
    } catch (error) {
        console.error(error);
        return {} as Person
    }
}
