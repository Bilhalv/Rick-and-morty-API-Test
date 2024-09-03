import { Person } from "@/types/Person";

export default async function getCharacters(page:number): Promise<Person[]> {
    return await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
        .then(response => response.json())
        .then(json => {
            return json.results as Person[];
        })
        .catch(error => {
            console.error(error);
            return [];
        });
}