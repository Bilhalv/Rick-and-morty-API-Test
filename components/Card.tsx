import { Person } from "@/types/Person";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

function ModalStatusComponent({
  status,
  text,
}: {
  status: "medkit" | "group" | "font" | "transgender-alt" | "home" | "map-pin";
  text: string;
}) {
  return (
    <View style={styles.row2}>
      <FontAwesome name={status} size={24} color="white" />
      <Text style={styles.text2}>{text}</Text>
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

const EpisodeComponent: React.FC<CharacterComponentProps> = ({ episodes }) => {
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

  const [curentPage, setCurrentPage] = useState(1);
  return (
    <View style={styles.column3}>
      <Text style={styles.text2}>
        <FontAwesome name="tv" size={24} color="white" /> Episodes
      </Text>
      {episodesFetched.length > 0 ? (
        <>
          <View
            style={{
              justifyContent: "flex-start",
              flexDirection: "column",
              height: 100,
            }}
          >
            {episodesFetched
              .slice((curentPage - 1) * 5, curentPage * 5)
              .map((x) => (
                <Text
                  key={x.episode}
                  style={{
                    color: "white",
                    marginLeft: 24,
                  }}
                >
                  {x.episode} - {x.name}
                </Text>
              ))}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginTop: 20,
            }}
          >
            <FontAwesome
              name="chevron-left"
              size={24}
              color="white"
              onPress={() => {
                if (curentPage === 1) return;
                setCurrentPage((prev) => prev - 1);
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "50%",
                backgroundColor: "#3C3E44",
                borderRadius: 10,
                paddingVertical: 4,
                paddingHorizontal: 8,
              }}
            >
              <View
                style={{
                  width: `${
                    (curentPage / Math.ceil(episodesFetched.length / 5)) * 100
                  }%`,
                  backgroundColor: "#fff",
                  borderRadius: 10,
                }}
              />
            </View>
            <FontAwesome
              name="chevron-right"
              size={24}
              color="white"
              onPress={() => {
                if (curentPage === episodesFetched.length) return;
                setCurrentPage((prev) => prev + 1);
              }}
            />
          </View>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default function Card(person: Person) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.card}>
      {modalVisible ? (
        <View style={styles.column}>
          <View style={styles.row}>
            <View
              style={styles.view}
              onTouchStart={() => setModalVisible(!modalVisible)}
            >
              <FontAwesome name="arrow-left" size={24} color="white" />
            </View>
            <View style={styles.view2}>
              <Text style={styles.text}>{person.name}</Text>
            </View>
            <View style={styles.view}>
              <FontAwesome name="edit" size={24} color="white" />
            </View>
          </View>
          <ModalStatusComponent status={"medkit"} text={person.status} />
          <ModalStatusComponent status={"group"} text={person.species} />
          {person.type !== "" && (
            <ModalStatusComponent status={"font"} text={person.type} />
          )}
          <ModalStatusComponent status={"transgender-alt"} text={person.gender} />
          <ModalStatusComponent status={"home"} text={person.origin.name} />
          <ModalStatusComponent status={"map-pin"} text={person.location.name} />
          <EpisodeComponent episodes={person.episode} />
        </View>
      ) : (
        <View onTouchStart={() => setModalVisible(!modalVisible)}>
          <Text style={styles.text}>{person.name}</Text>
          <Image
            style={styles.Image}
            source={{
              uri: person.image,
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 5,
    borderRadius: 5,
    backgroundColor: "#3C3E44",
    width: "75%",
  },
  text: {
    marginRight: 5,
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "400",
  },
  Image: {
    width: "100%",
    aspectRatio: 1.1,
    marginHorizontal: "auto",
  },
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
    elevation: 4,
    width: "100%",
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
    flexDirection: "column",
    justifyContent: "space-between",
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
    width: "100%",
    gap: 5,
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
    gap: 5,
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
  text2: {
    color: "#FFFFFF",
    fontSize: 20,
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
    width: 40,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#272B33",
    borderRadius: 99,
  },
  view2: {
    backgroundColor: "#272B33",
    borderRadius: 5,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginRight: 5,
    flex: 1,
  },
  view4: {
    width: 8,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 7,
  },
});
