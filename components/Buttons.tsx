import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, Text, TextInput, View } from "react-native";
import {
  Popover,
  Toggle,
  Card,
  RadioGroup,
  Radio,
  Button,
  Modal,
  Input,
  Select,
  SelectItem,
  IndexPath,
} from "@ui-kitten/components";
import { Person } from "@/types/Person";
import * as FileSystem from "expo-file-system";

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3C3E44",
    width: 40,
    height: 40,
    borderRadius: 100,
  },
});

interface SortButtonProps {
  checked: boolean;
  onChange: () => void;
}

export function SortButton(props: SortButtonProps) {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Popover
        visible={visible}
        anchor={() => (
          <View style={styles.button} onTouchStart={() => setVisible(!visible)}>
            <FontAwesome name="sort" size={20} color="white" />
          </View>
        )}
        onBackdropPress={() => setVisible(false)}
      >
        <Card status="primary">
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            Sort
          </Text>
          <View>
            <Toggle checked={props.checked} onChange={props.onChange}>
              {props.checked ? "Normal" : "Decrescente"}
            </Toggle>
          </View>
        </Card>
      </Popover>
    </>
  );
}

interface FilterButtonProps {
  onChange: (x: "Alive" | "Dead" | "unknown" | "any") => void;
}

export function FilterButton(props: FilterButtonProps) {
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState<number>(0);
  const statuses = ["Alive", "Dead", "unknown", "any"];

  return (
    <Popover
      visible={visible}
      anchor={() => (
        <View style={styles.button} onTouchStart={() => setVisible(!visible)}>
          <FontAwesome name="filter" size={20} color="white" />
        </View>
      )}
      onBackdropPress={() => setVisible(false)}
    >
      <Card status="primary">
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          Filter
        </Text>
        <RadioGroup
          selectedIndex={status}
          onChange={(value) => setStatus(value)}
        >
          {statuses.map((status) => (
            <Radio key={status}>{status}</Radio>
          ))}
        </RadioGroup>
        <Button
          status="primary"
          onPress={() =>
            props.onChange(
              statuses[status] as "Alive" | "Dead" | "unknown" | "any"
            )
          }
        >
          Filter
        </Button>
      </Card>
    </Popover>
  );
}

interface AddButtonProps {
  onAdd: (x: Person) => void;
}

export function AddButton({ onAdd }: AddButtonProps) {
  const [id, setId] = useState(0);
  async function getPastAdded() {
    const json = await FileSystem.readAsStringAsync(
      FileSystem.documentDirectory + "localEdits.json"
    );

    const pastAdded: Person[] = JSON.parse(json).filter(
      (x: Person) => x.id < 0
    );

    setId(Number("-" + (pastAdded.length + 1)));
  }

  getPastAdded();
  const [person, setPerson] = useState<Person>({
    id,
    name: "Hello World",
    status: "unknown",
    species: "",
    type: "",
    gender: "unknown",
    origin: {
      name: "",
      link: "",
    },
    location: {
      name: "",
      link: "",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/19.jpeg",
    episode: [],
    url: "",
  });
  const [visible, setVisible] = useState(false);
  const statuses = ["Alive", "Dead", "unknown"];
  const genders = ["Male", "Female", "Genderless", "unknown"];
  return (
    <>
      <View style={styles.button} onTouchStart={() => setVisible(true)}>
        <FontAwesome name="plus" size={20} color="white" />
      </View>
      <Modal
        visible={visible}
        backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        onBackdropPress={() => setVisible(false)}
        style={{
          width: "75%",
          height: "50%",
          backgroundColor: "#3C3E44",
          borderRadius: 10,
          padding: 10,
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: 10,
            color: "white",
          }}
        >
          Add Character
        </Text>
        <TextInput
          placeholder="name"
          placeholderTextColor="white"
          value={person.name}
          onChangeText={(value) =>
            setPerson((prev) => ({ ...prev, name: value }))
          }
          style={{
            borderColor: "white",
            borderWidth: 1,
            color: "white",
            marginBottom: 10,
          }}
        />
        <TextInput
          placeholder="species"
          placeholderTextColor="white"
          value={person.species}
          onChangeText={(value) =>
            setPerson((prev) => ({ ...prev, species: value }))
          }
          style={{
            borderColor: "white",
            borderWidth: 1,
            color: "white",
            marginBottom: 10,
          }}
        />
        <TextInput
          placeholder="type"
          placeholderTextColor="white"
          value={person.type}
          onChangeText={(value) =>
            setPerson((prev) => ({ ...prev, type: value }))
          }
          style={{
            borderColor: "white",
            borderWidth: 1,
            color: "white",
            marginBottom: 10,
          }}
        />
        <Select
          value={person.status}
          onSelect={(value: IndexPath[] | IndexPath) => {
            if (Array.isArray(value)) return;
            const selectedIndex = value.row;
            setPerson((prev) => ({ ...prev, status: statuses[selectedIndex] }));
          }}
        >
          {statuses.map((status) => (
            <SelectItem key={status} title={status} />
          ))}
        </Select>
        <Select
          value={person.gender}
          onSelect={(value: IndexPath[] | IndexPath) => {
            if (Array.isArray(value)) return;
            const selectedIndex = value.row;
            setPerson((prev) => ({ ...prev, gender: genders[selectedIndex] }));
          }}
        >
          {genders.map((gender) => (
            <SelectItem key={gender} title={gender} />
          ))}
        </Select>
        <Button
          status="primary"
          style={{
            backgroundColor: "#32CD32",
            borderRadius: 10,
          }}
          onPress={() => {
            onAdd(person);
            setVisible(false);
          }}
        >
          Add
        </Button>
      </Modal>
    </>
  );
}

interface TrashButtonProps {
  onDelete: () => void;
}

export function TrashButton({ onDelete }: TrashButtonProps) {
  const [safety, setSafety] = useState(false);
  return (
    <View
      style={styles.button}
      onTouchStart={() => {
        if (safety) onDelete();
        else setSafety(true);
      }}
    >
      {safety ? (
        <FontAwesome name="warning" size={20} color="white" />
      ) : (
        <FontAwesome name="trash" size={20} color="white" />
      )}
    </View>
  );
}
