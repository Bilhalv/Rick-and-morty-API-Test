import { Person } from "@/types/Person";

interface Filter {
    name: string,
    status?: string,
    species?: string,
    type?: string,
    gender?: string
}

export default async function getFiltered(
    props: Filter
): Promise<Person[]> {
    let url = `https://rickandmortyapi.com/api/character/?name=${props.name}`;
    if (props.status) url += `&status=${props.status}`;
    if (props.species) url += `&species=${props.species}`;
    if (props.type) url += `&type=${props.type}`;
    if (props.gender) url += `&gender=${props.gender}`;

    return await fetch(url)
        .then(response => response.json())
        .then(json => {
            return json.results as Person[];
        })
        .catch(error => {
            console.error(error);
            return [];
        });
}