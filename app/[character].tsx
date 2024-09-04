import getSpecificChar from "@/hooks/getSpecificChar";
import { Person } from "@/types/Person";
import { Link, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

function ModalStatusComponent() {
  return (
    <View style={styles.row2}>
      <FontAwesome name="medkit" size={24} color="black" />
    <Text style={styles.text2}>{"Alive"}</Text>
  </View>
  );
}

interface CharacterComponentProps {
  episodes: string[];
}

const getEpisode = async (
  url: string
): Promise<{ name: string; episode: string }> => {
  const response = await fetch(url);
  const data = await response.json();
  return { name: data.name, episode: data.episode };
};

const CharacterComponent: React.FC<CharacterComponentProps> = ({
  episodes,
}) => {
  const [episodesFetched, setEpisodes] = useState<
    { name: string; episode: string }[]
  >([]);

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

export default function ModalScreen(character: number) {
  const [char, setChar] = useState<Person>();

  useEffect(() => {
    function fetchChar() {
      getSpecificChar(character).then((char) => setChar(char));
    }
    fetchChar();
  }, []);

  return (
    <View>
      {char && (
        <>
          <View style={styles.column}>
            <View style={styles.row}>
              <View style={styles.view}>
                <FontAwesome name="arrow-left" size={24} color="black" />
              </View>
              <View style={styles.view2}>
                <Text style={styles.text}>{"Shleemypants"}</Text>
              </View>
              <View style={styles.view3}>
              <FontAwesome name="edit" size={24} color="black" />
              </View>
            </View>
            <ModalStatusComponent />
            <ModalStatusComponent />
            <ModalStatusComponent />
            <ModalStatusComponent />
            <ModalStatusComponent />
            <View style={styles.column3}>
              <Text style={styles.text3}>{"Episodes"}</Text>
              <Text style={styles.text4}>{"A Rickle in Time(S02E01)"}</Text>
              <Text style={styles.text5}>
                {"Rattlestar Ricklactica(S04E05)"}
              </Text>
            </View>
          </View>
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

const styles = StyleSheet.create({
  box: {
    height: 2,
    backgroundColor: "#FFFFFF",
  },
  column: {
    backgroundColor: "#3C3E44",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    shadowColor: "#00000040",
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
  },
  column2: {
    flex: 1,
  },
  column3: {
    backgroundColor: "#272B33",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    shadowColor: "#00000040",
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
  },
  image: {
    height: 9,
    marginTop: 6,
  },
  image2: {
    width: 10,
    height: 10,
    marginRight: 6,
  },
  image3: {
    height: 6,
  },
  image4: {
    width: 8,
    height: 9,
    marginRight: 7,
  },
  image5: {
    width: 8,
    height: 8,
    marginRight: 7,
  },
  image6: {
    width: 5,
    height: 8,
    marginRight: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 13,
  },
  row2: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#272B33",
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginBottom: 2,
    shadowColor: "#00000040",
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
  },
  row3: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#272B33",
    paddingVertical: 8,
    paddingHorizontal: 11,
    marginBottom: 2,
    shadowColor: "#00000040",
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
  },
  row4: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#272B33",
    paddingVertical: 7,
    paddingHorizontal: 11,
    marginBottom: 2,
    shadowColor: "#00000040",
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
  },
  row5: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#272B33",
    paddingVertical: 7,
    paddingHorizontal: 13,
    marginBottom: 13,
    shadowColor: "#00000040",
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 12,
  },
  text2: {
    color: "#FFFFFF",
    fontSize: 10,
    flex: 1,
  },
  text3: {
    color: "#FFFFFF",
    fontSize: 9,
    marginBottom: 1,
  },
  text4: {
    color: "#FFFFFF",
    fontSize: 7,
    marginBottom: 1,
  },
  text5: {
    color: "#FFFFFF",
    fontSize: 7,
  },
  view: {
    width: 20,
    alignItems: "center",
    backgroundColor: "#272B33",
    borderRadius: 99,
    paddingVertical: 7,
    marginRight: 5,
  },
  view2: {
    width: 230,
    backgroundColor: "#272B33",
    borderRadius: 5,
    paddingVertical: 6,
    paddingHorizontal: 3,
    marginRight: 5,
  },
  view3: {
    width: 20,
    backgroundColor: "#272B33",
    borderRadius: 99,
    paddingHorizontal: 6,
  },
  view4: {
    width: 8,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 7,
  },
});
