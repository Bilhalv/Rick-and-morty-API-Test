import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { Popover, Toggle, Card } from "@ui-kitten/components";

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
  // ordenar lista por nome
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
