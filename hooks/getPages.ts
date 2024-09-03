import { Person } from "@/types/Person";

export default async function getPages(): Promise<number> {
    try {
        const response = await fetch(`https://rickandmortyapi.com/api/character`);
        const json = await response.json();
        return json.info.pages as number;
    } catch (error) {
        console.error(error);
        return 0; // Retorna um valor padrão em caso de erro
    }
}