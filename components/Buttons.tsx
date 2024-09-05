import { useState } from 'react';
import { FontAwesome } from "@expo/vector-icons";
import { Popover } from "native-base";
import { StyleSheet, View } from "react-native";

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

export function SortButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      trigger={(triggerProps) => {
        return (
          <View style={styles.button}>
            <FontAwesome name="sort" size={20} color="white" />
          </View>
        );
      }}
    >
      <Popover.Content accessibilityLabel="Delete Customerd" w="56">
        <Popover.Arrow />
        <Popover.CloseButton />
        <Popover.Header>Delete Customer</Popover.Header>
        <Popover.Body>
          This will remove all data relating to Alex. This action cannot be
          reversed. Deleted data can not be recovered.
        </Popover.Body>
      </Popover.Content>
    </Popover>
  );
}