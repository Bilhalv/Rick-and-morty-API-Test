import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import {
  Popover,
  Toggle,
  Card,
  RadioGroup,
  Radio,
  Button,
} from "@ui-kitten/components";

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
