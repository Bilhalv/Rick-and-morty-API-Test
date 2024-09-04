import { Person } from "@/types/Person";

export default async function getEpisode(link: string): Promise<{name:string, ep:string}> {
    try {
        const response = await fetch(link);
        const json = await response.json();
        return json.results as Promise<{name:string, ep:string}>;
    } catch (error) {
        console.error(error);
        return {name: "error", ep: "error"};
    }
}
