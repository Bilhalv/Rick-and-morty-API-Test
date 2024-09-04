import getSpecificChar from "@/hooks/getSpecificChar";
import { Person } from "@/types/Person";
import { Link, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';

function ModalStatusComponent() {
  return (
    <View>
      <FontAwesome name="medkit" size={24} color="black" />
      <Text>status</Text>
    </View>
  )
}

interface CharacterComponentProps {
  episodes: string[];
}

const getEpisode = async (url: string): Promise<{ name: string, episode: string }> => {
  const response = await fetch(url);
  const data = await response.json();
  return { name: data.name, episode: data.episode };
};

const CharacterComponent: React.FC<CharacterComponentProps> = ({ episodes }) => {
  const [episodesFetched, setEpisodes] = useState<{ name: string, episode: string }[]>([]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      const episodePromises = episodes.map(async (episode) => {
        const ep = await getEpisode(episode);
        return ep;
      });
      const resolvedEpisodes = await Promise.all(episodePromises);
      setEpisodes(resolvedEpisodes);
    };

    fetchEpisodes();
  }, [episodes]);

  return (
    <View>
      {episodesFetched.length > 0 ? (
        episodesFetched.map((x) => (
          <View key={x.episode}>
            <Text>{x.name}</Text>
            <Text>{x.episode}</Text>
          </View>
        ))
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};


export default function ModalScreen() {
  const { character } = useLocalSearchParams<{ character: string }>();
  const [char, setChar] = useState<Person>();

  useEffect(() => {
    function fetchChar() {
      getSpecificChar(Number(character)).then((char) => setChar(char));
    }
    fetchChar();
  }, []);

  return (
    <View>
      {char && (
        <>
          {/* header */}
          <View>
            <Link href="/">Back</Link>
            <Text>{char.name}</Text>
            <Text>edit</Text>
          </View>
          {/* body */}
          <View>
            <ModalStatusComponent />
            <ModalStatusComponent />
            <ModalStatusComponent />
            <ModalStatusComponent />
            <ModalStatusComponent />
          </View>
          {/* episodes */}
          <View>
            <Text>Episodes</Text>
            <CharacterComponent episodes={char.episode} />
          </View>
        </>
      )}
    </View>
  );
}
